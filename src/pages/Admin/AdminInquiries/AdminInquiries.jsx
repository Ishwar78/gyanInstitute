import { useEffect, useState } from "react";
import { FiCheckCircle, FiClock, FiEye, FiMail, FiPhone } from "react-icons/fi";
import "./AdminInquiries.css";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const newCount = inquiries.filter(i => i.status === "New").length;
  const pendingCount = inquiries.filter(i => i.status === "Contacted").length;
  const resolvedCount = inquiries.filter(i => i.status === "Closed").length;

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
          <h1>Inquiries</h1>
          <p>Review student enquiries and follow up with prospective learners.</p>
        </div>
      </div>
      
      <div className="inquiry-stats">
        <div><FiMail/><b>{newCount}</b><span>New</span></div>
        <div><FiClock/><b>{pendingCount}</b><span>Contacted</span></div>
        <div><FiCheckCircle/><b>{resolvedCount}</b><span>Closed</span></div>
      </div>

      <div className="inquiries-list">
        {loading ? (
          <p>Loading inquiries...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : inquiries.length === 0 ? (
          <p>No inquiries found.</p>
        ) : (
          inquiries.map((x) => (
            <div className="inquiry-card" key={x._id}>
              <div className="lead-avatar">{x.name ? x.name[0].toUpperCase() : "?"}</div>
              <div className="lead-main">
                <b>{x.name}</b>
                <span>{x.subject || "No Subject"}</span>
                <div>
                  <small><FiPhone/> {x.phone || "N/A"}</small>
                  <small><FiMail/> {x.email}</small>
                </div>
                <MessageText text={x.message} />
              </div>
              <div className="lead-time">
                <select 
                  className={x.status.toLowerCase()} 
                  value={x.status} 
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
          ))
        )}
      </div>
    </div>
  );
}
