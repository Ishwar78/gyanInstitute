import { useEffect, useState } from "react";
import { FiCheckCircle, FiClock, FiEye, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import "./AdminInquiries.css";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "brochure" | "general"
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/inquiry");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch inquiries");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5005/api/inquiry/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const isDemoInquiry = (x) => {
    return (
      x.type === "Free Demo Inquiry" ||
      x.type === "Demo Class" ||
      x.subject?.toLowerCase().includes("demo") ||
      x.message?.toLowerCase().includes("demo")
    );
  };

  const isBrochureInquiry = (x) => {
    return (
      !isDemoInquiry(x) && (
        x.type === "Brochure Download" ||
        x.type === "Brochure Request" ||
        x.subject?.toLowerCase().includes("brochure") ||
        x.message?.toLowerCase().includes("brochure")
      )
    );
  };

  const newCount = inquiries.filter(i => i.status === "New").length;
  const demoCount = inquiries.filter(isDemoInquiry).length;
  const brochureCount = inquiries.filter(isBrochureInquiry).length;
  const generalCount = inquiries.filter(i => !isDemoInquiry(i) && !isBrochureInquiry(i)).length;

  const filteredInquiries = inquiries.filter(x => {
    const isDemo = isDemoInquiry(x);
    const isBrochure = isBrochureInquiry(x);

    if (activeTab === "demo" && !isDemo) return false;
    if (activeTab === "brochure" && !isBrochure) return false;
    if (activeTab === "general" && (isDemo || isBrochure)) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        x.name?.toLowerCase().includes(q) ||
        x.email?.toLowerCase().includes(q) ||
        x.phone?.toLowerCase().includes(q) ||
        x.city?.toLowerCase().includes(q) ||
        x.courseName?.toLowerCase().includes(q) ||
        x.subject?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const MessageText = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    if (!text) return null;
    const isLong = text.length > 100;
    
    return (
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
        {expanded || !isLong ? text : `${text.slice(0, 100)}... `}
        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            style={{ 
              background: "none", border: "none", color: "var(--gold)", 
              cursor: "pointer", fontWeight: "600", padding: "0 5px" 
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">LEADS & ENQUIRIES</span>
          <h1>Inquiries, Demo & Brochure Requests</h1>
          <p>Review student enquiries, free demo bookings, and brochure download requests.</p>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="inquiry-type-tabs">
        <button
          className={activeTab === "all" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("all")}
        >
          All Inquiries ({inquiries.length})
        </button>
        <button
          className={activeTab === "demo" ? "tab-btn active demo-tab" : "tab-btn demo-tab"}
          onClick={() => setActiveTab("demo")}
        >
          🎯 Free Demo Inquiries ({demoCount})
        </button>
        <button
          className={activeTab === "brochure" ? "tab-btn active brochure-tab" : "tab-btn brochure-tab"}
          onClick={() => setActiveTab("brochure")}
        >
          📄 Brochure Downloads ({brochureCount})
        </button>
        <button
          className={activeTab === "general" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("general")}
        >
          ✉️ General Contact Inquiries ({generalCount})
        </button>
      </div>

      <div className="inquiry-stats">
        <div><FiMail/><b>{newCount}</b><span>New Unread</span></div>
        <div><FiCheckCircle/><b>{demoCount}</b><span>Demo Requests</span></div>
        <div><FiClock/><b>{brochureCount}</b><span>Brochure Requests</span></div>
        <div><FiCheckCircle/><b>{inquiries.filter(i => i.status === "Closed").length}</b><span>Closed / Handled</span></div>
      </div>

      <div className="inquiry-search-bar" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by student name, phone, email, city or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" }}
        />
      </div>

      <div className="inquiries-list">
        {loading ? (
          <p>Loading inquiries...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredInquiries.length === 0 ? (
          <p style={{ padding: "40px 0", color: "#64748b", textAlign: "center" }}>No inquiries found under this filter.</p>
        ) : (
          filteredInquiries.map((x) => {
            const isDemo = isDemoInquiry(x);
            const isBrochure = isBrochureInquiry(x);
            return (
              <div 
                className={`inquiry-card ${isDemo ? "demo-lead-card" : isBrochure ? "brochure-lead-card" : ""}`} 
                key={x._id}
              >
                <div className={`lead-avatar ${isDemo ? "avatar-demo" : isBrochure ? "avatar-brochure" : ""}`}>
                  {isDemo ? "🎯" : isBrochure ? "📄" : (x.name ? x.name[0].toUpperCase() : "?")}
                </div>
                <div className="lead-main">
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "4px" }}>
                    <b>{x.name}</b>
                    {isDemo && (
                      <span className="badge-demo-tag">
                        🎯 Free Demo Booking
                      </span>
                    )}
                    {isBrochure && (
                      <span className="badge-brochure-tag">
                        📄 Brochure Download
                      </span>
                    )}
                    {x.courseName && (
                      <span className="badge-course-name">
                        Course: {x.courseName}
                      </span>
                    )}
                    {x.programMode && (
                      <span className="badge-mode-name">
                        {x.programMode}
                      </span>
                    )}
                  </div>

                  <span style={{ color: "#1e293b", fontWeight: "600", fontSize: "14px" }}>
                    {x.subject || (isDemo ? "Free Demo Class Request" : isBrochure ? "Course Brochure Request" : "General Inquiry")}
                  </span>

                  <div style={{ marginTop: "6px" }}>
                    <small><FiPhone/> {x.phone || "N/A"}</small>
                    <small><FiMail/> {x.email}</small>
                    {x.city && <small><FiMapPin/> {x.city}</small>}
                  </div>

                  <MessageText text={x.message} />
                </div>
                <div className="lead-time">
                  <select 
                    className={x.status?.toLowerCase()} 
                    value={x.status || "New"} 
                    onChange={(e) => updateStatus(x._id, e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "800",
                      marginBottom: "8px",
                      padding: "4px 8px",
                      borderRadius: "20px"
                    }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <small>{new Date(x.createdAt).toLocaleString()}</small>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
