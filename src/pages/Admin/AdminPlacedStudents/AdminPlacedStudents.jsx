import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiX, FiAward, FiCheckCircle, FiBriefcase, FiDollarSign } from "react-icons/fi";
import "./AdminPlacedStudents.css";

export default function AdminPlacedStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    company: "",
    companyLogo: "",
    role: "Account Executive,",
    package: "₹8.0 LPA",
    worksWithLabel: "Works with:",
    worksWith: "Cadbury, 5 Star",
    course: "Full Stack Web Development",
    courseSlug: "",
    status: "Active",
    order: 0,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5005/api/course");
      const json = await res.json();
      if (json.success) {
        setCoursesList(json.data);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/placed-student");
      const json = await res.json();
      if (json.success) {
        setStudents(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch placed students:", err);
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

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      photo: "",
      company: "",
      companyLogo: "",
      role: "Account Executive,",
      package: "₹8.0 LPA",
      worksWithLabel: "Works with:",
      worksWith: "",
      course: coursesList[0]?.title || "General",
      courseSlug: coursesList[0]?.slug || "",
      status: "Active",
      order: 0,
    });
    setPhotoFile(null);
    setLogoFile(null);
    setModalOpen(true);
  };

  const openEditModal = (st) => {
    setEditingId(st._id);
    setFormData({
      name: st.name || "",
      photo: st.photo || "",
      company: st.company || "",
      companyLogo: st.companyLogo || "",
      role: st.role || "Account Executive,",
      package: st.package || "",
      worksWithLabel: st.worksWithLabel || "Works with:",
      worksWith: st.worksWith || "",
      course: st.course || "General",
      courseSlug: st.courseSlug || "",
      status: st.status || "Active",
      order: st.order || 0,
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
        const uploaded = await uploadFile(logoFile);
        if (uploaded) finalLogo = uploaded;
      }

      if (!finalPhoto) {
        alert("Please upload student photo.");
        setSaving(false);
        return;
      }

      const payload = {
        ...formData,
        photo: finalPhoto,
        companyLogo: finalLogo,
      };

      const url = editingId
        ? `http://localhost:5005/api/placed-student/${editingId}`
        : "http://localhost:5005/api/placed-student";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchStudents();
      } else {
        alert("Failed to save student: " + json.message);
      }
    } catch (err) {
      console.error("Error saving placed student:", err);
      alert("Error saving placed student");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this placed student record?")) return;
    try {
      const res = await fetch(`http://localhost:5005/api/placed-student/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="admin-page placed-students-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">PLACEMENTS & SUCCESS STORIES</span>
          <h1>Placed Students</h1>
          <p>Add and manage placed student records showcased on Course details and Placement sections.</p>
        </div>
        <button className="primary-btn-add" onClick={openAddModal}>
          <FiPlus /> Add Placed Student
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading placed students...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Placed Company</th>
                <th>Role & Package</th>
                <th>Course</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => (
                <tr key={st._id}>
                  <td>
                    <div className="st-info-col">
                      <img src={st.photo} alt={st.name} className="st-thumb" />
                      <div>
                        <b>{st.name}</b>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="company-col">
                      {st.companyLogo && <img src={st.companyLogo} alt={st.company} className="company-thumb" />}
                      <b>{st.company}</b>
                    </div>
                  </td>
                  <td>
                    <b>{st.role}</b>
                    {st.package && <small style={{ display: "block", color: "#16a34a", fontWeight: "700" }}>{st.package}</small>}
                  </td>
                  <td>
                    <span>{st.course}</span>
                  </td>
                  <td>
                    <span className={`status ${st.status === "Active" ? "active" : "draft"}`}>
                      {st.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(st)} title="Edit Student">
                        <FiEdit3 />
                      </button>
                      <button onClick={() => handleDelete(st._id)} title="Delete Student">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                    No placed student records found. Click "Add Placed Student" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="student-modal-overlay">
          <div className="student-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Placed Student" : "Add Placed Student"}</h2>
              <button onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>
                  Student Full Name *
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aman Verma"
                  />
                </label>
                <label>
                  Company Name *
                  <input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. TCS / Infosys / Zomato"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Role / Job Title
                  <input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Account Executive, / Frontend Engineer"
                  />
                </label>
                <label>
                  Package / Salary
                  <input
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    placeholder="e.g. ₹8.5 LPA"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Footer Label (e.g. Works with / Runs ads on / Manages Channels)
                  <input
                    value={formData.worksWithLabel}
                    onChange={(e) => setFormData({ ...formData, worksWithLabel: e.target.value })}
                    placeholder="e.g. Works with: / Runs ads on:"
                  />
                </label>
                <label>
                  Client Names / Brands / Channels
                  <input
                    value={formData.worksWith}
                    onChange={(e) => setFormData({ ...formData, worksWith: e.target.value })}
                    placeholder="e.g. Cadbury, 5 Star / YouTube, Instagram"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Associated Course
                  <select
                    value={formData.courseSlug}
                    onChange={(e) => {
                      const selected = coursesList.find((c) => c.slug === e.target.value);
                      setFormData({
                        ...formData,
                        courseSlug: e.target.value,
                        course: selected ? selected.title : "General",
                      });
                    }}
                  >
                    <option value="">All Courses (General)</option>
                    {coursesList.map((c) => (
                      <option key={c._id} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
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

              <div className="form-row">
                <div className="file-upload-block">
                  <label>
                    Student Photo *
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
                    Company Logo (Optional)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                  </label>
                  {(logoPreview || formData.companyLogo) && (
                    <img src={logoPreview || formData.companyLogo} alt="Logo" className="preview-img logo-preview" />
                  )}
                </div>
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
                  {saving ? "Saving..." : "Save Student Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
