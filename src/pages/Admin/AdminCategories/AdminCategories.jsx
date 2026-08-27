import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import "../AdminOverview/AdminOverview.css";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    status: "Active"
  });
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/category");
      const json = await res.json();
      if (json.success) {
        setCategories(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      status: "Active"
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat._id);
    setFormData({
      name: cat.name || "",
      status: cat.status || "Active"
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = editingId 
        ? `http://localhost:5005/api/category/${editingId}`
        : "http://localhost:5005/api/category";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchCategories();
      } else {
        alert("Failed to save category: " + json.message);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`http://localhost:5005/api/category/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchCategories();
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Course Categories</h1>
          <p>Manage the categories used for filtering courses.</p>
        </div>
        <button className="primary-btn" onClick={openAddModal}>
          <FiPlus /> Add Category
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading categories...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c._id}>
                  <td><b>{c.name}</b></td>
                  <td><span className={`status ${c.status === "Draft" ? "draft" : ""}`}>{c.status}</span></td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(c)}><FiEdit3/></button>
                      <button onClick={() => handleDelete(c._id)}><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan="3" style={{textAlign: "center"}}>No categories found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="course-modal-overlay">
          <div className="course-modal" style={{ maxWidth: "500px" }}>
            <div className="modal-head">
              <h2>{editingId ? "Edit Category" : "Add Category"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <label>Category Name
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Computer Courses" />
              </label>

              <label>Status
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <div className="modal-foot">
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
