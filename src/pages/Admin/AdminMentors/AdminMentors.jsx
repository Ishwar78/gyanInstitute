import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiX, FiUserCheck, FiBriefcase, FiAward } from "react-icons/fi";
import "./AdminMentors.css";

export default function AdminMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    role: "Founder, Wearified - India's first influencer-led brand",
    experience: "13 Years",
    company: "Wearified",
    companyLogo: "",
    linkedinUrl: "https://linkedin.com",
    bgColor: "#4f8f97",
    bio: "Passionate about branding and growth...",
    skills: ["Brand Strategy", "Influencer Marketing"],
    status: "Active",
    order: 0,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/mentor");
      const json = await res.json();
      if (json.success) {
        setMentors(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch mentors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreview(null);
      return;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      photo: "",
      role: "VP - Global Marketing",
      experience: "15 Years",
      company: "Top Brand",
      companyLogo: "",
      linkedinUrl: "https://linkedin.com",
      bgColor: "#4f8f97",
      bio: "",
      skills: ["Strategy", "Leadership"],
      status: "Active",
      order: 0,
    });
    setPhotoFile(null);
    setLogoFile(null);
    setModalOpen(true);
  };

  const openEditModal = (m) => {
    setEditingId(m._id);
    setFormData({
      name: m.name || "",
      photo: m.photo || "",
      role: m.role || "Instructor",
      experience: m.experience || "",
      company: m.company || "",
      companyLogo: m.companyLogo || "",
      linkedinUrl: m.linkedinUrl || "",
      bgColor: m.bgColor || "#4f8f97",
      bio: m.bio || "",
      skills: m.skills?.length ? m.skills : [""],
      status: m.status || "Active",
      order: m.order || 0,
    });
    setPhotoFile(null);
    setLogoFile(null);
    setModalOpen(true);
  };

  const uploadFile = async (file) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      return json.success ? (json.imageUrl || json.fileUrl) : null;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      let finalPhoto = formData.photo;
      let finalLogo = formData.companyLogo;

      if (photoFile) {
        const uploaded = await uploadFile(photoFile);
        if (uploaded) finalPhoto = uploaded;
      }

      if (logoFile) {
        const uploadedLogo = await uploadFile(logoFile);
        if (uploadedLogo) finalLogo = uploadedLogo;
      }

      if (!finalPhoto) {
        alert("Please upload mentor photo.");
        setSaving(false);
        return;
      }

      const payload = {
        ...formData,
        photo: finalPhoto,
        companyLogo: finalLogo,
        skills: formData.skills.filter((s) => s.trim() !== ""),
      };

      const url = editingId
        ? `http://localhost:5005/api/mentor/${editingId}`
        : "http://localhost:5005/api/mentor";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchMentors();
      } else {
        alert("Failed to save mentor: " + json.message);
      }
    } catch (err) {
      console.error("Error saving mentor:", err);
      alert("Error saving mentor");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mentor record?")) return;
    try {
      const res = await fetch(`http://localhost:5005/api/mentor/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchMentors();
      }
    } catch (err) {
      console.error("Error deleting mentor:", err);
    }
  };

  return (
    <div className="admin-page mentors-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">FACULTY & INSTRUCTORS</span>
          <h1>Mentors & Trainers</h1>
          <p>Add and manage instructors displayed on Course details and About sections.</p>
        </div>
        <button className="primary-btn-add" onClick={openAddModal}>
          <FiPlus /> Add Mentor
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading mentors...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Role / Designation</th>
                <th>Experience & Company</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((m) => (
                <tr key={m._id}>
                  <td>
                    <div className="mentor-info-col">
                      <img src={m.photo} alt={m.name} className="mentor-thumb" />
                      <div>
                        <b>{m.name}</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <b>{m.role}</b>
                  </td>
                  <td>
                    <div>
                      <small style={{ fontWeight: "700", color: "#1e3a8a", display: "block" }}>{m.experience}</small>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{m.company}</span>
                    </div>
                  </td>
                  <td>
                    <div className="skills-pill-wrap">
                      {m.skills?.map((s, i) => (
                        <span key={i} className="skill-pill">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status ${m.status === "Active" ? "active" : "draft"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(m)} title="Edit Mentor">
                        <FiEdit3 />
                      </button>
                      <button onClick={() => handleDelete(m._id)} title="Delete Mentor">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentors.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                    No mentors found. Click "Add Mentor" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="mentor-modal-overlay">
          <div className="mentor-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Mentor" : "Add New Mentor"}</h2>
              <button onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>
                  Mentor Full Name *
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aman Sharma"
                  />
                </label>
                <label>
                  Designation / Role *
                  <input
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Senior Full Stack Lead & Mentor"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Experience
                  <input
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 10+ Years Experience"
                  />
                </label>
                <label>
                  Company / Background
                  <input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Ex-TCS / Tech Lead"
                  />
                </label>
              </div>

              <label>
                Short Bio / Description
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief summary about mentor's industry background and teaching..."
                />
              </label>

              <div className="skills-edit-section">
                <label>Key Skills / Subjects</label>
                {formData.skills.map((sk, index) => (
                  <div key={`sk-${index}`} className="skill-input-group">
                    <input
                      value={sk}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder={`Skill ${index + 1} (e.g. React.js, Python, System Design)`}
                    />
                    <button type="button" onClick={() => removeSkill(index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button type="button" className="add-skill-btn" onClick={addSkill}>
                  <FiPlus /> Add Skill
                </button>
              </div>

              <div className="form-row">
                <label>
                  Company Name (e.g. Wearified / Coca-Cola)
                  <input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Wearified / Japan Airlines"
                  />
                </label>
                <label>
                  LinkedIn Profile URL
                  <input
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="e.g. https://linkedin.com/in/username"
                  />
                </label>
              </div>

              <div className="form-row">
                <div className="file-upload-block">
                  <label>
                    Mentor Photo *
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhotoFile(e.target.files[0])}
                    />
                  </label>
                  {(photoPreview || formData.photo) && (
                    <img src={photoPreview || formData.photo} alt="Preview" className="preview-img" />
                  )}
                </div>

                <div className="file-upload-block">
                  <label>
                    Company Logo (Floating Badge)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                  </label>
                  {(logoPreview || formData.companyLogo) && (
                    <img src={logoPreview || formData.companyLogo} alt="Logo Preview" className="preview-img logo-preview" />
                  )}
                </div>
              </div>

              <div className="form-row">
                <label>
                  Card Header Background Color (Teal / Blue / Slate)
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "6px" }}>
                    <input
                      type="color"
                      value={formData.bgColor || "#4f8f97"}
                      onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                      style={{ width: "44px", height: "38px", padding: "2px", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      value={formData.bgColor || "#4f8f97"}
                      onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                      placeholder="#4f8f97"
                      style={{ flex: 1 }}
                    />
                  </div>
                </label>

                <label>
                  Status
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </label>
              </div>

              <div className="modal-foot">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Mentor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
