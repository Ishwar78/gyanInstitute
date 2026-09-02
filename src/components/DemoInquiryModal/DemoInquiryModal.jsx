import { useState, useEffect } from "react";
import { FiX, FiCheckCircle, FiSend, FiUser, FiPhone, FiMail, FiBookOpen, FiClock, FiCalendar } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./DemoInquiryModal.css";

export default function DemoInquiryModal({ 
  isOpen, 
  onClose, 
  modalTitle = "Book a Free Demo Class",
  modalBadge = "100% Free Demo Session",
  modalSubtitle = "Experience our live classroom & expert mentor guidance before enrolling.",
  inquiryType = "Free Demo Inquiry",
  submitBtnText = "Book Free Demo Class"
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseName: "",
    programMode: "Offline (Classroom)",
    preferredTime: "Morning (9 AM - 12 PM)",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrorMsg("");
      // Fetch available courses for dropdown
      fetch("http://localhost:5005/api/course")
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setCourses(json.data.filter((c) => c.status !== "Draft"));
            if (json.data.length > 0 && !formData.courseName) {
              setFormData((prev) => ({ ...prev, courseName: json.data[0].title }));
            }
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || `${formData.phone}@lead.in`,
        courseName: formData.courseName || "General Course",
        programMode: formData.programMode,
        type: inquiryType,
        subject: `${inquiryType}: ${formData.courseName || "Course"} (${formData.programMode})`,
        message: `Student registration / inquiry for ${formData.courseName}.\nMode: ${formData.programMode}\nPreferred Slot: ${formData.preferredTime}\nNotes: ${formData.message || "None"}`,
      };

      const res = await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(json.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>

        {submitted ? (
          <div className="demo-success-view">
            <div className="demo-success-icon-wrap">
              <FiCheckCircle />
            </div>
            <h3>Registration Submitted!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>! Your registration request for{" "}
              <strong>{formData.courseName}</strong> has been received. Our team will contact you shortly on{" "}
              <strong>{formData.phone}</strong> to guide you further.
            </p>
            <button className="demo-done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <div className="demo-modal-content">
            <div className="demo-modal-header">
              <div className="demo-badge-wrap">
                <FaGraduationCap /> <span>{modalBadge}</span>
              </div>
              <h2>{modalTitle}</h2>
              <p>{modalSubtitle}</p>
            </div>

            {errorMsg && <div className="demo-error-banner">{errorMsg}</div>}

            <form className="demo-form" onSubmit={handleSubmit}>
              <div className="demo-form-grid">
                <div className="demo-form-group">
                  <label><FiUser /> Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="demo-form-group">
                  <label><FiPhone /> Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter 10-digit number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="demo-form-grid">
                <div className="demo-form-group">
                  <label><FiMail /> Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="demo-form-group">
                  <label><FiBookOpen /> Select Course *</label>
                  <select
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  >
                    {courses.map((c) => (
                      <option key={c._id || c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Digital Marketing with AI">Digital Marketing with AI</option>
                    <option value="Python Data Science">Python Data Science</option>
                    <option value="Personality Development">Personality Development</option>
                    <option value="Basic Computer Course">Basic Computer Course</option>
                    <option value="Tally Prime with GST">Tally Prime with GST</option>
                    <option value="Other / Career Counselling">Other / Career Counselling</option>
                  </select>
                </div>
              </div>

              <div className="demo-form-grid">
                <div className="demo-form-group">
                  <label><FiCalendar /> Learning Mode</label>
                  <select
                    name="programMode"
                    value={formData.programMode}
                    onChange={handleChange}
                  >
                    <option value="Offline (Classroom)">Offline (Classroom Training)</option>
                    <option value="Live Online">Live Online (Interactive)</option>
                    <option value="Hybrid / Flexible">Hybrid / Flexible</option>
                  </select>
                </div>

                <div className="demo-form-group">
                  <label><FiClock /> Preferred Time Slot</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                    <option value="Weekend Batch">Weekend Batch (Sat - Sun)</option>
                  </select>
                </div>
              </div>

              <div className="demo-form-group">
                <label>Message / Any Question (Optional)</label>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="e.g. Need demo on Saturday, inquiry for certificate..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="demo-submit-btn" disabled={loading}>
                {loading ? "Booking Demo..." : "Book Free Demo Class"} <FiSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
