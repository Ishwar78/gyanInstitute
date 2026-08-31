import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiX, FiBriefcase, FiMapPin, FiClock } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AdminJobs.css";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "Computer & IT Training",
    location: "Rohtak, Haryana",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "Best in Industry",
    openings: 1,
    description: "",
    requirements: [""],
    deadline: "",
    status: "Active",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/job");
      const json = await res.json();
      if (json.success) {
        setJobs(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementChange = (index, value) => {
    const newReqs = [...formData.requirements];
    newReqs[index] = value;
    setFormData({ ...formData, requirements: newReqs });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ""] });
  };

  const removeRequirement = (index) => {
    const newReqs = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newReqs });
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      department: "Computer & IT Training",
      location: "Rohtak, Haryana",
      type: "Full-time",
      experience: "0-2 Years",
      salary: "Best in Industry",
      openings: 1,
      description: "",
      requirements: [""],
      deadline: "",
      status: "Active",
    });
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingId(job._id);
    setFormData({
      title: job.title || "",
      slug: job.slug || "",
      department: job.department || "Computer & IT Training",
      location: job.location || "Rohtak, Haryana",
      type: job.type || "Full-time",
      experience: job.experience || "0-2 Years",
      salary: job.salary || "Best in Industry",
      openings: job.openings || 1,
      description: job.description || "",
      requirements: job.requirements?.length ? job.requirements : [""],
      deadline: job.deadline || "",
      status: job.status || "Active",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
      };

      const url = editingId
        ? `http://localhost:5005/api/job/${editingId}`
        : "http://localhost:5005/api/job";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchJobs();
      } else {
        alert("Failed to save job: " + json.message);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job vacancy?")) return;
    try {
      const res = await fetch(`http://localhost:5005/api/job/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchJobs();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="admin-page jobs-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">CAREERS & RECRUITMENT</span>
          <h1>Job Vacancies</h1>
          <p>Create and manage job openings displayed on the website career section.</p>
        </div>
        <button className="primary-btn-add" onClick={openAddModal}>
          <FiPlus /> Add New Job
        </button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading job openings...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Location & Type</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <b>{job.title}</b>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {job.openings} Opening(s) • {job.salary}
                    </div>
                  </td>
                  <td>{job.department}</td>
                  <td>
                    {job.location} <br />
                    <small style={{ color: "#0284c7", fontWeight: "600" }}>{job.type}</small>
                  </td>
                  <td>{job.experience}</td>
                  <td>
                    <span className={`status ${job.status === "Active" ? "active" : "draft"}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button onClick={() => openEditModal(job)} title="Edit Job">
                        <FiEdit3 />
                      </button>
                      <button onClick={() => handleDelete(job._id)} title="Delete Job">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                    No job postings found. Click "Add New Job" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="job-modal-overlay">
          <div className="job-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Job Vacancy" : "Add New Job Vacancy"}</h2>
              <button onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>
                  Job Title *
                  <input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Full Stack Trainer / Counselor"
                  />
                </label>
                <label>
                  Slug (auto-generated if empty)
                  <input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. senior-full-stack-trainer"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Department
                  <input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. IT & Software / Admissions / Admin"
                  />
                </label>
                <label>
                  Location
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Rohtak, Haryana / Hybrid"
                  />
                </label>
              </div>

              <div className="form-row form-row-3">
                <label>
                  Job Type
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </label>
                <label>
                  Experience
                  <input
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 0-2 Years / Fresher"
                  />
                </label>
                <label>
                  Salary / Package
                  <input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹3,50,000 - ₹5,00,000 PA"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Number of Openings
                  <input
                    type="number"
                    min="1"
                    value={formData.openings}
                    onChange={(e) => setFormData({ ...formData, openings: Number(e.target.value) })}
                  />
                </label>
                <label>
                  Application Deadline (Optional)
                  <input
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="e.g. 30 Sep 2026"
                  />
                </label>
              </div>

              <label>
                Job Description *
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(val) => setFormData({ ...formData, description: val })}
                  style={{ background: "#fff", marginBottom: "15px" }}
                />
              </label>

              <div className="requirements-section">
                <label>Key Requirements / Skills Needed</label>
                {formData.requirements.map((req, index) => (
                  <div key={`req-${index}`} className="req-input-group">
                    <input
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder={`Requirement #${index + 1} (e.g. React.js, Good Communication)`}
                    />
                    <button type="button" onClick={() => removeRequirement(index)}>
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button type="button" className="add-req-btn" onClick={addRequirement}>
                  <FiPlus /> Add Requirement
                </button>
              </div>

              <label>
                Status
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active (Visible on Website)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>

              <div className="modal-foot">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Job Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
