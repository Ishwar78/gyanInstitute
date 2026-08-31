
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiHeart,
  FiTarget,
  FiUsers,
  FiStar
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./About.css";

const values = [
  [
    "Student First",
    "Every learning decision starts with the student's growth, confidence and future.",
    FiUsers
  ],
  [
    "Quality Education",
    "Strong concepts, practical exposure and experienced mentors for meaningful learning.",
    FiBookOpen
  ],
  [
    "Career Focus",
    "We help students transform knowledge and skills into real career opportunities.",
    FiTarget
  ],
  [
    "Integrity",
    "Transparent guidance, supportive culture and responsible mentoring at every step.",
    FiHeart
  ]
];

const facilities = [
  "Smart Classrooms",
  "Computer & Practical Labs",
  "Study & Doubt Support",
  "Seminar & Workshop Spaces",
  "Learning Resources",
  "Comfortable Student Environment"
];

export default function About() {
  const [aboutData, setAboutData] = useState({
    eyebrow: "ABOUT US",
    heading: "Welcome to Gyan Time",
    introduction:
      "Gyan Time was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals.",
    missionStatement:
      "We believe in empowering young minds with the right knowledge, skills and values to excel in life.",
    highlights: [
      "Experienced & Dedicated Faculty",
      "Modern Infrastructure & Smart Classrooms",
      "Student-Centric Learning Approach",
      "Regular Assessments & Mentoring"
    ]
  });

  useEffect(() => {
    fetch("http://localhost:5005/api/about")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAboutData(json.data);
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <main className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-glow"></div>

        <div className="about-hero-inner">

          <div className="about-hero-content">
            <div className="about-eyebrow">
              <span></span>
              {aboutData.eyebrow}
            </div>

            <h1>
              {aboutData.heading}
              <em>.</em>
            </h1>

            <p>
              Where learning meets opportunity, confidence and a clear
              path towards success.
            </p>

            <div className="about-hero-meta">
              <div>
                <FiStar />
                <span>Student Focused</span>
              </div>

              <div>
                <FiAward />
                <span>Quality Learning</span>
              </div>
            </div>
          </div>

          <div className="about-hero-image-wrap">
            <div className="hero-image-frame">
              <img
                src={aboutData.heroImage || aboutData.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=90"}
                alt="Gyan Time campus"
              />
            </div>

            <div className="hero-badge">
              <strong>{aboutData.experienceBadgeNumber || "15+"}</strong>
              <span>{aboutData.experienceBadgeText || "Years of Excellence"}</span>
            </div>
          </div>

        </div>
      </section>


      {/* ================= INTRO ================= */}
      <section className="about-intro section-shell">

        <div className="about-intro-visual">
          <div className="intro-image-main">
            <img
              src={aboutData.introImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=90"}
              alt="Students learning together"
            />
          </div>

          <div className="intro-image-accent"></div>

          <div className="about-float-card">
            <div className="float-icon">
              <FaGraduationCap />
            </div>

            <div>
              <strong>2500+</strong>
              <span>Students & Counting</span>
            </div>
          </div>
        </div>

        <div className="about-intro-copy">
          <div className="section-eyebrow">WHO WE ARE</div>

          <h2>
            Building Strong Foundations for{" "}
            <em>Bright Futures</em>
          </h2>

          <p>{aboutData.introduction}</p>

          <p>{aboutData.missionStatement}</p>

          <ul>
            {aboutData.highlights &&
              aboutData.highlights.map((highlight, index) => (
                <li key={index}>
                  <FiCheckCircle />
                  <span>{highlight}</span>
                </li>
              ))}
          </ul>
        </div>

      </section>


      {/* ================= VALUES ================= */}
      <section className="about-values">

        <div className="section-shell">

          <div className="about-section-title">
            <div className="section-eyebrow center">OUR CORE VALUES</div>

            <h2>
              What Makes <em>Gyan Different?</em>
            </h2>

            {/* <p>
              A learning environment built around quality, consistency,
              personal attention and student success.
            </p> */}
          </div>

          <div className="values-grid">

            {values.map(([title, text, Icon], index) => (
              <article key={title} className="value-card">

                <div className="value-number">
                  0{index + 1}
                </div>

                <div className="value-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>

                <p>{text}</p>

                <div className="value-line"></div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ================= FACILITIES ================= */}
      <section className="about-facilities section-shell">

        <div className="facility-images">

          <div className="facility-main-wrap">
            <img
              className="facility-main"
              src={aboutData.facilityMainImage || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=90"}
              alt="Computer lab"
            />
          </div>

          <div className="facility-small-wrap">
            <img
              className="facility-small"
              src={aboutData.facilitySmallImage || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=90"}
              alt="Modern classroom"
            />
          </div>

          <div className="facility-experience">
            <FiAward />
            <div>
              <strong>{aboutData.experienceBadgeNumber || "15+"}</strong>
              <span>{aboutData.experienceBadgeText || "Years Experience"}</span>
            </div>
          </div>

        </div>

        <div className="facility-copy">

          <div className="section-eyebrow">OUR FACILITIES</div>

          <h2>
            Modern Spaces for{" "}
            <em>Better Learning</em>
          </h2>

          <p>
            Our classrooms and learning spaces are designed to support
            focused study, collaboration, practical learning and a
            comfortable student experience.
          </p>

          <div className="facility-list">

            {facilities.map((item) => (
              <div key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </div>
            ))}

          </div>

          <Link to="/courses" className="facility-btn">
            Explore Learning Programs
            <FiArrowRight />
          </Link>

        </div>

      </section>


      {/* ================= STATS ================= */}
      <section className="about-stats">

        <div className="stats-glow"></div>

        <div className="section-shell about-stat-grid">

          <div className="stat-item">
            <FaGraduationCap />
            <strong>2500+</strong>
            <span>Happy Students</span>
          </div>

          <div className="stat-item">
            <FiUsers />
            <strong>100+</strong>
            <span>Expert Faculty</span>
          </div>

          <div className="stat-item">
            <FiBookOpen />
            <strong>50+</strong>
            <span>Courses</span>
          </div>

          <div className="stat-item">
            <FiAward />
            <strong>98%</strong>
            <span>Success Rate</span>
          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta">

        <div className="section-shell">

          <div className="cta-content">

            <div className="section-eyebrow">
              START YOUR JOURNEY
            </div>

            <h2>
              Learn Today.{" "}
              <em>Lead Tomorrow.</em>
            </h2>

            <p>
              Explore our courses and find the right learning path
              for your goals.
            </p>

          </div>

          <Link to="/courses" className="primary-btn">
            Explore Courses
            <FiArrowRight />
          </Link>

        </div>

      </section>

    </main>
  );
}
