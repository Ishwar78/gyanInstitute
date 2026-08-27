import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import "./AdminTestimonials.css";


export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    text: "",
    image: "",
    status: "Active"
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/testimonial");
      const json = await res.json();
      if (json.success) {
        setTestimonials(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      course: "",
      text: "",
      image: "",
      status: "Active"
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingId(t._id);
    setFormData({
      name: t.name || "",
      course: t.course || "",
      text: t.text || "",
      image: t.image || "",
      status: t.status || "Active"
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const handleUpload = async () => {
    if (!selectedFile) return formData.image;
    
    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("image", selectedFile);
      
      const uploadRes = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const uploadJson = await uploadRes.json();
      
      if (uploadJson.success) {
        return uploadJson.imageUrl;
      } else {
        alert("Upload failed: " + uploadJson.message);
        return null;
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const imageUrl = await handleUpload();
    if (!imageUrl && !formData.image) {
      alert("Please upload or provide an image.");
      return;
    }

    const payload = {
      ...formData,
      image: imageUrl || formData.image,
    };

    try {
      const url = editingId 
        ? `http://localhost:5005/api/testimonial/${editingId}`
        : "http://localhost:5005/api/testimonial";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchTestimonials();
      } else {
        alert("Failed to save testimonial: " + json.message);
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Error saving testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`http://localhost:5005/api/testimonial/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchTestimonials();
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Testimonials</h1>
          <p>Manage student reviews shown on the home page.</p>
        </div>
        <button className="primary-btn" onClick={openAddModal}>
          <FiPlus /> Add Testimonial
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading testimonials...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={t.image} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                      <b>{t.name}</b>
                    </div>
                  </td>
                  <td>{t.course}</td>
                  <td><span className={`status ${t.status === "Draft" ? "draft" : ""}`}>{t.status}</span></td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(t)}><FiEdit3/></button>
                      <button onClick={() => handleDelete(t._id)}><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: "center"}}>No testimonials found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="course-modal-overlay">
          <div className="course-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>Student Name
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </label>
                <label>Course Name
                  <input required value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} placeholder="e.g. Graphic Design" />
                </label>
              </div>

              <label>Review Text
                <textarea required rows="4" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} />
              </label>

              <div className="image-upload-row">
                <label className="file-label">
                  Student Image
                  <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
                </label>
                {(imagePreview || formData.image) && (
                  <div className="image-preview">
                    <img src={imagePreview || formData.image} alt="Preview" height="60" style={{ borderRadius: "50%" }} />
                  </div>
                )}
              </div>

              <label>Status
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <div className="modal-foot">
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={uploading}>
                  {uploading ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
