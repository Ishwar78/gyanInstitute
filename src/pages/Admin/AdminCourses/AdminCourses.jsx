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
    syllabus: [""],
    highlights: [""],
    image: "",
    status: "Active"
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
      syllabus: [""],
      highlights: [""],
      image: "",
      status: "Active"
    });
    setSelectedFile(null);
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
      syllabus: course.syllabus?.length ? course.syllabus : [""],
      highlights: course.highlights?.length ? course.highlights : [""],
      image: course.image || "",
      status: course.status || "Active"
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
      alert("Please upload or provide an image URL.");
      return;
    }

    const payload = {
      ...formData,
      image: imageUrl || formData.image,
      syllabus: formData.syllabus.filter(i => i.trim() !== ""),
      highlights: formData.highlights.filter(i => i.trim() !== ""),
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

              <div className="form-row array-row">
                <div className="array-field">
                  <label>Syllabus</label>
                  {formData.syllabus.map((item, index) => (
                    <div key={`syl-${index}`} className="array-input-group">
                      <input 
                        value={item} 
                        onChange={(e) => handleArrayChange("syllabus", index, e.target.value)} 
                        placeholder={`Syllabus item ${index + 1}`}
                      />
                      <button type="button" onClick={() => removeArrayItem("syllabus", index)}><FiTrash2 /></button>
                    </div>
                  ))}
                  <button type="button" className="add-array-btn" onClick={() => addArrayItem("syllabus")}><FiPlus /> Add Item</button>
                </div>

                <div className="array-field">
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
              </div>

              <div className="image-upload-row">
                <label className="file-label">
                  Course Image
                  <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
                </label>
                {(imagePreview || formData.image) && (
                  <div className="image-preview">
                    <img src={imagePreview || formData.image} alt="Preview" height="60" />
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
