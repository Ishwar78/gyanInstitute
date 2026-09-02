import { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiCheckCircle,
  FiUploadCloud,
  FiX,
  FiArrowRight,
  FiUsers,
  FiFileText,
  FiChevronRight
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  
  // Selected Job for Applying
  const [activeJob, setActiveJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState([]);

  const toggleJobExpand = (jobId) => {
    if (expandedJobs.includes(jobId)) {
      setExpandedJobs(expandedJobs.filter(id => id !== jobId));
    } else {
      setExpandedJobs([...expandedJobs, jobId]);
    }
  };
  
  // Application Form State
  const [applicant, setApplicant] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "0-1 Years",
    qualification: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/job?status=Active");
      const json = await res.json();
      if (json.success) {
        setJobs(json.data);
      }
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const openApplyModal = (job) => {
    setActiveJob(job);
    setApplicant({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      experience: "0-1 Years",
      qualification: "",
      coverLetter: "",
    });
    setResumeFile(null);
    setSubmitted(false);
    setErrorMsg("");
    setApplyModalOpen(true);
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return null;
    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const res = await fetch("http://localhost:5005/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        return {
          resumeUrl: json.fileUrl || json.imageUrl || json.videoUrl,
          resumeFilename: resumeFile.name,
        };
      } else {
        throw new Error(json.message || "Failed to upload resume");
      }
    } catch (err) {
      console.error("Resume upload error:", err);
      throw err;
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setErrorMsg("Please upload your CV / Resume (PDF or DOC format).");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg("");

      // 1. Upload Resume
      const uploadRes = await handleResumeUpload();
      if (!uploadRes || !uploadRes.resumeUrl) {
        throw new Error("Could not process resume upload. Please try again.");
      }

      // 2. Submit Application
      const payload = {
        jobId: activeJob ? activeJob._id : null,
        jobTitle: activeJob ? activeJob.title : "General Career Application",
        ...applicant,
        resumeUrl: uploadRes.resumeUrl,
        resumeFilename: uploadRes.resumeFilename,
      };

      const res = await fetch("http://localhost:5005/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(json.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      (j.department && j.department.toLowerCase().includes(search.toLowerCase())) ||
      (j.location && j.location.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === "All" || j.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="jobs-page">
      {/* Hero Banner */}
      <section className="jobs-hero">
        <div className="jobs-hero-inner">
          <div className="jobs-hero-content">
            <span className="eyebrow">CAREERS AT GYAN TIME</span>
            <h1>
              Build Your Career With <em>Gyan Time</em>
            </h1>
            <p>
              Join our growing network of passionate educators, mentors, tech trainers, and hiring partners. 
              Explore current open positions or submit your profile for upcoming opportunities.
            </p>
            <div className="jobs-hero-badges">
              <div><FiUsers /> <span>50+ Partner Companies</span></div>
              <div><FiCheckCircle /> <span>Transparent Hiring</span></div>
              <div><FaGraduationCap /> <span>Skill Growth & Support</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="jobs-main section-shell">
        <div className="jobs-toolbar">
          <div className="jobs-search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search by job title, department, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="jobs-type-filters">
            {["All", "Full-time", "Part-time", "Internship", "Contract"].map((type) => (
              <button
                key={type}
                className={selectedType === type ? "active" : ""}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="jobs-list">
          {loading ? (
            <div className="jobs-loading">
              <div className="spinner"></div>
              <p>Loading available positions...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="no-jobs-found">
              <FiBriefcase />
              <h3>No Openings Found</h3>
              <p>Currently there are no vacancies matching your search criteria. You can submit a general application below.</p>
              <button className="general-apply-btn" onClick={() => openApplyModal({ title: "General Career Application" })}>
                Submit General Application <FiArrowRight />
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <article className="job-card" key={job._id}>
                <div className="job-card-header">
                  <div>
                    <span className="job-dept">{job.department || "General"}</span>
                    <h2>{job.title}</h2>
                  </div>
                  <span className="job-type-pill">{job.type}</span>
                </div>

                <div className="job-meta-row">
                  <span><FiMapPin /> {job.location || "Rohtak, Haryana"}</span>
                  <span><FiClock /> {job.experience || "Fresher / Experienced"}</span>
                  <span><FiDollarSign /> {job.salary || "Best in Industry"}</span>
                </div>

                {(() => {
                  const isExpanded = expandedJobs.includes(job._id);
                  const isLong = (job.description || "").length > 220;
                  return (
                    <div className="job-description-box">
                      <div
                        className={`job-description-preview ${isLong && !isExpanded ? "collapsed" : "expanded"}`}
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                      {isLong && (
                        <button
                          type="button"
                          className="job-desc-toggle-btn"
                          onClick={() => toggleJobExpand(job._id)}
                        >
                          {isExpanded ? "Read Less ↑" : "Read More Description ↓"}
                        </button>
                      )}
                    </div>
                  );
                })()}

                {job.requirements && job.requirements.length > 0 && (
                  <div className="job-skills-wrap">
                    {job.requirements.map((req, i) => (
                      <span key={i} className="skill-tag">{req}</span>
                    ))}
                  </div>
                )}

                <div className="job-card-footer">
                  <span className="job-openings-tag">{job.openings || 1} Opening(s)</span>
                  <button
                    className="apply-job-btn"
                    onClick={() => openApplyModal(job)}
                  >
                    Apply Now <FiChevronRight />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Application Modal */}
      {applyModalOpen && (
        <div className="apply-modal-overlay">
          <div className="apply-modal">
            <div className="apply-modal-head">
              <div>
                <span className="modal-eyebrow">JOB APPLICATION</span>
                <h3>{activeJob ? activeJob.title : "Submit Your Application"}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setApplyModalOpen(false)}>
                <FiX />
              </button>
            </div>

            {submitted ? (
              <div className="apply-success-box">
                <FiCheckCircle />
                <h4>Application Submitted Successfully!</h4>
                <p>
                  Thank you for applying for <b>{activeJob?.title}</b>. Our recruitment team has received your profile and CV. We will review your details and reach out to you shortly.
                </p>
                <button className="btn-done" onClick={() => setApplyModalOpen(false)}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="apply-modal-form">
                {errorMsg && <div className="apply-error-banner">{errorMsg}</div>}

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={applicant.fullName}
                      onChange={(e) => setApplicant({ ...applicant, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>City / Current Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohtak, Haryana"
                      value={applicant.city}
                      onChange={(e) => setApplicant({ ...applicant, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Total Experience</label>
                    <select
                      value={applicant.experience}
                      onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                    >
                      <option value="Fresher">Fresher (No Experience)</option>
                      <option value="0-1 Years">0 - 1 Year</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Highest Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech / BCA / MCA / Graduate"
                      value={applicant.qualification}
                      onChange={(e) => setApplicant({ ...applicant, qualification: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Upload Resume / CV * (PDF, DOC, DOCX)</label>
                  <div className="file-drop-area">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                    />
                    <div className="file-drop-info">
                      <FiUploadCloud />
                      {resumeFile ? (
                        <span className="file-chosen-name"><FiFileText /> {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      ) : (
                        <span>Click or drag your Resume / CV here (Max 20MB)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Cover Note / Message (Optional)</label>
                  <textarea
                    rows="3"
                    placeholder="Briefly tell us why you are a good fit for this role..."
                    value={applicant.coverLetter}
                    onChange={(e) => setApplicant({ ...applicant, coverLetter: e.target.value })}
                  />
                </div>

                <div className="apply-modal-foot">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setApplyModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-submit-apply"
                    disabled={submitting}
                  >
                    {submitting ? "Uploading & Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
