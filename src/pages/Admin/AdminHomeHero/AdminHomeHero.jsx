import { useState, useEffect } from "react";
import { FiImage, FiSave } from "react-icons/fi";
import "./AdminHomeHero.css";

export default function AdminHomeHero() {
  const [formData, setFormData] = useState({
    badgeText: "",
    heading: "",
    highlightedWord: "",
    description: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    imageUrl: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/home-hero");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData({
          badgeText: json.data.badgeText || "",
          heading: json.data.heading || "",
          highlightedWord: json.data.highlightedWord || "",
          description: json.data.description || "",
          primaryButtonText: json.data.primaryButtonText || "",
          secondaryButtonText: json.data.secondaryButtonText || "",
          imageUrl: json.data.imageUrl || "",
          images: json.data.images && json.data.images.length > 0 ? json.data.images : (json.data.imageUrl ? [json.data.imageUrl] : []),
        });
      }
    } catch (err) {
      console.error("Failed to load hero data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("http://localhost:5005/api/home-hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        alert("Hero section updated successfully!");
      }
    } catch (err) {
      console.error("Failed to save hero data:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setSaving(true);
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, images: [...formData.images, json.imageUrl] });
      } else {
        alert("Upload failed: " + json.message);
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Error uploading image");
    } finally {
      setSaving(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  if (loading) return <div className="admin-page">Loading...</div>;

  return (
    <div className="admin-page hero-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">HOMEPAGE CONTENT</span>
          <h1>Home Hero Section</h1>
          <p>Update the main headline, supporting text, buttons and hero image.</p>
        </div>
      </div>
      <div className="hero-editor">
        <div className="hero-form">
          <label>Badge Text
            <input name="badgeText" value={formData.badgeText} onChange={handleChange} />
          </label>
          <label>Main Heading
            <input name="heading" value={formData.heading} onChange={handleChange} />
          </label>
          <label>Highlighted Word
            <input name="highlightedWord" value={formData.highlightedWord} onChange={handleChange} />
          </label>
          <label>Hero Description
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
          </label>
          <label>Images (Slider)
            <input type="file" accept="image/*" onChange={handleUpload} style={{border: 'none', padding: '10px 0'}} />
          </label>
          <div className="hero-images-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {formData.images.map((img, index) => (
              <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img src={img} alt={`slide-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                <button 
                  onClick={() => removeImage(index)} 
                  style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', display: 'grid', placeItems: 'center' }}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="form-grid">
            <label>Primary Button
              <input name="primaryButtonText" value={formData.primaryButtonText} onChange={handleChange} />
            </label>
            <label>Secondary Button
              <input name="secondaryButtonText" value={formData.secondaryButtonText} onChange={handleChange} />
            </label>
          </div>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <FiSave /> {saving ? "Saving..." : "Save Hero Changes"}
          </button>
        </div>
        <div className="hero-preview">
          <span>LIVE PREVIEW</span>
          <div>
            {formData.images.length > 0 ? (
              <img src={formData.images[0]} alt="preview" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px'}} />
            ) : (
              <FiImage />
            )}
            <h3>{formData.heading}<br /><b>{formData.highlightedWord}</b></h3>
            <p>{formData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
