import { Link } from "react-router-dom";
import {
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiFileText,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiStar
} from "react-icons/fi";
import { FaGraduationCap, FaHandshake, FaChalkboardTeacher } from "react-icons/fa";
import "./PlacementCell.css";

const companyLogos = [
  { name: "HCLTech", src: "/images/hcl.png" },
  { name: "Zomato", src: "/images/zom.png" },
  { name: "Under Armour", src: "/images/under.svg" },
  { name: "MultiClout", src: "/images/multi.png" },
  { name: "ThinkCentre", src: "/images/thin.webp" },
  { name: "TCS", src: "/images/tc.png" },
  { name: "Bank of America", src: "/images/bankof.png" },
  { name: "Redbull", src: "/images/redbull.png" },
  { name: "Indigo", src: "/images/indigo.png" },
  { name: "Dell", src: "/images/dell.png" }
];

export default function PlacementCell() {
  const stats = [
    { number: "95%+", label: "Placement Rate", sub: "For Job-Oriented Batches" },
    { number: "500+", label: "Hiring Partners", sub: "IT, Finance & Corporate" },
    { number: "10,000+", label: "Alumni Network", sub: "Working Across India" },
    { number: "₹8.5 LPA", label: "Highest Package", sub: "Achieved by Students" },
  ];

  const steps = [
    {
      icon: <FaChalkboardTeacher />,
      title: "1. Skill Development",
      desc: "Hands-on practical training on live projects, industry tools, and current market requirements.",
    },
    {
      icon: <FiFileText />,
      title: "2. Resume & Portfolio Building",
      desc: "Dedicated CV workshops, LinkedIn profile optimization, and project portfolio creation.",
    },
    {
      icon: <FiUsers />,
      title: "3. Mock Interviews & Soft Skills",
      desc: "One-on-one mock technical interviews, HR round preparation, and English communication grooming.",
    },
    {
      icon: <FaHandshake />,
      title: "4. Direct Campus Drives & Placement",
      desc: "Regular placement drives, company interview schedules, and lifetime career support.",
    },
  ];

  const partners = [
    "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra",
    "Genpact", "Axis Bank", "HDFC Bank", "ICICI Bank", "Deloitte",
    "Paytm", "Zomato", "Swiggy", "Cognizant", "Teleperformance"
  ];

  return (
    <div className="placement-page">
      {/* Hero Section */}
      <section className="placement-hero">
        <div className="placement-hero-inner">
          <div className="placement-hero-content">
            <span className="eyebrow">DEDICATED CAREER CELL</span>
            <h1>
              Launch Your Career With <em>100% Placement Support</em>
            </h1>
            <p>
              At Gyan Time, our dedicated Corporate Relations & Placement Cell bridges the gap between ambitious learners and top-tier recruiters. 
              We ensure every student receives comprehensive interview preparation and direct hiring opportunities.
            </p>
            <div className="placement-hero-actions">
              <Link to="/contact" className="btn-placement-primary">
                Register for Placement <FiArrowRight />
              </Link>
              <Link to="/jobs" className="btn-placement-outline">
                View Open Jobs <FiBriefcase />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="placement-stats-bar">
        <div className="placement-stats-inner">
          {stats.map((s, idx) => (
            <div key={idx} className="placement-stat-item">
              <strong>{s.number}</strong>
              <b>{s.label}</b>
              <small>{s.sub}</small>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Placement Roadmap */}
      <section className="placement-roadmap section-shell">
        <div className="center-heading">
          <span className="eyebrow">OUR METHODOLOGY</span>
          <h2>Our 4-Step <em>Placement Process</em></h2>
          <p>From day one of your course to your final job offer, we guide you at every milestone.</p>
        </div>

        <div className="roadmap-grid">
          {steps.map((step, i) => (
            <div key={i} className="roadmap-card">
              <div className="roadmap-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Partners & Marquee Section */}
      <section className="placement-partners-marquee">
        <div className="center-heading section-shell">
          <span className="eyebrow">RECRUITMENT NETWORK</span>
          <h2>OUR STUDENTS ARE PLACED IN <em>TOP COMPANIES</em></h2>
          
        </div>

        <div className="placement-marquee-wrapper">
          <div className="placement-marquee-track">
            {companyLogos.concat(companyLogos).map((logo, idx) => (
              <div className="placement-marquee-item" key={idx}>
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Cell Services */}
      <section className="placement-services section-shell">
        <div className="services-inner">
          <div className="services-left">
            <span className="eyebrow">STUDENT ADVANTAGE</span>
            <h2>What Our <em>Placement Cell</em> Offers</h2>
            <ul className="services-list">
              <li><FiCheckCircle /> <span>Guaranteed interview opportunities with hiring partners</span></li>
              <li><FiCheckCircle /> <span>Weekly resume review and technical feedback sessions</span></li>
              <li><FiCheckCircle /> <span>Aptitude and reasoning test preparation for competitive roles</span></li>
              <li><FiCheckCircle /> <span>Guest lectures and mentoring by industry leaders</span></li>
              <li><FiCheckCircle /> <span>Lifetime alumni job portal access and career updates</span></li>
            </ul>
          </div>

          <div className="services-card-cta">
            <div className="cta-icon"><FiAward /></div>
            <h3>Looking for Corporate Hiring?</h3>
            <p>Are you a company or HR looking to hire skilled talent from Gyan Time? Connect with our placement officers today.</p>
            <div className="cta-contact-links">
              <a href="tel:+919253010028"><FiPhone /> +91 92530 10028</a>
              <a href="mailto:info@gyantime.in"><FiMail /> info@gyantime.in</a>
            </div>
            <Link to="/contact" className="cta-action-btn">
              Partner With Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
