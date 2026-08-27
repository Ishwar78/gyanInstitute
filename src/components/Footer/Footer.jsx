import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 92530 10028",
    email: "info@gyantime.in.com",
    addressLine: "123 Knowledge City",
    cityState: "Rohtak, Haryana",
    postalCode: "124001",
    officeHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  });

  // Mobile accordion states
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5005/api/contact-info")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setContactInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to load contact info:", err)
      );
  }, []);

  return (
    <footer className="footer">

      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section className="footer-cta">
        <div className="footer-cta-inner">

          <div className="footer-cap">
            ◆
          </div>

          <div className="footer-cta-content">
            <span>ADMISSIONS OPEN 2026</span>

            <h2>
              Ready to Start Your Journey?
            </h2>

            <p>
              Join thousands of students who trust Gyan Time
              for their bright future.
            </p>
          </div>

          <Link
            to="/contact"
            className="footer-cta-btn"
          >
            Enquire Now
            <FiArrowRight />
          </Link>

        </div>
      </section>


      {/* =====================================================
          FOOTER MAIN
      ===================================================== */}

      <div className="footer-main">

        <div className="footer-grid">

          {/* =====================================================
              BRAND
          ===================================================== */}

          <div className="footer-brand">

            <Link
              className="footer-logo"
              to="/"
            >
              <img
                src="/logo2.png"
                alt="Gyan Time"
                className="footer-logo-img"
              />
            </Link>

            <p>
              Empowering students with quality education, expert
              guidance and holistic development.
            </p>

            <div className="footer-socials">

              <a
                href="https://www.facebook.com/Gyantimeofficial001"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/gyantimeofficial"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#youtube"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href="#linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>


          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div
            className={`footer-col footer-quick-links ${
              quickLinksOpen
                ? "quick-links-open"
                : ""
            }`}
          >

            <div className="footer-col-title">

              <h3>
                Quick Links
              </h3>

              {/* Mobile toggle */}
              <button
                type="button"
                className="footer-col-toggle"
                onClick={() =>
                  setQuickLinksOpen(!quickLinksOpen)
                }
                aria-label={
                  quickLinksOpen
                    ? "Hide quick links"
                    : "Show quick links"
                }
                aria-expanded={quickLinksOpen}
              >
                {quickLinksOpen ? (
                  <FiMinus />
                ) : (
                  <FiPlus />
                )}
              </button>

            </div>

            <div className="footer-links quick-links">

              <Link to="/">
                Home
              </Link>

              <Link to="/about">
                About Us
              </Link>

              <Link to="/courses">
                Courses
              </Link>

              <Link to="/gallery">
                Gallery
              </Link>

              <Link to="/contact">
                Contact Us
              </Link>

            </div>

          </div>


          {/* =====================================================
              COURSES
          ===================================================== */}

          <div
            className={`footer-col footer-courses ${
              coursesOpen
                ? "courses-open"
                : ""
            }`}
          >

            <div className="footer-col-title">

              <h3>
                Courses
              </h3>

              {/* Mobile toggle */}
              <button
                type="button"
                className="footer-col-toggle"
                onClick={() =>
                  setCoursesOpen(!coursesOpen)
                }
                aria-label={
                  coursesOpen
                    ? "Hide courses"
                    : "Show courses"
                }
                aria-expanded={coursesOpen}
              >
                {coursesOpen ? (
                  <FiMinus />
                ) : (
                  <FiPlus />
                )}
              </button>

            </div>

            <div className="footer-links course-links">

              <Link to="/courses">
                Computer Courses
              </Link>

              <Link to="/courses">
                Competitive Exams
              </Link>

              <Link to="/courses">
                Academic Courses
              </Link>

              <Link to="/courses">
                Professional Courses
              </Link>

              <Link to="/courses">
                Language Courses
              </Link>

            </div>

          </div>


          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div className="footer-col footer-contact">

            <div className="footer-col-title">

              <h3>
                Contact Us
              </h3>

            </div>

            <p>
              <FiMapPin />

              <span>
                {contactInfo.addressLine},
                <br />
                {contactInfo.cityState} -{" "}
                {contactInfo.postalCode}
              </span>
            </p>

            <p>
              <FiPhone />

              <span>
                {contactInfo.phone}
              </span>
            </p>

            <p>
              <FiMail />

              <span>
                {contactInfo.email}
              </span>
            </p>

            <p>
              <FiClock />

              <span>
                {contactInfo.officeHours}
              </span>
            </p>

          </div>

        </div>


        {/* =====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="footer-bottom">

          <span>
            © 2026 Gyan Time. All Rights Reserved.
          </span>

          <div>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <i />

            <Link to="/terms-conditions">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}