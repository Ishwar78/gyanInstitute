import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown, FiClock, FiMail, FiMapPin, FiMenu, FiPhone, FiX
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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
  const closeMenu = () => setOpen(false);
  
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
