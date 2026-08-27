import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiShield } from "react-icons/fi";
import { useState, useEffect } from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 98765 43210",
    email: "info@gyantime.in",
    addressLine: "123 Knowledge City",
    cityState: "Hisar, Haryana",
    postalCode: "125001",
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
    <main className="privacy-page">

      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-container">
          <div className="privacy-hero-content">
            <span className="privacy-label">
              <FiShield />
              PRIVACY POLICY
            </span>

            <h1>
              Your Privacy Is
              <span> Our Priority</span>
            </h1>

            <p>
              At Gyan Time, we respect your privacy and are committed to
              protecting the personal information you share with us.
            </p>

            <div className="privacy-breadcrumb">
              <Link to="/">Home</Link>
              <FiArrowRight />
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content-section">
        <div className="privacy-container">
          <div className="privacy-layout">

            <aside className="privacy-sidebar">
              <div className="privacy-sidebar-card">
                <h3>Privacy Policy</h3>

                <a href="#information">Information We Collect</a>
                <a href="#usage">How We Use Information</a>
                <a href="#protection">Data Protection</a>
                <a href="#cookies">Cookies</a>
                <a href="#third-party">Third-Party Services</a>
                <a href="#rights">Your Rights</a>
                <a href="#contact">Contact Us</a>
              </div>
            </aside>

            <article className="privacy-article">

              <div className="privacy-intro">
                <span>LAST UPDATED: AUGUST 2026</span>

                <p>
                  This Privacy Policy explains how Gyan Time collects,
                  uses, stores and protects information when you visit our
                  website, contact us, register for courses, or use our
                  services.
                </p>
              </div>

              <section id="information">
                <h2>01. Information We Collect</h2>
                <p>
                  We may collect information that you voluntarily provide to
                  us when you contact Gyan Time, submit an enquiry,
                  register for a course, or communicate with our team.
                </p>

                <ul>
                  <li><FiCheckCircle /> Name and contact information</li>
                  <li><FiCheckCircle /> Email address and phone number</li>
                  <li><FiCheckCircle /> Course and admission enquiries</li>
                  <li><FiCheckCircle /> Information provided through forms</li>
                  <li><FiCheckCircle /> Website usage information</li>
                </ul>
              </section>

              <section id="usage">
                <h2>02. How We Use Your Information</h2>
                <p>
                  Information collected through our website may be used to
                  respond to enquiries, provide course information, process
                  admissions and improve our services.
                </p>

                <p>
                  We may also use your information to communicate important
                  updates related to courses, admissions, schedules and
                  Time activities.
                </p>
              </section>

              <section id="protection">
                <h2>03. Data Protection</h2>
                <p>
                  Gyan Time takes reasonable administrative and technical
                  measures to protect your personal information against
                  unauthorized access, misuse, alteration or disclosure.
                </p>
              </section>

              <section id="cookies">
                <h2>04. Cookies</h2>
                <p>
                  Our website may use cookies and similar technologies to
                  improve website functionality, understand visitor behaviour
                  and provide a better browsing experience.
                </p>
              </section>

              <section id="third-party">
                <h2>05. Third-Party Services</h2>
                <p>
                  Some website features may use third-party services such as
                  maps, analytics, communication platforms or social media.
                  Such services may have their own privacy policies and terms.
                </p>
              </section>

              <section id="rights">
                <h2>06. Your Rights</h2>
                <p>
                  You may contact Gyan Time if you want to know what
                  personal information we hold about you or if you believe
                  information provided by you needs to be corrected or updated.
                </p>
              </section>

              <section id="contact" className="privacy-contact-box">
                <h2>07. Contact Us</h2>

                <p>
                  If you have questions regarding this Privacy Policy or the
                  way we handle your information, please contact us.
                </p>

                <div className="privacy-contact-details">
                  <strong>Gyan Time</strong>
                  <span>{contactInfo.addressLine}, {contactInfo.cityState} - {contactInfo.postalCode}</span>
                  <span>{contactInfo.phone}</span>
                  <span>{contactInfo.email}</span>
                </div>
              </section>

            </article>
          </div>
        </div>
      </section>

    </main>
  );
}