import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiFileText
} from "react-icons/fi";
import "./TermsConditions.css";

export default function TermsConditions() {
  return (
    <main className="terms-page">

      {/* Hero */}
      <section className="terms-hero">
        <div className="terms-container">
          <div className="terms-hero-content">

            <span className="terms-label">
              <FiFileText />
              TERMS & CONDITIONS
            </span>

            <h1>
              Terms That Keep
              <span> Things Clear</span>
            </h1>

            <p>
              Please read these terms carefully before using the Gyan Institute
              website, services or enrolling in our courses.
            </p>

            <div className="terms-breadcrumb">
              <Link to="/">Home</Link>
              <FiArrowRight />
              <span>Terms & Conditions</span>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <section className="terms-content-section">
        <div className="terms-container">

          <div className="terms-layout">

            <aside className="terms-sidebar">
              <div className="terms-sidebar-card">
                <h3>Terms & Conditions</h3>

                <a href="#acceptance">Acceptance of Terms</a>
                <a href="#website">Website Usage</a>
                <a href="#courses">Courses & Admissions</a>
                <a href="#payments">Fees & Payments</a>
                <a href="#content">Website Content</a>
                <a href="#intellectual">Intellectual Property</a>
                <a href="#liability">Limitation of Liability</a>
                <a href="#contact">Contact Us</a>
              </div>
            </aside>

            <article className="terms-article">

              <div className="terms-intro">
                <span>LAST UPDATED: AUGUST 2026</span>

                <p>
                  By accessing or using the Gyan Institute website, you agree
                  to comply with the following Terms & Conditions. If you do
                  not agree with these terms, please do not use the website.
                </p>
              </div>

              <section id="acceptance">
                <h2>01. Acceptance of Terms</h2>
                <p>
                  These Terms & Conditions govern your use of the Gyan
                  Institute website and its related services. By accessing the
                  website, you acknowledge that you have read and understood
                  these terms.
                </p>
              </section>

              <section id="website">
                <h2>02. Website Usage</h2>
                <p>
                  You agree to use this website only for lawful purposes and
                  in a manner that does not interfere with the operation,
                  security or availability of the website.
                </p>

                <ul>
                  <li>
                    <FiCheckCircle />
                    Do not misuse or attempt to damage the website.
                  </li>
                  <li>
                    <FiCheckCircle />
                    Do not submit false or misleading information.
                  </li>
                  <li>
                    <FiCheckCircle />
                    Do not attempt unauthorized access to website systems.
                  </li>
                </ul>
              </section>

              <section id="courses">
                <h2>03. Courses & Admissions</h2>
                <p>
                  Course information, duration, eligibility, schedules and
                  availability may vary from time to time. Gyan Institute
                  reserves the right to modify course details when required.
                </p>

                <p>
                  Admission to any course may be subject to eligibility
                  requirements, availability and institute policies.
                </p>
              </section>

              <section id="payments">
                <h2>04. Fees & Payments</h2>
                <p>
                  Course fees and payment schedules will be communicated to
                  students during the admission process. Students are
                  responsible for providing accurate information during
                  registration and payment.
                </p>
              </section>

              <section id="content">
                <h2>05. Website Content</h2>
                <p>
                  We make reasonable efforts to keep information on our
                  website accurate and updated. However, course details,
                  images, schedules and other information may change without
                  prior notice.
                </p>
              </section>

              <section id="intellectual">
                <h2>06. Intellectual Property</h2>
                <p>
                  Website content including text, graphics, logos, images,
                  branding and design elements belongs to Gyan Institute or
                  its respective content providers and should not be copied,
                  reproduced or redistributed without permission.
                </p>
              </section>

              <section id="liability">
                <h2>07. Limitation of Liability</h2>
                <p>
                  Gyan Institute will make reasonable efforts to maintain the
                  website and provide accurate information. However, we cannot
                  guarantee that the website will always be available,
                  uninterrupted or completely free from errors.
                </p>
              </section>

              <section id="contact" className="terms-contact-box">
                <h2>08. Contact Us</h2>

                <p>
                  If you have any questions about these Terms & Conditions,
                  please contact our team.
                </p>

                <div className="terms-contact-details">
                  <strong>Gyan Institute</strong>
                  <span>123 Knowledge City, Hisar, Haryana - 125001</span>
                  <span>+91 98765 43210</span>
                  <span>info@gyaninstitute.com</span>
                </div>
              </section>

            </article>
          </div>
        </div>
      </section>

    </main>
  );
}