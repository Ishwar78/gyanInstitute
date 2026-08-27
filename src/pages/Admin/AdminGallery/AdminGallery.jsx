import { useState, useEffect } from "react";
import { FiTrash2, FiUpload, FiImage } from "react-icons/fi";
import "./AdminGallery.css";

const categories = ["Campus", "Classroom", "Students", "Computer Lab", "Seminar", "Activities", "Workshop", "Achievement", "Library"];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [newLabel, setNewLabel] = useState("Campus");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/gallery");
      const json = await res.json();
      if (json.success) {
        setImages(json.data);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setUploading(true);
    try {
      // First, upload the image file to the server
      const uploadData = new FormData();
      uploadData.append("image", selectedFile);
      
      const uploadRes = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const uploadJson = await uploadRes.json();
      
      if (!uploadJson.success) {
        alert("Upload failed: " + uploadJson.message);
        setUploading(false);
        return;
      }
      
      // Then, create the gallery document with the returned URL
      const galleryRes = await fetch("http://localhost:5005/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: newLabel,
          image: uploadJson.imageUrl
        }),
      });
      
      const galleryJson = await galleryRes.json();
      
      if (galleryJson.success) {
        // Add new image to state
        setImages([galleryJson.data, ...images]);
        setSelectedFile(null); // Reset input
      }
    } catch (err) {
      console.error("Error adding to gallery:", err);
      alert("Error adding to gallery");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`http://localhost:5005/api/gallery/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setImages(images.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      alert("Error deleting image");
    }
  };

  if (loading) return <div className="admin-page">Loading...</div>;

  return (
    <div className="admin-page gallery-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">GALLERY MANAGEMENT</span>
          <h1>Manage Gallery</h1>
          <p>Upload and manage images for the public gallery page.</p>
        </div>
      </div>
      
      <div className="gallery-upload-section">
        <h3>Add New Image</h3>
        <div className="upload-form">
          <label>
            Category:
            <select value={newLabel} onChange={(e) => setNewLabel(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </label>
          <label>
            Select Image:
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </label>
          <button 
            className="save-btn upload-btn" 
            onClick={handleUpload} 
            disabled={uploading || !selectedFile}
          >
            <FiUpload /> {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      <div className="gallery-grid">
        {images.map((img) => (
          <div key={img._id} className="gallery-item-card">
            <div className="img-container">
              <img src={img.image} alt={img.label} />
              <button 
                className="delete-btn"
                onClick={() => handleDelete(img._id)}
                title="Delete Image"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="img-info">
              <span className="img-label">{img.label}</span>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="no-images">
            <FiImage size={40} />
            <p>No images in the gallery yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
