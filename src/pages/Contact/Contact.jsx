import { useState } from "react";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend, FiTarget, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div><span>CONTACT US</span><h1>Let's Start a <em>Conversation</em></h1><p>Have a question about courses, admissions or career guidance? Our team is here to help.</p></div>
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=85" alt="Gyan Institute building" />
        </div>
      </section>

      <section className="contact-cards section-shell">
        <div><FiPhone /><span>CALL US</span><b>+91 98765 43210</b><small>Mon - Sat: 8AM - 6PM</small></div>
        <div><FiMail /><span>EMAIL US</span><b>info@gyaninstitute.com</b><small>We reply within 24 hrs</small></div>
        <div><FiMapPin /><span>VISIT US</span><b>123 Knowledge City</b><small>Hisar, Haryana - 125001</small></div>
        <div><FiClock /><span>OFFICE HOURS</span><b>Mon - Sat</b><small>8:00 AM - 6:00 PM</small></div>
      </section>

      <section className="contact-main section-shell">
        <div className="contact-form-box">
          <span>SEND US A MESSAGE</span>
          <h2>How Can We <em>Help You?</em></h2>
          <p>Fill in your details and our team will get back to you shortly with the right information.</p>
          <form onSubmit={submit}>
            <div className="contact-form-grid">
              <input required placeholder="Your Name" />
              <input required type="email" placeholder="Your Email" />
              <input placeholder="Your Phone" />
              <input placeholder="Subject" />
            </div>
            <textarea required placeholder="Your Message" rows="6" />
            <button className="primary-btn" type="submit">Send Message <FiSend /></button>
            {sent && <div className="success-msg">Thank you! Your enquiry has been received.</div>}
          </form>
        </div>

        <div className="contact-map">
          <div className="map-grid" />
          <div className="map-pin"><FiMapPin /><span>Gyan Institute</span><small>Knowledge City, Hisar</small></div>
          <div className="map-caption"><b>Our Campus</b><span>123 Knowledge City, Hisar, Haryana</span><a href="#directions">Get Directions <FiArrowRight /></a></div>
        </div>
      </section>

      <section className="contact-help">
        <div className="section-shell">
          <div className="contact-title"><span>WHY REACH OUT TO US?</span><h2>We're Here to <em>Guide You</em></h2></div>
          <div className="contact-help-grid">
            <article><FiBookIcon /><h3>Course Guidance</h3><p>Get expert advice to choose the right course for your goals.</p></article>
            <article><FiUsers /><h3>Admission Support</h3><p>Assistance with admission process, batches and requirements.</p></article>
            <article><FiTarget /><h3>Career Counselling</h3><p>Personalized counselling for your academic and career goals.</p></article>
            <article><FiMessageCircle /><h3>General Enquiries</h3><p>We are happy to answer your questions and concerns.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="section-shell"><div><FaGraduationCap /><div><span>ADMISSIONS OPEN 2026</span><h2>Take the First Step Towards Your Bright Future</h2></div></div><a href="tel:+919876543210" className="primary-btn">Call Us Now <FiPhone /></a></div>
      </section>
    </>
  );
}

function FiBookIcon() {
  return <span className="contact-custom-icon"><FiArrowRight /></span>;
}
