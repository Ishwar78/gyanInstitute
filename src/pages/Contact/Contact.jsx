import { useState, useEffect } from "react";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend, FiTarget, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 98765 43210",
    email: "info@gyantime.in",
    addressLine: "123 Knowledge City",
    cityState: "Hisar, Haryana",
    postalCode: "125001",
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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSent(true);
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div><span>CONTACT US</span><h1>Let's Start a <em>Conversation</em></h1><p>Have a question about courses, admissions or career guidance? Our team is here to help.</p></div>
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=85" alt="Gyan Time building" />
        </div>
      </section>

      <section className="contact-cards section-shell">
        <div><FiPhone /><span>CALL US</span><b>{contactInfo.phone}</b><small>Main Contact Number</small></div>
        <div><FiMail /><span>EMAIL US</span><b>{contactInfo.email}</b><small>We reply within 24 hrs</small></div>
        <div><FiMapPin /><span>VISIT US</span><b>{contactInfo.addressLine}</b><small>{contactInfo.cityState} - {contactInfo.postalCode}</small></div>
        <div><FiClock /><span>OFFICE HOURS</span><b>{contactInfo.officeHours.split(':')[0]}</b><small>{contactInfo.officeHours.split(':').slice(1).join(':') || contactInfo.officeHours}</small></div>
      </section>

      <section className="contact-main section-shell">
        <div className="contact-form-box">
          <span>SEND US A MESSAGE</span>
          <h2>How Can We <em>Help You?</em></h2>
          <p>Fill in your details and our team will get back to you shortly with the right information.</p>
          <form onSubmit={submit}>
            <div className="contact-form-grid">
              <input name="name" required placeholder="Your Name" />
              <input name="email" required type="email" placeholder="Your Email" />
              <input name="phone" placeholder="Your Phone" />
              <input name="subject" placeholder="Subject" />
            </div>
            <textarea name="message" required placeholder="Your Message" rows="6" />
            <button className="primary-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"} <FiSend />
            </button>
            {sent && <div className="success-msg">Thank you! Your enquiry has been received.</div>}
          </form>
        </div>

        <div className="contact-map">
          <div className="map-grid" />
          <div className="map-pin"><FiMapPin /><span>Gyan Time</span><small>Knowledge City, Hisar</small></div>
          <div className="map-caption"><b>Our Campus</b><span>{contactInfo.addressLine}, {contactInfo.cityState}</span><a href="#directions">Get Directions <FiArrowRight /></a></div>
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

      {/* <section className="contact-cta">
        <div className="section-shell"><div><FaGraduationCap /><div><span>ADMISSIONS OPEN 2026</span><h2>Take the First Step Towards Your Bright Future</h2></div></div><a href="tel:+919876543210" className="primary-btn">Call Us Now <FiPhone /></a></div>
      </section> */}
    </>
  );
}

function FiBookIcon() {
  return <span className="contact-custom-icon"><FiArrowRight /></span>;
}
