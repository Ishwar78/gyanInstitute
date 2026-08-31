import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AdminCourses.css";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Computer Courses",
    duration: "",
    level: "",
    mode: "Offline",
    fee: "",
    description: "",
    longDescription: "",
    syllabus: [{ title: "", topics: [""] }],
    highlights: [""],
    faqs: [{ question: "", answer: "" }],
    image: "",
    video: "",
    status: "Active"
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5005/api/category");
      const json = await res.json();
      if (json.success) {
        setCategories(json.data.filter(c => c.status !== "Draft"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedVideoFile) {
      setVideoPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedVideoFile);
    setVideoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedVideoFile]);

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Syllabus Module & Topic Handlers
  const normalizeSyllabus = (syl) => {
    if (!syl || syl.length === 0) return [{ title: "", topics: [""] }];
    return syl.map((item) => {
      if (typeof item === "string") {
        return { title: item, topics: [] };
      }
      return {
        title: item.title || "",
        topics: Array.isArray(item.topics) && item.topics.length > 0 ? item.topics : [""],
      };
    });
  };

  const handleModuleTitleChange = (modIdx, title) => {
    const updated = [...formData.syllabus];
    updated[modIdx] = { ...updated[modIdx], title };
    setFormData({ ...formData, syllabus: updated });
  };

  const handleTopicChange = (modIdx, topicIdx, value) => {
    const updated = [...formData.syllabus];
    const updatedTopics = [...(updated[modIdx].topics || [])];
    updatedTopics[topicIdx] = value;
    updated[modIdx] = { ...updated[modIdx], topics: updatedTopics };
    setFormData({ ...formData, syllabus: updated });
  };

  const addTopic = (modIdx) => {
    const updated = [...formData.syllabus];
    const updatedTopics = [...(updated[modIdx].topics || []), ""];
    updated[modIdx] = { ...updated[modIdx], topics: updatedTopics };
    setFormData({ ...formData, syllabus: updated });
  };

  const removeTopic = (modIdx, topicIdx) => {
    const updated = [...formData.syllabus];
    const updatedTopics = (updated[modIdx].topics || []).filter((_, i) => i !== topicIdx);
    updated[modIdx] = { ...updated[modIdx], topics: updatedTopics.length > 0 ? updatedTopics : [""] };
    setFormData({ ...formData, syllabus: updated });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      syllabus: [...formData.syllabus, { title: "", topics: [""] }],
    });
  };

  const removeModule = (modIdx) => {
    const updated = formData.syllabus.filter((_, i) => i !== modIdx);
    setFormData({ ...formData, syllabus: updated.length > 0 ? updated : [{ title: "", topics: [""] }] });
  };

  // FAQ Handlers
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const addFaq = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] });
  };

  const removeFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/course");
      const json = await res.json();
      if (json.success) {
        setCourses(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: "Computer Courses",
      duration: "",
      level: "",
      mode: "Offline",
      fee: "",
      description: "",
      longDescription: "",
      syllabus: [{ title: "", topics: [""] }],
      highlights: [""],
      faqs: [{ question: "", answer: "" }],
      image: "",
      video: "",
      status: "Active"
    });
    setSelectedFile(null);
    setSelectedVideoFile(null);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingId(course._id);
    setFormData({
      title: course.title || "",
      slug: course.slug || "",
      category: course.category || "Computer Courses",
      duration: course.duration || "",
      level: course.level || "",
      mode: course.mode || "Offline",
      fee: course.fee || "",
      description: course.description || "",
      longDescription: course.longDescription || "",
      syllabus: normalizeSyllabus(course.syllabus),
      highlights: course.highlights?.length ? course.highlights : [""],
      faqs: course.faqs?.length ? course.faqs : [{ question: "", answer: "" }],
      image: course.image || "",
      video: course.video || "",
      status: course.status || "Active"
    });
    setSelectedFile(null);
    setSelectedVideoFile(null);
    setModalOpen(true);
  };

  const handleUpload = async () => {
    let finalImageUrl = formData.image;
    let finalVideoUrl = formData.video;
    
    try {
      setUploading(true);

      // Upload image if selected
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("image", selectedFile);
        const uploadRes = await fetch("http://localhost:5005/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          finalImageUrl = uploadJson.imageUrl;
        } else {
          alert("Image upload failed: " + uploadJson.message);
          return null;
        }
      }

      // Upload video if selected
      if (selectedVideoFile) {
        const videoData = new FormData();
        videoData.append("video", selectedVideoFile);
        const videoRes = await fetch("http://localhost:5005/api/upload", {
          method: "POST",
          body: videoData,
        });
        const videoJson = await videoRes.json();
        if (videoJson.success) {
          finalVideoUrl = videoJson.videoUrl;
        } else {
          alert("Video upload failed: " + videoJson.message);
          return null;
        }
      }

      return { imageUrl: finalImageUrl, videoUrl: finalVideoUrl };
    } catch (err) {
      console.error("Error uploading media:", err);
      alert("Error uploading media");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const mediaResult = await handleUpload();
    if (!mediaResult) return;
    
    const { imageUrl, videoUrl } = mediaResult;
    if (!imageUrl && !formData.image) {
      alert("Please upload or provide an image URL.");
      return;
    }

    const payload = {
      ...formData,
      image: imageUrl || formData.image,
      video: videoUrl || formData.video,
      syllabus: (formData.syllabus || [])
        .map((mod) => ({
          title: (typeof mod === "string" ? mod : mod.title || "").trim(),
          topics: Array.isArray(mod.topics)
            ? mod.topics.map((t) => t.trim()).filter(Boolean)
            : [],
        }))
        .filter((mod) => mod.title || (mod.topics && mod.topics.length > 0)),
      highlights: formData.highlights.filter((i) => i.trim() !== ""),
      faqs: (formData.faqs || []).filter((f) => f.question && f.question.trim() !== ""),
    };

    try {
      const url = editingId 
        ? `http://localhost:5005/api/course/${editingId}`
        : "http://localhost:5005/api/course";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchCourses();
      } else {
        alert("Failed to save course: " + json.message);
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`http://localhost:5005/api/course/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchCourses();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="admin-page course-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">CONTENT MANAGEMENT</span>
          <h1>Courses</h1>
          <p>Add, update and organize courses shown on the public website.</p>
        </div>
        <button onClick={openAddModal}><FiPlus/> Add Course</button>
      </div>

      <div className="admin-toolbar">
        <input placeholder="Search courses..." />
        <select>
          <option>All Categories</option>
          <option>Computer Courses</option>
          <option>Competitive Exams</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading courses...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id}>
                  <td><b>{c.title}</b></td>
                  <td>{c.category}</td>
                  <td>{c.duration}</td>
                  <td><span className={`status ${c.status === "Draft" ? "draft" : ""}`}>{c.status}</span></td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(c)}><FiEdit3/></button>
                      <button onClick={() => handleDelete(c._id)}><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: "center"}}>No courses found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="course-modal-overlay">
          <div className="course-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Course" : "Add New Course"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>Title 
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </label>
                <label>Slug (auto-generated if empty)
                  <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </label>
              </div>

              <div className="form-row">
                <label>Category
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {categories.length > 0 ? (
                      categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)
                    ) : (
                      <option value="Computer Courses">Computer Courses</option>
                    )}
                  </select>
                </label>
                <label>Duration
                  <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 6 Months" />
                </label>
              </div>

              <div className="form-row">
                <label>Level
                  <input required value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} placeholder="e.g. Beginner to Advanced" />
                </label>
                <label>Mode
                  <input required value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} placeholder="e.g. Offline / Online" />
                </label>
                <label>Fee
                  <input required value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} placeholder="e.g. ₹18,000" />
                </label>
              </div>

              <label>Short Description (Card)
                <ReactQuill 
                  theme="snow" 
                  value={formData.description} 
                  onChange={(val) => setFormData({...formData, description: val})} 
                  style={{ background: "#fff", marginBottom: "15px" }}
                />
              </label>

              <label>Long Description (Details Page)
                <ReactQuill 
                  theme="snow" 
                  value={formData.longDescription} 
                  onChange={(val) => setFormData({...formData, longDescription: val})} 
                  style={{ background: "#fff", marginBottom: "15px" }}
                />
              </label>

              {/* Structured Course Syllabus (Modules & Topics) */}
              <div className="syllabus-admin-section" style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontWeight: "700", color: "var(--navy)", margin: 0, display: "block" }}>
                      Course Syllabus (Modules & Topics)
                    </label>
                    <small style={{ color: "#64748b" }}>Add chapters/modules with expandable sub-topics.</small>
                  </div>
                  <button type="button" className="add-array-btn" onClick={addModule} style={{ margin: 0 }}>
                    <FiPlus /> Add Module
                  </button>
                </div>

                {formData.syllabus.map((mod, modIdx) => (
                  <div key={`mod-${modIdx}`} style={{ background: "#fff", padding: "14px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontWeight: "800", color: "var(--gold-dark)", fontSize: "13px", minWidth: "75px" }}>
                        Module {modIdx + 1}:
                      </span>
                      <input
                        value={mod.title}
                        onChange={(e) => handleModuleTitleChange(modIdx, e.target.value)}
                        placeholder="Module Title (e.g. Introduction to HTML5 & Responsive Design)"
                        style={{ flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", fontWeight: "600" }}
                      />
                      {formData.syllabus.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(modIdx)}
                          style={{ background: "#fee2e2", border: "none", color: "#dc2626", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}
                          title="Delete Module"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>

                    {/* Sub-topics list */}
                    <div style={{ paddingLeft: "24px", borderLeft: "2px solid #e2e8f0", marginTop: "10px" }}>
                      <label style={{ fontSize: "11.5px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px", display: "block" }}>
                        Sub-topics / Chapters inside Module {modIdx + 1}
                      </label>
                      {(mod.topics || [""]).map((topic, topicIdx) => (
                        <div key={`top-${modIdx}-${topicIdx}`} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                          <input
                            value={topic}
                            onChange={(e) => handleTopicChange(modIdx, topicIdx, e.target.value)}
                            placeholder={`Topic ${topicIdx + 1} (e.g. Semantic HTML, Forms & Validation)`}
                            style={{ flex: 1, padding: "6px 10px", fontSize: "13px", border: "1px solid #e2e8f0", borderRadius: "5px" }}
                          />
                          {(mod.topics || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(modIdx, topicIdx)}
                              style={{ background: "#f1f5f9", border: "none", color: "#64748b", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addTopic(modIdx)}
                        style={{ background: "#e2e8f0", border: "none", color: "#334155", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginTop: "4px" }}
                      >
                        <FiPlus /> Add Topic
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="array-field" style={{ marginBottom: "16px" }}>
                <label>Highlights</label>
                {formData.highlights.map((item, index) => (
                  <div key={`hl-${index}`} className="array-input-group">
                    <input 
                      value={item} 
                      onChange={(e) => handleArrayChange("highlights", index, e.target.value)} 
                      placeholder={`Highlight item ${index + 1}`}
                    />
                    <button type="button" onClick={() => removeArrayItem("highlights", index)}><FiTrash2 /></button>
                  </div>
                ))}
                <button type="button" className="add-array-btn" onClick={() => addArrayItem("highlights")}><FiPlus /> Add Item</button>
              </div>

              {/* Course-Wise FAQs Section */}
              <div className="faqs-admin-section" style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <label style={{ fontWeight: "700", color: "var(--navy)", marginBottom: "10px", display: "block" }}>
                  Course FAQs (Frequently Asked Questions)
                </label>
                {formData.faqs.map((faq, index) => (
                  <div key={`faq-${index}`} className="faq-admin-item" style={{ background: "#fff", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>FAQ #{index + 1}</span>
                      {formData.faqs.length > 1 && (
                        <button type="button" onClick={() => removeFaq(index)} style={{ background: "#fee2e2", border: "none", color: "#dc2626", padding: "3px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                          <FiTrash2 style={{ verticalAlign: "middle" }} /> Remove
                        </button>
                      )}
                    </div>
                    <input
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      placeholder="Question (e.g. What are the prerequisites for this course?)"
                      style={{ width: "100%", padding: "8px 10px", marginBottom: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}
                    />
                    <textarea
                      rows="2"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      placeholder="Answer to this question..."
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: "6px", fontFamily: "inherit", fontSize: "13px" }}
                    />
                  </div>
                ))}
                <button type="button" className="add-array-btn" onClick={addFaq} style={{ marginTop: "6px" }}>
                  <FiPlus /> Add FAQ
                </button>
              </div>

              <div className="image-upload-row">
                <label className="file-label">
                  Course Image (Thumbnail)
                  <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
                </label>
                {(imagePreview || formData.image) && (
                  <div className="image-preview">
                    <img src={imagePreview || formData.image} alt="Preview" height="60" />
                  </div>
                )}
              </div>

              <div className="image-upload-row">
                <label className="file-label">
                  Course Video (Upload MP4 / WebM video)
                  <input type="file" accept="video/*" onChange={e => setSelectedVideoFile(e.target.files[0])} />
                </label>
                {(videoPreview || formData.video) && (
                  <div className="image-preview" style={{ maxHeight: "70px", overflow: "hidden" }}>
                    <small style={{ display: "block", color: "#1a5c20", fontWeight: "600" }}>✓ Video selected</small>
                    <span style={{ fontSize: "11px", color: "#666" }}>{formData.video || "Local file selected"}</span>
                  </div>
                )}
              </div>

              <label>Or Video / YouTube URL
                <input 
                  type="text"
                  value={formData.video} 
                  onChange={e => setFormData({ ...formData, video: e.target.value })} 
                  placeholder="e.g. https://www.youtube.com/watch?v=... or direct video link" 
                />
              </label>

              <label>Status
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <div className="modal-foot">
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={uploading}>
                  {uploading ? "Saving..." : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
