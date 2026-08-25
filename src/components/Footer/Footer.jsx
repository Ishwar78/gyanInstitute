import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer-cta">
        <div className="footer-cta-inner">
          <div className="footer-cap">◆</div>
          <div>
            <span>ADMISSIONS OPEN 2026</span>
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of students who trust Gyan Institute for their bright future.</p>
          </div>
          <Link to="/contact" className="footer-cta-btn">Enquire Now <FiArrowRight /></Link>
        </div>
      </section>

      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="footer-logo" to="/">
  <img
    src="/logo.png"
    alt="Gyan Institute"
    className="footer-logo-img"
  />
</Link>
            <p>Empowering students with quality education, expert guidance and holistic development.</p>
            <div className="footer-socials">
              <a href="#facebook"><FaFacebookF /></a>
              <a href="#instagram"><FaInstagram /></a>
              <a href="#youtube"><FaYoutube /></a>
              <a href="#linkedin"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-col">
            <h3>Courses</h3>
            <Link to="/courses">Computer Courses</Link>
            <Link to="/courses">Competitive Exams</Link>
            <Link to="/courses">Academic Courses</Link>
            <Link to="/courses">Professional Courses</Link>
            <Link to="/courses">Language Courses</Link>
          </div>

          <div className="footer-col footer-contact">
            <h3>Contact Us</h3>
            <p><FiMapPin /> 123 Knowledge City,<br />Hisar, Haryana - 125001</p>
            <p><FiPhone /> +91 98765 43210</p>
            <p><FiMail /> info@gyaninstitute.com</p>
            <p><FiClock /> Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>

          
        </div>

        <div className="footer-bottom">
          <span>© 2026 Gyan Institute. All Rights Reserved.</span>
          <div>
            <a href="/privacy-policy">Privacy Policy</a><i />
             <a href="/terms-conditions">Terms & Conditions</a>
             </div>
        </div>
      </div>
    </footer>
  );
}
