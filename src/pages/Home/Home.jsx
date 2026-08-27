import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, FiChevronRight, FiPlay, FiTarget, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { courses, testimonials } from "../../data/siteData";
import "./Home.css";

export default function Home() {
  const [heroData, setHeroData] = useState({
    badgeText: "Top Rated Time",
    heading: "Empowering Minds, Shaping",
    highlightedWord: "Futures",
    description: "At Gyan Time, we provide quality education, expert guidance and holistic development to help students build a successful career.",
    primaryButtonText: "Explore Courses",
    secondaryButtonText: "Inquiry now",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85"
  });

  const [galleryImages, setGalleryImages] = useState([]);

  const [aboutData, setAboutData] = useState({
    eyebrow: "ABOUT US",
    heading: "Welcome to Gyan Time",
    introduction: "Gyan Time was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals.",
    highlights: ["Experienced & Dedicated Faculty", "Modern Infrastructure & Facilities", "Student-Centric Learning Approach", "Affordable Fees & Flexible Batches"]
  });

  const [apiCourses, setApiCourses] = useState([]);
  const [apiTestimonials, setApiTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/api/home-hero")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setHeroData(json.data);
        }
      })
      .catch((err) => console.error("Failed to load hero data:", err));

    fetch("http://localhost:5005/api/gallery")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setGalleryImages(json.data);
        }
      })
      .catch((err) => console.error("Failed to load gallery data:", err));

    fetch("http://localhost:5005/api/about")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setAboutData(json.data);
        }
      })
      .catch((err) => console.error("Failed to load about data:", err));
      
    fetch("http://localhost:5005/api/course")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setApiCourses(json.data.filter(c => c.status !== "Draft").slice(0, 6));
        }
      })
      .catch((err) => console.error("Failed to load courses data:", err));

    fetch("http://localhost:5005/api/testimonial")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setApiTestimonials(json.data.filter(t => t.status !== "Draft"));
        }
      })
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow"><FaGraduationCap /> {heroData.badgeText}</span>
            <h1>{heroData.heading}<br /><span>{heroData.highlightedWord}</span></h1>
            <p>{heroData.description}</p>
            <div className="hero-actions">
              <Link to="/courses" className="primary-btn">{heroData.primaryButtonText} <FiArrowRight /></Link>
              <a href="/contact" className="outline-btn"><FiArrowRight />{heroData.secondaryButtonText} </a>
            </div>
            <div className="hero-features">
              <span><FiUsers /><b>Expert Faculty</b><small>Industry experts</small></span>
              <span><FiBookOpen /><b>Smart Learning</b><small>Modern classrooms</small></span>
              <span><FiBriefcase /><b>Placement Support</b><small>Career assistance</small></span>
              <span><FiTarget /><b>Holistic Growth</b><small>Personality & skills</small></span>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="hero-image-wrap">
              <img src={heroData.imageUrl} alt="Students learning at Gyan Time" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div><span className="stat-icon navy"><FiUsers /></span><strong>2500+</strong><b>Happy Students</b><small>Growing every day</small></div>
        <div><span className="stat-icon gold"><FiBookOpen /></span><strong>50+</strong><b>Courses Offered</b><small>For bright careers</small></div>
        <div><span className="stat-icon navy"><FiAward /></span><strong>98%</strong><b>Success Rate</b><small>Proven track record</small></div>
        <div><span className="stat-icon gold"><FaGraduationCap /></span><strong>15+</strong><b>Years of Excellence</b><small>In education</small></div>
      </section>

      <section className="home-courses section-shell">
        <div className="section-heading">
          <div><span>OUR COURSES</span><h2>Explore Our <em>Popular Courses</em></h2></div>
          <Link to="/courses" className="text-link">View All Courses <FiArrowRight /></Link>
        </div>
        <div className="course-grid">
          {apiCourses.map((course) => (
            <article className="course-card" key={course._id || course.slug}>
              <div className="course-card-image"><img src={course.image} alt={course.title} /><span><FiBookOpen /></span></div>
              <div className="course-card-body">
                <h3>{course.title}</h3>
                <div className="home-course-desc" dangerouslySetInnerHTML={{ __html: course.description }} />
                <Link to={`/courses/${course.slug}`}>Learn More <FiArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-about section-shell" id="about-preview">
        <div className="about-preview-copy">
          <span className="section-kicker">{aboutData.eyebrow}</span>
          <h2>{aboutData.heading}</h2>
          <p>{aboutData.introduction}</p>
          <ul>
            {aboutData.highlights && aboutData.highlights.map((highlight, index) => (
              <li key={index}><FiCheckCircle /> {highlight}</li>
            ))}
          </ul>
          <Link to="/about" className="primary-btn dark">Know More About Us <FiArrowRight /></Link>
        </div>
        <div className="about-preview-images">
          <img className="about-img-main" src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85" alt="Gyan Time campus" />
          <img className="about-img-small" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=85" alt="Students in class" />
          <div className="about-play"><FiPlay /></div>
        </div>
      </section>

      <section className="home-why" id="why-us">
        <div className="why-inner section-shell">
          <div className="why-heading">
            <span>WHY CHOOSE US</span>
            <h2>Your Success is <em>Our Mission</em></h2>
            <p>We combine strong academics, practical learning and personal guidance to create confident, career-ready students.
              We combine strong academics, practical learning and personal guidance to create confident, career-ready students.
              We combine strong academics, practical learning and personal guidance to create confident, career-ready students.
             
            </p>
          </div>
          <div className="why-grid">
            {[
              ["Quality Education", "Concept-based learning approach", FiBookOpen],
              ["Experienced Faculty", "Learn from industry professionals", FiUsers],
              ["Smart Classrooms", "Tech-enabled modern infrastructure", FiTarget],
              ["Career Guidance", "Personalized counselling for your future", FiBriefcase],
              ["Placement Support", "Assistance for career opportunities", FiAward],
              ["Holistic Development", "Focus on overall growth of students", FiCheckCircle]
            ].map(([title, text, Icon]) => (
              <div className="why-item" key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-testimonials" id="testimonials">
        <div className="center-heading section-shell"><span>TESTIMONIALS</span><h2>What Our <em>Students Say</em></h2></div>
        
        {apiTestimonials.length > 0 ? (
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {/* Duplicate array for seamless infinite scroll */}
              {[...apiTestimonials, ...apiTestimonials].map((item, index) => (
                <article className="testimonial-card" key={index}>
                  <div className="student">
                    <img src={item.image} alt={item.name} />
                    <div><b>{item.name}</b><small>{item.course}</small></div>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>No testimonials available yet.</p>
        )}
      </section>

      <section className="home-achievements">
        <div className="achievement-inner section-shell">
          {[
            ["15+", "Years of Excellence", FiAward],
            ["2500+", "Students Enrolled", FiUsers],
            ["100+", "Expert Faculty", FiUsers],
            ["500+", "Successful Placements", FiBriefcase],
            ["20+", "Awards & Recognition", FiAward]
          ].map(([number, label, Icon]) => (
            <div key={label}><Icon /><strong>{number}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="home-gallery section-shell">
        <div className="center-heading"><span>OUR CAMPUS GALLERY</span><h2>Life at <em>Gyan Time</em></h2></div>
        <div className="gallery-strip">
          {galleryImages.slice(0, 5).map((img) => <img key={img._id} src={img.image} alt={img.label} />)}
        </div>
        <Link to="/gallery" className="outline-dark-btn">View More Photos <FiArrowRight /></Link>
      </section>

      {/* <section className="home-final-cta">
        <div className="home-final-inner section-shell">
          <div><FaGraduationCap /><div><span>ADMISSIONS OPEN 2026</span><h2>Take the First Step Towards Your Bright Future</h2></div></div>
          <Link to="/contact" className="primary-btn">Enquire Now <FiArrowRight /></Link>
        </div>
      </section> */}
    </>
  );
}
