import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown, FiClock, FiMail, FiMapPin, FiMenu, FiPhone, FiX
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "./Header.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Courses", to: "/courses", dropdown: true },
  
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-inner">
          <span><FiMapPin /> 123 Knowledge City, Hisar, Haryana</span>
          <div className="topbar-right">
            <span><FiMail /> info@gyaninstitute.com</span>
            <span><FiPhone /> +91 98765 43210</span>
            <span><FiClock /> Mon - Sat: 8:00 AM - 6:00 PM</span>
            <div className="social-mini">
              <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
              <a href="#youtube" aria-label="YouTube"><FaYoutube /></a>
              <a href="#linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="navbar-inner">
          <Link className="brand" to="/" onClick={closeMenu}>
            <span className="brand-mark">G</span>
            <span>
              <strong>GYAN</strong>
              <small>INSTITUTE</small>
              <em>Learn | Grow | Succeed</em>
            </span>
          </Link>

          <nav className={`main-nav ${open ? "open" : ""}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {item.label}
                {item.dropdown && <FiChevronDown />}
              </NavLink>
            ))}
            
          </nav>

          <Link className="admission-btn desktop-admission" to="/contact">
            Admissions Open <span>→</span>
          </Link>

          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
