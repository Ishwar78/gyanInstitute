import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../AdminOverview/AdminOverview.css";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image: "",
    author: "Admin",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    status: "Active"
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/blog");
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      summary: "",
      content: "",
      image: "",
      author: "Admin",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "Active"
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      summary: blog.summary || "",
      content: blog.content || "",
      image: blog.image || "",
      author: blog.author || "Admin",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
      status: blog.status || "Active"
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
        ? `http://localhost:5005/api/blog/${editingId}`
        : "http://localhost:5005/api/blog";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchBlogs();
      } else {
        alert("Failed to save blog: " + json.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`http://localhost:5005/api/blog/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchBlogs();
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Blog Management</h1>
          <p>Create and manage articles and their SEO metadata.</p>
        </div>
        <button className="primary-btn" onClick={openAddModal}>
          <FiPlus /> Add Article
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading blogs...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={b.image} alt={b.title} style={{ width: "60px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />
                      <b>{b.title}</b>
                    </div>
                  </td>
                  <td>{b.author}</td>
                  <td>{new Date(b.publishDate).toLocaleDateString()}</td>
                  <td><span className={`status ${b.status === "Draft" ? "draft" : ""}`}>{b.status}</span></td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(b)}><FiEdit3/></button>
                      <button onClick={() => handleDelete(b._id)}><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: "center"}}>No articles found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="course-modal-overlay">
          <div className="course-modal" style={{ maxWidth: "800px" }}>
            <div className="modal-head">
              <h2>{editingId ? "Edit Article" : "Add Article"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>Title
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </label>
                <label>Slug (URL)
                  <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="auto-generated if empty" />
                </label>
              </div>

              <div className="form-row">
                <label>Author
                  <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                </label>
                <label>Status
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>
              </div>

              <label>Short Summary (Card Description)
                <textarea required rows="2" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
              </label>

              <label>Full Content (Rich Text)
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={(val) => setFormData({...formData, content: val})} 
                  style={{ background: "#fff", marginBottom: "15px" }}
                />
              </label>

              <div className="image-upload-row" style={{ marginBottom: "20px" }}>
                <label className="file-label">
                  Cover Image
                  <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} />
                </label>
                {(imagePreview || formData.image) && (
                  <div className="image-preview">
                    <img src={imagePreview || formData.image} alt="Preview" height="60" style={{ borderRadius: "4px" }} />
                  </div>
                )}
              </div>

              <div style={{ padding: "15px", background: "#f8fafd", borderRadius: "8px", border: "1px solid #dfe5ec" }}>
                <h3 style={{ margin: "0 0 15px", fontSize: "16px", color: "var(--navy)" }}>SEO Settings</h3>
                <label>Meta Title (SEO)
                  <input value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} placeholder="Default: Article Title" />
                </label>
                <label>Meta Description (SEO)
                  <textarea rows="2" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} placeholder="Default: Short Summary" />
                </label>
                <label>Meta Keywords (SEO)
                  <input value={formData.metaKeywords} onChange={e => setFormData({...formData, metaKeywords: e.target.value})} placeholder="e.g. gyan Time, education, career" />
                </label>
              </div>

              <div className="modal-foot">
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={uploading}>
                  {uploading ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
