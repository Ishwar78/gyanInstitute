import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, FiChevronRight, FiPlay, FiPhone, FiTarget, FiUsers, FiSend, FiX } from "react-icons/fi";
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
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85",
    images: ["https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85"],
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroData.images && heroData.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroData.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroData.images]);

  const [galleryImages, setGalleryImages] = useState([]);

  const [aboutData, setAboutData] = useState({
    eyebrow: "ABOUT US",
    heading: "Welcome to Gyan Time",
    introduction: "Gyan Time was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals.",
    highlights: ["Experienced & Dedicated Faculty", "Modern Infrastructure & Facilities", "Student-Centric Learning Approach", "Affordable Fees & Flexible Batches"]
  });

  const [apiCourses, setApiCourses] = useState([]);
  const [apiTestimonials, setApiTestimonials] = useState([]);
  const [heroFormSent, setHeroFormSent] = useState(false);
  const [heroFormLoading, setHeroFormLoading] = useState(false);
  const [inquiryPopup, setInquiryPopup] = useState(false);
  const [popupCourse, setPopupCourse] = useState(null);
  const [popupSent, setPopupSent] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [contactPhone, setContactPhone] = useState("+91 98765 43210");

  const heroSubmit = async (e) => {
    e.preventDefault();
    setHeroFormLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setHeroFormSent(true);
        e.target.reset();
        setTimeout(() => setHeroFormSent(false), 5000);
      }
    } catch (err) {
      console.error("Inquiry error:", err);
    } finally {
      setHeroFormLoading(false);
    }
  };

  const openInquiryPopup = (course) => {
    setPopupCourse(course);
    setPopupSent(false);
    setInquiryPopup(true);
  };

  const closePopup = () => {
    setInquiryPopup(false);
    setPopupCourse(null);
    setPopupSent(false);
  };

  const popupSubmit = async (e) => {
    e.preventDefault();
    setPopupLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setPopupSent(true);
        e.target.reset();
      }
    } catch (err) {
      console.error("Popup inquiry error:", err);
    } finally {
      setPopupLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5005/api/home-hero")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const fetchedData = json.data;
          if (!fetchedData.images || fetchedData.images.length === 0) {
            fetchedData.images = fetchedData.imageUrl ? [fetchedData.imageUrl] : [];
          }
          setHeroData(fetchedData);
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
          setApiCourses(json.data.filter(c => c.status !== "Draft").slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to load courses data:", err));

    fetch("http://localhost:5005/api/contact-info")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setContactPhone(json.data.phone);
      })
      .catch(() => {});

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
          <div className="home-hero-copy hero-inquiry-wrap">
            <div className="hero-inquiry-card">
              <div className="hero-inquiry-header">
                <span className="eyebrow"><FaGraduationCap /> Quick Inquiry</span>
                <h2>Get in Touch <span>With Us</span></h2>
                <p>Fill in your details and our team will reach out to you shortly.</p>
              </div>
              <form className="hero-inquiry-form" onSubmit={heroSubmit}>
                <div className="hero-form-row">
                  <div className="hero-form-group">
                    <label>Full Name</label>
                    <input name="name" required placeholder="Enter your name" />
                  </div>
                  <div className="hero-form-group">
                    <label>Mobile Number</label>
                    <input name="phone" required placeholder="Enter mobile number" type="tel" />
                  </div>
                </div>
                <div className="hero-form-row">
                  <div className="hero-form-group">
                    <label>Email Address</label>
                    <input name="email" required type="email" placeholder="Enter your email" />
                  </div>
                  <div className="hero-form-group">
                    <label>Subject</label>
                    <input name="subject" required placeholder="e.g. Course Inquiry" />
                  </div>
                </div>
                <div className="hero-form-group">
                  <label>Message</label>
                  <textarea name="message" required rows="3" placeholder="Write your message here..." />
                </div>
                <button className="hero-inquiry-btn" type="submit" disabled={heroFormLoading}>
                  {heroFormLoading ? "Sending..." : "Send Inquiry"} <FiSend />
                </button>
                {heroFormSent && (
                  <div className="hero-success-msg">
                    ✅ Thank you! We'll contact you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="hero-image-wrap slider-wrap">
              {heroData.images && heroData.images.length > 0 ? (
                heroData.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Gyan Time - Slide ${idx + 1}`} 
                    className={`slider-img ${idx === currentSlide ? 'active' : ''}`}
                  />
                ))
              ) : (
                <img src={heroData.imageUrl} alt="Students learning at Gyan Time" className="slider-img active" />
              )}
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
        <div className="course-grid home-course-grid-3">
          {apiCourses.map((course) => (
            <article className="course-card" key={course._id || course.slug}>
              <div className="course-card-image"><img src={course.image} alt={course.title} /><span><FiBookOpen /></span></div>
              <div className="course-card-body">
                <h3>{course.title}</h3>
                <div className="home-course-desc" dangerouslySetInnerHTML={{ __html: course.description }} />
                <div className="course-card-actions">
                  <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="cc-btn cc-call">
                    <FiPhone /> Call Now
                  </a>
                  <button className="cc-btn cc-inquiry" onClick={() => openInquiryPopup(course)}>
                    Inquiry
                  </button>
                  <Link to={`/courses/${course.slug}`} className="cc-btn cc-read">
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Inquiry Popup Modal ── */}
      {inquiryPopup && (
        <div className="inq-overlay" onClick={closePopup}>
          <div className="inq-modal" onClick={(e) => e.stopPropagation()}>
            <button className="inq-close" onClick={closePopup}><FiX /></button>
            <div className="inq-modal-header">
              <span className="inq-badge"><FaGraduationCap /> Quick Inquiry</span>
              <h3>Interested in <span>{popupCourse?.title}</span>?</h3>
              <p>Fill in your details and our counsellor will call you back shortly.</p>
            </div>
            {popupSent ? (
              <div className="inq-success">
                ✅ Thank you! Our team will reach out to you soon.
              </div>
            ) : (
              <form className="inq-form" onSubmit={popupSubmit}>
                <input type="hidden" name="subject" value={`Inquiry: ${popupCourse?.title}`} />
                <div className="inq-row">
                  <div className="inq-group">
                    <label>Full Name</label>
                    <input name="name" required placeholder="Enter your name" />
                  </div>
                  <div className="inq-group">
                    <label>Mobile Number</label>
                    <input name="phone" required type="tel" placeholder="Enter mobile number" />
                  </div>
                </div>
                <div className="inq-group">
                  <label>Email Address</label>
                  <input name="email" required type="email" placeholder="Enter your email" />
                </div>
                <div className="inq-group">
                  <label>Message (Optional)</label>
                  <textarea name="message" rows="3" placeholder="Any specific questions?" />
                </div>
                <div className="inq-footer">
                  <button type="submit" className="inq-submit" disabled={popupLoading}>
                    {popupLoading ? "Sending..." : "Send Inquiry"} <FiSend />
                  </button>
                  <a href={`tel:${contactPhone.replace(/\s/g, "")}`} className="inq-call-btn">
                    <FiPhone /> {contactPhone}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
