import { useState, useEffect } from "react";
import { FiSave, FiUpload, FiImage, FiAward, FiCheckCircle } from "react-icons/fi";
import "./AdminAbout.css";

export default function AdminAbout() {
  const [formData, setFormData] = useState({
    eyebrow: "ABOUT US",
    heading: "Welcome to Gyan Time",
    introduction: "Gyan Time was established with a vision to provide world-class education...",
    missionStatement: "We believe in empowering young minds...",
    highlights: ["Experienced Faculty", "Modern Infrastructure", "Student Centric Approach", "Proven Results"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=90",
    introImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=90",
    facilityMainImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=90",
    facilitySmallImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=90",
    imageCaption: "Gyan Institute of Professional Studies",
    imageSubLine: "Empowering Students Since 2011",
    experienceBadgeNumber: "15+",
    experienceBadgeText: "Years of Excellence"
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // File states for each image
  const [files, setFiles] = useState({
    heroImage: null,
    introImage: null,
    facilityMainImage: null,
    facilitySmallImage: null,
  });

  const [previews, setPreviews] = useState({
    heroImage: null,
    introImage: null,
    facilityMainImage: null,
    facilitySmallImage: null,
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleFileChange = (field, file) => {
    if (!file) return;
    setFiles(prev => ({ ...prev, [field]: file }));
    const objectUrl = URL.createObjectURL(file);
    setPreviews(prev => ({ ...prev, [field]: objectUrl }));
  };

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/about");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData({
          eyebrow: json.data.eyebrow || "ABOUT US",
          heading: json.data.heading || "Welcome to Gyan Time",
          introduction: json.data.introduction || "",
          missionStatement: json.data.missionStatement || "",
          highlights: json.data.highlights || ["Experienced Faculty", "Modern Infrastructure", "Student Centric Approach", "Proven Results"],
          image: json.data.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
          heroImage: json.data.heroImage || json.data.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=90",
          introImage: json.data.introImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=90",
          facilityMainImage: json.data.facilityMainImage || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=90",
          facilitySmallImage: json.data.facilitySmallImage || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=90",
          imageCaption: json.data.imageCaption || "Gyan Institute of Professional Studies",
          imageSubLine: json.data.imageSubLine || "Empowering Students Since 2011",
          experienceBadgeNumber: json.data.experienceBadgeNumber || "15+",
          experienceBadgeText: json.data.experienceBadgeText || "Years of Excellence"
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

  const uploadSingleFile = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        return json.imageUrl || json.fileUrl;
      } else {
        throw new Error(json.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let updatedPayload = { ...formData };

      // Upload any newly selected files
      if (files.heroImage) {
        const url = await uploadSingleFile(files.heroImage);
        updatedPayload.heroImage = url;
        updatedPayload.image = url; // sync home & about hero image
      }
      if (files.introImage) {
        const url = await uploadSingleFile(files.introImage);
        updatedPayload.introImage = url;
      }
      if (files.facilityMainImage) {
        const url = await uploadSingleFile(files.facilityMainImage);
        updatedPayload.facilityMainImage = url;
      }
      if (files.facilitySmallImage) {
        const url = await uploadSingleFile(files.facilitySmallImage);
        updatedPayload.facilitySmallImage = url;
      }

      const res = await fetch("http://localhost:5005/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });
      const json = await res.json();
      if (json.success) {
        alert("About page & section images updated successfully!");
        setFormData(updatedPayload);
        setFiles({ heroImage: null, introImage: null, facilityMainImage: null, facilitySmallImage: null });
      }
    } catch (err) {
      console.error("Failed to save about data:", err);
      alert("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-page">Loading About data...</div>;

  return (
    <div className="admin-page about-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">ABOUT PAGE & HOMEPAGE</span>
          <h1>About Page & Section Manager</h1>
          <p>Manage all About page images, intro, mission, button captions, and facilities.</p>
        </div>
      </div>
      
      <div className="about-editor">
        
        {/* ── SECTION 1: ABOUT PAGE & HOME HERO IMAGE + BUTTON-STYLE CAPTION ── */}
        <div className="about-image-card">
          <h2><FiImage /> 1. Hero Image & Home Button-Style Caption Line</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 14px" }}>
            This image is used in the About page Hero and the Home page About preview section.
          </p>
          
          <div className="form-row">
            <label className="file-label">
              <FiUpload /> Upload Hero Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange("heroImage", e.target.files[0])} 
              />
            </label>
            <label>
              Or Image URL
              <input 
                name="heroImage" 
                value={formData.heroImage || formData.image} 
                onChange={handleChange} 
                placeholder="https://..." 
              />
            </label>
          </div>

          <div className="about-img-preview-row">
            <img 
              src={previews.heroImage || formData.heroImage || formData.image} 
              alt="Hero Preview" 
              className="about-admin-preview-img"
            />
            <div>
              <b>Hero Image Preview</b>
              <small>Displays with smooth rounded corners and badge without any top/side cutting.</small>
            </div>
          </div>

          <div className="form-row">
            <label>
              Home Image Bottom Button / Caption Line *
              <input 
                name="imageCaption"
                value={formData.imageCaption} 
                onChange={handleChange}
                placeholder="e.g. Gyan Institute of Professional Studies"
              />
            </label>
            <label>
              Image Subtitle / Line
              <input 
                name="imageSubLine"
                value={formData.imageSubLine} 
                onChange={handleChange}
                placeholder="e.g. Empowering Students Since 2011"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Floating Badge Number
              <input 
                name="experienceBadgeNumber"
                value={formData.experienceBadgeNumber} 
                onChange={handleChange}
                placeholder="15+"
              />
            </label>
            <label>
              Floating Badge Text
              <input 
                name="experienceBadgeText"
                value={formData.experienceBadgeText} 
                onChange={handleChange}
                placeholder="Years of Excellence"
              />
            </label>
          </div>
        </div>

        {/* ── SECTION 2: INTRO SECTION ("WHO WE ARE") IMAGE ── */}
        <div className="about-image-card">
          <h2><FiImage /> 2. "Who We Are" Intro Section Image</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 14px" }}>
            The main visual shown on the About page next to the introductory paragraphs.
          </p>
          
          <div className="form-row">
            <label className="file-label">
              <FiUpload /> Upload Intro Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange("introImage", e.target.files[0])} 
              />
            </label>
            <label>
              Or Image URL
              <input 
                name="introImage" 
                value={formData.introImage} 
                onChange={handleChange} 
                placeholder="https://..." 
              />
            </label>
          </div>

          <div className="about-img-preview-row">
            <img 
              src={previews.introImage || formData.introImage} 
              alt="Intro Preview" 
              className="about-admin-preview-img"
            />
            <div>
              <b>Intro Image Preview</b>
              <small>Appears in the Who We Are section with the floating student count badge.</small>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: FACILITIES SECTION IMAGES ── */}
        <div className="about-image-card">
          <h2><FiImage /> 3. "Our Facilities" Section Images</h2>
          <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 14px" }}>
            Two images displayed in the modern campus & classrooms showcase on the About page.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Facility Main Image */}
            <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <b style={{ display: "block", marginBottom: "8px", fontSize: "13px" }}>Facility Main Image (Left Large)</b>
              <label className="file-label" style={{ marginBottom: "8px" }}>
                <FiUpload /> Upload Main Image
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange("facilityMainImage", e.target.files[0])} 
                />
              </label>
              <input 
                name="facilityMainImage" 
                value={formData.facilityMainImage} 
                onChange={handleChange} 
                placeholder="Image URL..." 
              />
              <img 
                src={previews.facilityMainImage || formData.facilityMainImage} 
                alt="Facility Main" 
                style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }}
              />
            </div>

            {/* Facility Small Image */}
            <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <b style={{ display: "block", marginBottom: "8px", fontSize: "13px" }}>Facility Small Image (Right Floating)</b>
              <label className="file-label" style={{ marginBottom: "8px" }}>
                <FiUpload /> Upload Small Image
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange("facilitySmallImage", e.target.files[0])} 
                />
              </label>
              <input 
                name="facilitySmallImage" 
                value={formData.facilitySmallImage} 
                onChange={handleChange} 
                placeholder="Image URL..." 
              />
              <img 
                src={previews.facilitySmallImage || formData.facilitySmallImage} 
                alt="Facility Small" 
                style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }}
              />
            </div>
          </div>
        </div>

        {/* ── SECTION 4: TEXT CONTENT & HIGHLIGHTS ── */}
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
          Introduction Text
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
          <FiSave /> {saving ? "Saving All Changes..." : "Save All About Settings"}
        </button>
      </div>
    </div>
  );
}
