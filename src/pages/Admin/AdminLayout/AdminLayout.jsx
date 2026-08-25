import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBarChart2, FiBookOpen, FiChevronRight, FiFileText, FiHome,
  FiImage, FiInfo, FiLogOut, FiMail, FiMenu, FiSettings, FiUser
} from "react-icons/fi";
import "./AdminLayout.css";

const menu = [
  ["Overview", "/admin/overview", FiBarChart2],
  ["Courses", "/admin/courses", FiBookOpen],
  ["Contact Info", "/admin/contact-info", FiInfo],
  ["Inquiries", "/admin/inquiries", FiMail],
  ["Blog", "/admin/blog", FiFileText],
  ["Home Hero", "/admin/home-hero", FiImage],
  ["About", "/admin/about", FiUser]
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => navigate("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">G</div>
          <div><strong>GYAN</strong><span>ADMIN PANEL</span></div>
        </div>
        <div className="admin-menu-label">MANAGEMENT</div>
        <nav>
          {menu.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} className={({isActive}) => isActive ? "active" : ""}>
              <Icon /><span>{label}</span><FiChevronRight className="menu-arrow" />
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <NavLink to="/"><FiHome /> View Website</NavLink>
          <button onClick={logout}><FiLogOut /> Logout</button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-mobile-menu"><FiMenu /></button>
          <div>
            <span>GYAN INSTITUTE</span>
            <strong>Administration Portal</strong>
          </div>
          <div className="admin-user"><span className="admin-avatar"><FiUser /></span><div><b>Admin</b><small>Super Admin</small></div></div>
        </header>
        <main className="admin-content"><Outlet /></main>
      </div>
    </div>
  );
}
