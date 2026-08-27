import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiEdit3, FiMail, FiMessageSquare, FiUsers, FiStar } from "react-icons/fi";
import "./AdminOverview.css";

export default function AdminOverview() {
  const [coursesCount, setCoursesCount] = useState(0);
  const [inquiries, setInquiries] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);

  useEffect(() => {
    // Fetch counts and recent data
    Promise.all([
      fetch("http://localhost:5005/api/course").then(res => res.json()),
      fetch("http://localhost:5005/api/inquiry").then(res => res.json()),
      fetch("http://localhost:5005/api/blog").then(res => res.json()),
      fetch("http://localhost:5005/api/testimonial").then(res => res.json())
    ]).then(([coursesRes, inquiriesRes, blogsRes, testimonialsRes]) => {
      if (coursesRes.success) setCoursesCount(coursesRes.data.length);
      if (inquiriesRes.success) setInquiries(inquiriesRes.data);
      if (blogsRes.success) setBlogsCount(blogsRes.data.length);
      if (testimonialsRes.success) setTestimonialsCount(testimonialsRes.data.length);
    }).catch(err => console.error("Error fetching overview data:", err));
  }, []);

  const stats = [
    [testimonialsCount, "Total Reviews", FiStar, "From active students"],
    [coursesCount, "Courses", FiBookOpen, "Active & Drafts"],
    [inquiries.length, "Inquiries", FiMail, "Total received"],
    [blogsCount, "Blog Articles", FiEdit3, "Published & Drafts"]
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">DASHBOARD</span>
          <h1>Overview</h1>
          <p>Welcome back. Here's what's happening with Gyan Time.</p>
        </div>
      </div>
      
      <div className="stat-grid">
        {stats.map(([num, label, Icon, trend]) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon"><Icon/></div>
            <div><strong>{num}</strong><span>{label}</span><small>{trend}</small></div>
            <FiArrowUpRight className="stat-arrow"/>
          </div>
        ))}
      </div>
      
      <div className="overview-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Recent Inquiries</h2>
            <Link to="/admin/inquiries">View all</Link>
          </div>
          
          {inquiries.length > 0 ? (
            inquiries.slice(0, 4).map(inq => (
              <div className="inquiry-row" key={inq._id}>
                <span className="inquiry-avatar">{inq.name ? inq.name[0].toUpperCase() : "?"}</span>
                <div><b>{inq.name}</b><small>{inq.phone}</small></div>
                <em style={{fontSize: "12px", color: "var(--muted)"}}>{new Date(inq.createdAt).toLocaleDateString()}</em>
              </div>
            ))
          ) : (
            <p style={{ padding: "20px", color: "var(--muted)", textAlign: "center" }}>No inquiries found.</p>
          )}
        </section>
        
        <section className="panel">
          <div className="panel-head">
            <h2>Quick Links</h2>
          </div>
          <div className="quick-grid">
            {[
              ["Manage Courses", "/admin/courses", FiBookOpen],
              ["Reviews", "/admin/testimonials", FiStar],
              ["Blog Manager", "/admin/blog", FiEdit3],
              ["Contact Details", "/admin/contact-info", FiMessageSquare]
            ].map(([a, b, I]) => (
              <Link to={b} key={a}><I/><span>{a}</span><FiArrowUpRight/></Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
