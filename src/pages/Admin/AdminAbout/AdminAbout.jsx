import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import "./AdminAbout.css";

export default function AdminAbout() {
  const [formData, setFormData] = useState({
    eyebrow: "ABOUT US",
    heading: "Welcome to Gyan Time",
    introduction: "Gyan Time was established with a vision to provide world-class education...",
    missionStatement: "We believe in empowering young minds...",
    highlights: ["Experienced Faculty", "Modern Infrastructure", "Student Centric Approach", "Proven Results"]
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/about");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData({
          eyebrow: json.data.eyebrow || "",
          heading: json.data.heading || "",
          introduction: json.data.introduction || "",
          missionStatement: json.data.missionStatement || "",
          highlights: json.data.highlights || []
        });
      }
    } catch (err) {
      console.error("Failed to load about data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("http://localhost:5005/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        alert("About section updated successfully!");
      }
    } catch (err) {
      console.error("Failed to save about data:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-page">Loading...</div>;

  return (
    <div className="admin-page about-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">HOMEPAGE & ABOUT</span>
          <h1>About Section</h1>
          <p>Manage the Time introduction, mission and key highlights.</p>
        </div>
      </div>
      
      <div className="about-editor">
        <label>
          Section Eyebrow
          <input 
            name="eyebrow"
            value={formData.eyebrow} 
            onChange={handleChange}
          />
        </label>
        
        <label>
          Heading
          <input 
            name="heading"
            value={formData.heading} 
            onChange={handleChange}
          />
        </label>
        
        <label>
          Introduction
          <textarea 
            rows="4" 
            name="introduction"
            value={formData.introduction} 
            onChange={handleChange}
          />
        </label>
        
        <label>
          Mission Statement
          <textarea 
            rows="5" 
            name="missionStatement"
            value={formData.missionStatement}
            onChange={handleChange}
          />
        </label>
        
        <div className="about-highlights">
          <h2>Key Highlights</h2>
          {formData.highlights.map((x, i) => (
            <label key={i}>
              {i + 1}. Highlight
              <input 
                value={x} 
                onChange={(e) => handleHighlightChange(i, e.target.value)}
              />
            </label>
          ))}
        </div>
        
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          <FiSave /> {saving ? "Saving..." : "Save About Section"}
        </button>
      </div>
    </div>
  );
}
