import { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiTarget,
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
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
      .catch((err) =>
        console.error("Failed to load contact info:", err)
      );
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "http://localhost:5005/api/inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
    <main className="contact-page">

      {/* ================= HERO ================= */}
      <section className="contact-hero">
        <div className="contact-hero-pattern"></div>

        <div className="contact-hero-inner">
          <div className="contact-hero-content">

            <div className="contact-eyebrow">
              <span></span>
              CONTACT US
            </div>

            <h1>
              Let's Start a{" "}
              <em>Conversation.</em>
            </h1>

            <p>
              Have a question about courses, admissions or career
              guidance? Our team is here to help you take the next
              confident step.
            </p>

            <div className="contact-hero-points">
              <div>
                <FiCheckCircle />
                <span>Expert Course Guidance</span>
              </div>

              <div>
                <FiCheckCircle />
                <span>Quick Admission Support</span>
              </div>

              <div>
                <FiCheckCircle />
                <span>Personalized Counselling</span>
              </div>
            </div>

          </div>

          <div className="contact-hero-visual">

            <div className="contact-image-frame">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=90"
                alt="Gyan Time campus"
              />
            </div>

            <div className="contact-hero-badge">
              <div className="badge-icon">
                <FiMessageCircle />
              </div>

              <div>
                <strong>We're Here</strong>
                <span>to help you grow</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CONTACT INFO ================= */}
      <section className="contact-info-wrap section-shell">

        <div className="contact-cards">

          <a
            href={`tel:${contactInfo.phone}`}
            className="contact-info-card"
          >
            <div className="contact-card-icon">
              <FiPhone />
            </div>

            <div>
              <span>CALL US</span>
              <strong>{contactInfo.phone}</strong>
              <small>Speak with our team</small>
            </div>

            <FiArrowRight className="contact-card-arrow" />
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className="contact-info-card"
          >
            <div className="contact-card-icon">
              <FiMail />
            </div>

            <div>
              <span>EMAIL US</span>
              <strong>{contactInfo.email}</strong>
              <small>We reply within 24 hours</small>
            </div>

            <FiArrowRight className="contact-card-arrow" />
          </a>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <FiMapPin />
            </div>

            <div>
              <span>VISIT US</span>
              <strong>{contactInfo.addressLine}</strong>
              <small>
                {contactInfo.cityState} - {contactInfo.postalCode}
              </small>
            </div>

            <FiArrowRight className="contact-card-arrow" />
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <FiClock />
            </div>

            <div>
              <span>OFFICE HOURS</span>
              <strong>
                {contactInfo.officeHours.split(":")[0]}
              </strong>
              <small>
                {contactInfo.officeHours
                  .split(":")
                  .slice(1)
                  .join(":") || contactInfo.officeHours}
              </small>
            </div>

            <FiArrowRight className="contact-card-arrow" />
          </div>

        </div>
      </section>


      {/* ================= MAIN CONTACT ================= */}
      <section className="contact-main section-shell">

        {/* FORM */}
        <div className="contact-form-box">

          <div className="form-heading">

            <div>
              <div className="section-eyebrow">
                SEND US A MESSAGE
              </div>

              <h2>
                How Can We{" "}
                <em>Help You?</em>
              </h2>
            </div>

            <div className="form-heading-icon">
              <FiSend />
            </div>

          </div>

          <p className="form-description">
            Tell us what you're looking for and our team will
            get back to you with the right information and guidance.
          </p>

          <form onSubmit={submit}>

            <div className="contact-form-grid">

              <div className="input-group">
                <label>Your Name</label>
                <input
                  name="name"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  name="city"
                  placeholder="Enter your city (e.g. Rohtak)"
                />
              </div>

              <div className="input-group">
                <label>Subject</label>
                <input
                  name="subject"
                  placeholder="What can we help with?"
                />
              </div>

            </div>

            <div className="input-group message-group">
              <label>Your Message</label>

              <textarea
                name="message"
                required
                placeholder="Write your message here..."
                rows="6"
              />
            </div>

            <button
              className="contact-submit-btn"
              type="submit"
              disabled={loading}
            >
              <span>
                {loading ? "Sending..." : "Send Message"}
              </span>

              <FiArrowRight />
            </button>

            {sent && (
              <div className="success-msg">
                <FiCheckCircle />
                <span>
                  Thank you! Your enquiry has been received.
                  Our team will contact you shortly.
                </span>
              </div>
            )}

          </form>
        </div>


        {/* PREMIUM CONNECT PANEL */}
        <div className="contact-connect-box">

          <div className="connect-top">

            <div className="section-eyebrow">
              GET IN TOUCH
            </div>

            <h2>
              Let's Build Your{" "}
              <em>Future Together.</em>
            </h2>

            <p>
              Whether you need help choosing a course, understanding
              admissions or planning your career, we're ready to
              guide you.
            </p>

          </div>

          <div className="connect-highlight">

            <div className="connect-highlight-icon">
              <FaGraduationCap />
            </div>

            <div>
              <strong>Start Learning With Gyan Time</strong>
              <span>
                Practical learning • Expert guidance • Career focus
              </span>
            </div>

          </div>

          <div className="connect-details">

            <a href={`tel:${contactInfo.phone}`}>
              <div className="connect-detail-icon">
                <FiPhone />
              </div>

              <div>
                <span>CALL OUR TEAM</span>
                <strong>{contactInfo.phone}</strong>
              </div>
            </a>

            <a href={`mailto:${contactInfo.email}`}>
              <div className="connect-detail-icon">
                <FiMail />
              </div>

              <div>
                <span>EMAIL US</span>
                <strong>{contactInfo.email}</strong>
              </div>
            </a>

            <div>
              <div className="connect-detail-icon">
                <FiMapPin />
              </div>

              <div>
                <span>OUR LOCATION</span>
                <strong>
                  {contactInfo.cityState}
                </strong>
              </div>
            </div>

          </div>

          <div className="connect-bottom">
            <FiStar />
            <span>
              Student-focused guidance from enquiry to learning.
            </span>
          </div>

        </div>

      </section>


      {/* ================= HELP ================= */}
      <section className="contact-help">

        <div className="section-shell">

          <div className="contact-title">

            <div className="section-eyebrow center">
              WHY REACH OUT TO US?
            </div>

            <h2>
              We're Here to{" "}
              <em>Guide You.</em>
            </h2>

            <p>
              Get the support you need to make the right
              decision for your education and career.
            </p>

          </div>

          <div className="contact-help-grid">

            <article>
              <div className="help-icon">
                <FiBookOpen />
              </div>

              <span className="help-number">01</span>

              <h3>Course Guidance</h3>

              <p>
                Get expert advice to choose the right course
                according to your interests and goals.
              </p>

              <div className="help-line"></div>
            </article>

            <article>
              <div className="help-icon">
                <FiUsers />
              </div>

              <span className="help-number">02</span>

              <h3>Admission Support</h3>

              <p>
                Assistance with admission process, batches,
                requirements and course details.
              </p>

              <div className="help-line"></div>
            </article>

            <article>
              <div className="help-icon">
                <FiTarget />
              </div>

              <span className="help-number">03</span>

              <h3>Career Counselling</h3>

              <p>
                Personalized guidance to help you understand
                your academic and career opportunities.
              </p>

              <div className="help-line"></div>
            </article>

            <article>
              <div className="help-icon">
                <FiMessageCircle />
              </div>

              <span className="help-number">04</span>

              <h3>General Enquiries</h3>

              <p>
                Have a question? Our team is always happy
                to help and provide the right information.
              </p>

              <div className="help-line"></div>
            </article>

          </div>

        </div>
      </section>




    </main>
  );
}