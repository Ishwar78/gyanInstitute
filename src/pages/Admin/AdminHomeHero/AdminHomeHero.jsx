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
          <p>Manage the Hero text content (displayed on mobile) and Image Slider (displayed on desktop).</p>
        </div>
      </div>
      <div className="hero-editor">
        <div className="hero-form">
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 14px', borderRadius: '8px', marginBottom: '15px', color: '#166534', fontSize: '13.5px' }}>
            💡 <strong>Note:</strong> The text content below is displayed on the <strong>Mobile View Hero Banner</strong>, while the <strong>Images</strong> are displayed in the <strong>Desktop Slider</strong>.
          </div>

          <h3 style={{ fontSize: '16px', color: '#0f172a', margin: '15px 0 10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
            📱 Mobile View Hero Text Content
          </h3>

          <label>Badge Text / Tagline
            <input name="badgeText" placeholder="e.g. Top Rated Institute" value={formData.badgeText} onChange={handleChange} />
          </label>
          <label>Main Heading
            <input name="heading" placeholder="e.g. Empowering Minds, Shaping" value={formData.heading} onChange={handleChange} />
          </label>
          <label>Highlighted Word (Colored Text)
            <input name="highlightedWord" placeholder="e.g. Futures" value={formData.highlightedWord} onChange={handleChange} />
          </label>
          <label>Hero Description / Paragraph
            <textarea name="description" placeholder="Write a short summary about the institute..." value={formData.description} onChange={handleChange} rows="4" />
          </label>
          
          <div className="form-grid">
            <label>Primary Button Label
              <input name="primaryButtonText" placeholder="e.g. Explore Courses" value={formData.primaryButtonText} onChange={handleChange} />
            </label>
            <label>Secondary Button Label
              <input name="secondaryButtonText" placeholder="e.g. Inquiry Now" value={formData.secondaryButtonText} onChange={handleChange} />
            </label>
          </div>

          <h3 style={{ fontSize: '16px', color: '#0f172a', margin: '20px 0 10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
            💻 Desktop View Hero Image Slider
          </h3>

          <label>Upload Slide Image
            <input type="file" accept="image/*" onChange={handleUpload} style={{border: 'none', padding: '10px 0'}} />
          </label>
          <div className="hero-images-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {formData.images.map((img, index) => (
              <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img src={img} alt={`slide-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                <button 
                  onClick={() => removeImage(index)} 
                  style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '13px', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
                  ×
                </button>
              </div>
            ))}
          </div>

          <button className="save-btn" onClick={handleSave} disabled={saving} style={{ marginTop: '10px' }}>
            <FiSave /> {saving ? "Saving..." : "Save Hero Changes"}
          </button>
        </div>

        <div className="hero-preview">
          <span>LIVE PREVIEW</span>
          <div style={{ background: '#0b2546', color: '#fff', padding: '20px', borderRadius: '12px', marginTop: '10px' }}>
            <span style={{ fontSize: '11px', color: '#f5ad16', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(245,173,22,0.4)', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>
              ★ {formData.badgeText || "Top Rated Institute"}
            </span>
            <h3 style={{ fontSize: '22px', color: '#fff', margin: '0 0 10px', lineHeight: '1.2' }}>
              {formData.heading || "Empowering Minds, Shaping"} <b style={{ color: '#f5ad16' }}>{formData.highlightedWord || "Futures"}</b>
            </h3>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 15px' }}>
              {formData.description || "At Gyan Time, we provide quality education, expert guidance and holistic development to help students build a successful career."}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ background: '#f5ad16', color: '#0b2546', fontSize: '12px', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px' }}>
                {formData.primaryButtonText || "Explore Courses"} →
              </span>
              <span style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: '12px', padding: '6px 12px', borderRadius: '6px' }}>
                {formData.secondaryButtonText || "Inquiry Now"}
              </span>
            </div>

            {formData.images.length > 0 && (
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '15px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Desktop Slider Preview:</span>
                <img src={formData.images[0]} alt="Desktop preview" style={{width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #f5ad16'}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
