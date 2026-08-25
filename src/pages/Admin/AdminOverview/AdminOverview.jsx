import { FiArrowUpRight, FiBookOpen, FiEdit3, FiMail, FiMessageSquare, FiUsers } from "react-icons/fi";
import "./AdminOverview.css";

const stats = [
  ["2500+", "Happy Students", FiUsers, "+12% this month"],
  ["50+", "Courses", FiBookOpen, "+4 new"],
  ["128", "Inquiries", FiMail, "18 unread"],
  ["24", "Blog Articles", FiEdit3, "6 this month"]
];

export default function AdminOverview() {
  return (
    <div className="admin-page">
      <div className="admin-page-head"><div><span className="eyebrow">DASHBOARD</span><h1>Overview</h1><p>Welcome back. Here's what's happening with Gyan Institute.</p></div><button>+ Quick Action</button></div>
      <div className="stat-grid">{stats.map(([num,label,Icon,trend]) => <div className="stat-card" key={label}><div className="stat-icon"><Icon/></div><div><strong>{num}</strong><span>{label}</span><small>{trend}</small></div><FiArrowUpRight className="stat-arrow"/></div>)}</div>
      <div className="overview-grid">
        <section className="panel"><div className="panel-head"><h2>Recent Inquiries</h2><span>View all</span></div>
          {[["Riya Sharma","Computer Courses","Today, 10:20 AM"],["Aman Verma","Full Stack Web Development","Today, 09:45 AM"],["Neha Singh","Spoken English","Yesterday, 04:12 PM"],["Karan Mehta","Competitive Exams","Yesterday, 01:30 PM"]].map(x => <div className="inquiry-row" key={x[0]}><span className="inquiry-avatar">{x[0][0]}</span><div><b>{x[0]}</b><small>{x[1]}</small></div><em>{x[2]}</em></div>)}
        </section>
        <section className="panel"><div className="panel-head"><h2>Quick Links</h2></div>
          <div className="quick-grid">{[["Manage Courses","/admin/courses",FiBookOpen],["Contact Details","/admin/contact-info",FiMessageSquare],["Blog Manager","/admin/blog",FiEdit3],["Home Hero","/admin/home-hero",FiUsers]].map(([a,b,I]) => <a href={b} key={a}><I/><span>{a}</span><FiArrowUpRight/></a>)}</div>
        </section>
      </div>
    </div>
  );
}
