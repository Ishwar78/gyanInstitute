import { useState, useEffect } from "react";
import {
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDownload,
  FiExternalLink,
  FiTrash2,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiUserCheck,
  FiUserX,
  FiEye,
  FiX
} from "react-icons/fi";
import "./AdminUserDetails.css";

export default function AdminUserDetails() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const [cvPreview, setCvPreview] = useState({ open: false, url: "", name: "", filename: "" });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/job-application");
      const json = await res.json();
      if (json.success) {
        setApplications(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5005/api/job-application/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant profile?")) return;
    try {
      const res = await fetch(`http://localhost:5005/api/job-application/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setApplications((prev) => prev.filter((a) => a._id !== id));
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  const filtered = applications.filter((a) => {
    const matchesSearch =
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.toLowerCase().includes(search.toLowerCase()) ||
      a.city?.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const newCount = applications.filter((a) => a.status === "New").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const hiredCount = applications.filter((a) => a.status === "Hired").length;

  return (
    <div className="admin-page user-details-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">CANDIDATE APPLICATIONS</span>
          <h1>User Details & CVs</h1>
          <p>Review submitted resumes, candidate information, and manage hiring pipeline.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="user-stats-grid">
        <div className="stat-box">
          <FiFileText />
          <div>
            <strong>{totalCount}</strong>
            <span>Total Applications</span>
          </div>
        </div>
        <div className="stat-box stat-new">
          <FiClock />
          <div>
            <strong>{newCount}</strong>
            <span>New Submissions</span>
          </div>
        </div>
        <div className="stat-box stat-shortlisted">
          <FiUserCheck />
          <div>
            <strong>{shortlistedCount}</strong>
            <span>Shortlisted</span>
          </div>
        </div>
        <div className="stat-box stat-hired">
          <FiCheckCircle />
          <div>
            <strong>{hiredCount}</strong>
            <span>Hired Candidates</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="admin-toolbar">
        <div className="search-wrap">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by name, email, phone, city, or job role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <p style={{ padding: "30px" }}>Loading candidate details...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Applied Job</th>
                <th>Contact Details</th>
                <th>Experience & City</th>
                <th>Resume / CV</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="candidate-col">
                      <div className="candidate-avatar">
                        {app.fullName ? app.fullName[0].toUpperCase() : "U"}
                      </div>
                      <div>
                        <b>{app.fullName}</b>
                        {app.qualification && <small>{app.qualification}</small>}
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="job-applied-tag">{app.jobTitle || "General"}</span>
                  </td>

                  <td>
                    <div className="contact-col">
                      <small><FiMail /> {app.email}</small>
                      <small><FiPhone /> {app.phone}</small>
                    </div>
                  </td>

                  <td>
                    <div>
                      <b>{app.experience || "Fresher"}</b>
                      {app.city && (
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          <FiMapPin style={{ verticalAlign: "middle" }} /> {app.city}
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    {app.resumeUrl ? (
                      <button
                        type="button"
                        onClick={() => setCvPreview({
                          open: true,
                          url: app.resumeUrl,
                          name: app.fullName,
                          filename: app.resumeFilename || "Resume Document"
                        })}
                        className="btn-view-resume"
                        title="Preview CV / Resume"
                      >
                        <FiEye /> View CV
                      </button>
                    ) : (
                      <span style={{ color: "#999", fontSize: "12px" }}>No CV</span>
                    )}
                  </td>

                  <td>
                    <select
                      className={`app-status-badge status-${app.status?.toLowerCase()}`}
                      value={app.status || "New"}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        onClick={() => setSelectedApp(app)}
                        title="View Full Details"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        title="Delete Profile"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "35px" }}>
                    No applicant details found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Candidate Details Modal */}
      {selectedApp && (
        <div className="app-detail-overlay">
          <div className="app-detail-modal">
            <div className="modal-head">
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>APPLICANT PROFILE</span>
                <h2>{selectedApp.fullName}</h2>
              </div>
              <button onClick={() => setSelectedApp(null)}><FiX /></button>
            </div>

            <div className="modal-body">
              <div className="detail-info-grid">
                <div>
                  <label>Applied For Role</label>
                  <strong>{selectedApp.jobTitle}</strong>
                </div>

                <div>
                  <label>Application Status</label>
                  <select
                    className={`app-status-badge status-${selectedApp.status?.toLowerCase()}`}
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp._id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>

                <div>
                  <label>Email Address</label>
                  <span><a href={`mailto:${selectedApp.email}`}>{selectedApp.email}</a></span>
                </div>

                <div>
                  <label>Phone Number</label>
                  <span><a href={`tel:${selectedApp.phone}`}>{selectedApp.phone}</a></span>
                </div>

                <div>
                  <label>City / Location</label>
                  <span>{selectedApp.city || "Not Provided"}</span>
                </div>

                <div>
                  <label>Experience</label>
                  <span>{selectedApp.experience || "Fresher"}</span>
                </div>

                <div>
                  <label>Highest Qualification</label>
                  <span>{selectedApp.qualification || "Not Specified"}</span>
                </div>

                <div>
                  <label>Applied On</label>
                  <span>{new Date(selectedApp.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div className="cover-note-box">
                  <label>Cover Note / Candidate Message</label>
                  <p>{selectedApp.coverLetter}</p>
                </div>
              )}

              <div className="cv-download-cta">
                <FiFileText />
                <div>
                  <strong>Candidate CV / Resume File</strong>
                  <span>{selectedApp.resumeFilename || "Resume Document"}</span>
                </div>
                {selectedApp.resumeUrl && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setCvPreview({
                        open: true,
                        url: selectedApp.resumeUrl,
                        name: selectedApp.fullName,
                        filename: selectedApp.resumeFilename || "Resume Document"
                      })}
                      className="btn-download-resume"
                      style={{ background: "var(--navy)", cursor: "pointer" }}
                    >
                      <FiEye /> View CV Here
                    </button>
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-download-resume"
                    >
                      <FiDownload /> Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CV / Resume Preview Modal */}
      {cvPreview.open && (
        <div className="cv-modal-overlay">
          <div className="cv-modal-box">
            <div className="cv-modal-head">
              <div>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>RESUME / CV PREVIEW</span>
                <h3>{cvPreview.name} – {cvPreview.filename}</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href={cvPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-view-direct"
                  title="Open in new tab / Download"
                >
                  <FiExternalLink /> Open / Download
                </a>
                <button
                  className="modal-close-btn"
                  onClick={() => setCvPreview({ open: false, url: "", name: "", filename: "" })}
                >
                  <FiX />
                </button>
              </div>
            </div>

            <div className="cv-modal-viewer">
              {cvPreview.url?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                <div className="cv-image-scroll">
                  <img src={cvPreview.url} alt="CV Preview" />
                </div>
              ) : (
                <iframe
                  src={cvPreview.url}
                  title="CV / Resume Document Viewer"
                  className="cv-frame"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
