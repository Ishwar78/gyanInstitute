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
      setSaving(true); // Reusing saving state for loading indication
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const json = await res.json();
      if (json.success) {
        setFormData({ ...formData, imageUrl: json.imageUrl });
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
          <label>Image URL
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Enter URL or upload below" />
          </label>
          <label>Upload Image
            <input type="file" accept="image/*" onChange={handleUpload} style={{border: 'none', padding: '10px 0'}} />
          </label>
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
            {formData.imageUrl ? <img src={formData.imageUrl} alt="preview" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px'}} /> : <FiImage />}
            <h3>{formData.heading}<br /><b>{formData.highlightedWord}</b></h3>
            <p>{formData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
