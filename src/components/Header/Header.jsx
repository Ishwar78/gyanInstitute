import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown, FiClock, FiMail, FiMapPin, FiMenu, FiPhone, FiX
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaGraduationCap } from "react-icons/fa";
import DemoInquiryModal from "../DemoInquiryModal/DemoInquiryModal";
import "./Header.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Courses", to: "/courses" },
  
   { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false);
    setCareerOpen(false);
  };
  
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 92530 10028",
    email: "info@gyantime.in",
    addressLine: "Rohtak City",
    cityState: "Rohtak, Haryana",
    postalCode: "124001",
    officeHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  });

  useEffect(() => {
    fetch("http://localhost:5005/api/contact-info")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setContactInfo(json.data);
        }
      })
      .catch((err) => console.error("Failed to load contact info:", err));
  }, []);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-inner">
          <span><FiMapPin /> {contactInfo.addressLine}, {contactInfo.cityState}</span>
          <div className="topbar-right">
            <span><FiMail /> {contactInfo.email}</span>
            <span><FiPhone /> {contactInfo.phone}</span>
            <span><FiClock /> {contactInfo.officeHours}</span>
            <div className="social-mini">
              <a href="https://www.facebook.com/Gyantimeofficial001" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/gyantimeofficial" aria-label="Instagram"><FaInstagram /></a>
              <a href="#youtube" aria-label="YouTube"><FaYoutube /></a>
              <a href="#linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="navbar-inner">
          <Link className="brand" to="/" onClick={closeMenu}>
            <img
              className="brand-logo"
              src="/logo1.png"
              alt="Gyan Time"
            />
          </Link>

          <nav className={`main-nav ${open ? "open" : ""}`}>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              About Us
            </NavLink>
            <NavLink to="/courses" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              Courses
            </NavLink>

            {/* Career Dropdown */}
            <div 
              className={`nav-dropdown-wrap ${careerOpen ? "open" : ""}`}
              onMouseEnter={() => {
                if (window.innerWidth > 820) setCareerOpen(true);
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 820) setCareerOpen(false);
              }}
            >
              <button 
                type="button"
                className="nav-dropdown-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setCareerOpen((prev) => !prev);
                }}
                aria-expanded={careerOpen}
              >
                <span>Career</span>
                <FiChevronDown className={`dropdown-icon ${careerOpen ? "rotate" : ""}`} />
              </button>
              <div className="nav-dropdown-menu">
                <Link to="/jobs" onClick={closeMenu} className="dropdown-item">
                  <span className="dropdown-item-title">Jobs</span>
                </Link>
                <Link to="/placement-cell" onClick={closeMenu} className="dropdown-item">
                  <span className="dropdown-item-title">Placement Cell</span>
                </Link>
              </div>
            </div>

            <NavLink to="/gallery" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              Gallery
            </NavLink>
            <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
              Contact Us
            </NavLink>

            {/* Mobile Drawer Demo Class CTA Button */}
            <div className="mobile-drawer-cta-wrap">
              <button 
                type="button" 
                className="mobile-drawer-demo-btn" 
                onClick={() => { 
                  closeMenu(); 
                  setDemoModalOpen(true); 
                }}
              >
                <FaGraduationCap /> Book Free Demo Class <span>→</span>
              </button>
            </div>
          </nav>

          <Link className="admission-btn desktop-admission" to="/contact">
            Admissions Open <span>→</span>
          </Link>

          <div className="mobile-header-actions">
            <button 
              type="button" 
              className="mobile-demo-btn" 
              onClick={() => setDemoModalOpen(true)}
              aria-label="Book Free Demo"
            >
              <FaGraduationCap /> Free Demo
            </button>

            <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <DemoInquiryModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </header>
  );
}
