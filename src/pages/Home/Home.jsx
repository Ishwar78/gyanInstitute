import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, 
  FiChevronRight, FiPlay, FiPhone, FiTarget, FiUsers, FiSend, FiX, FiVideo 
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { courses, testimonials } from "../../data/siteData";
import "./Home.css";

const companyLogos = [
  { name: "HCLTech", src: "/images/hcl.png" },
  { name: "Zomato", src: "/images/zom.png" },
  { name: "Under Armour", src: "/images/under.svg" },
  { name: "MultiClout", src: "/images/multi.png" },
  { name: "ThinkCentre", src: "/images/thin.webp" },
  { name: "TCS", src: "/images/tc.png" },
  { name: "Bank of America", src: "/images/bankof.png" },
  { name: "Redbull", src: "/images/redbull.png" },
  {name: "Indigo" , src: "/images/indigo.png"},
  {name: "Dell" , src: "/images/dell.png"}
];

const defaultVideoStories = [
  {
    _id: "def-1",
    title: "Advanced Digital Marketing With AI Training Company",
    studentName: "Rahul Sharma",
    courseOrRole: "Digital Marketing Specialist",
    subText: "Web Mok - Experience",
    badgeText: "WEB MOK - STORY",
    tagPill: "Student Testimonial",
    callLine: "Call Now - 8684031003",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    status: "Active"
  },
  {
    _id: "def-2",
    title: "Advanced Digital Marketing With AI Training Company",
    studentName: "Aman Verma",
    courseOrRole: "Full Stack Developer",
    subText: "Web Mok - Experience",
    badgeText: "WEB MOK - STORY",
    tagPill: "Student Testimonial",
    callLine: "Call Now - 8684031003",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    status: "Active"
  },
  {
    _id: "def-3",
    title: "Advanced Digital Marketing With AI Training Company",
    studentName: "Sunny Kumar",
    courseOrRole: "UI/UX Designer",
    subText: "Web Mok - Experience",
    badgeText: "WEB MOK - STORY",
    tagPill: "Student Testimonial",
    callLine: "Call Now - 8684031003",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    status: "Active"
  },
  {
    _id: "def-4",
    title: "Advanced Digital Marketing With AI Training Company",
    studentName: "Priya Singh",
    courseOrRole: "Digital Marketer",
    subText: "Web Mok - Experience",
    badgeText: "WEB MOK - STORY",
    tagPill: "Student Testimonial",
    callLine: "Call Now - 8684031003",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    status: "Active"
  }
];

export default function Home() {
  const navigate = useNavigate();

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
    highlights: ["Experienced & Dedicated Faculty", "Modern Infrastructure & Facilities", "Student-Centric Learning Approach", "Affordable Fees & Flexible Batches"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
    imageCaption: "Gyan Institute of Professional Studies",
    imageSubLine: "Empowering Students Since 2011",
    experienceBadgeNumber: "15+",
    experienceBadgeText: "Years of Excellence"
  });

  const [apiCourses, setApiCourses] = useState([]);
  const [apiTestimonials, setApiTestimonials] = useState([]);
  const [videoStories, setVideoStories] = useState([]);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

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

    fetch("http://localhost:5005/api/video-testimonial?status=Active")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.length > 0) {
          setVideoStories(json.data);
        }
      })
      .catch((err) => console.error("Failed to load video testimonials:", err));
  }, []);

  // Displayed video list: API videos if available, otherwise fallback default cards
  const displayedVideos = videoStories.length > 0 ? videoStories : defaultVideoStories;

  const renderInquiryCard = () => (
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
  );

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-inner">
          {/* Desktop Left: Quick Inquiry Form */}
          <div className="home-hero-copy hero-inquiry-wrap desktop-hero-form">
            {renderInquiryCard()}
          </div>

          {/* Desktop Right: Image Slider */}
          <div className="home-hero-visual desktop-hero-slider">
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

          {/* Mobile Hero Content (Replaces Image Slider on Mobile, Managed via Admin) */}
          <div className="mobile-hero-content-wrap">
            {heroData.badgeText && (
              <span className="eyebrow mobile-hero-badge">
                <FaGraduationCap /> {heroData.badgeText}
              </span>
            )}
            <h1 className="mobile-hero-heading">
              {heroData.heading || "Empowering Minds, Shaping"}{" "}
              <span>{heroData.highlightedWord || "Futures"}</span>
            </h1>
            <p className="mobile-hero-desc">
              {heroData.description || "At Gyan Time, we provide quality education, expert guidance and holistic development to help students build a successful career."}
            </p>
            <div className="mobile-hero-actions">
              <Link to="/courses" className="primary-btn mobile-hero-btn-primary">
                {heroData.primaryButtonText || "Explore Courses"} <FiArrowRight />
              </Link>
              <a 
                href="#mobile-inquiry-box" 
                className="outline-btn mobile-hero-btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("mobile-inquiry-box");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {heroData.secondaryButtonText || "Inquiry Now"} <FiSend />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div className="home-stat-item">
          <div className="stat-head">
            <span className="stat-icon navy"><FiUsers /></span>
            <strong>2500+</strong>
          </div>
          <div className="stat-info">
            <b>Happy Students</b>
            <small>Growing every day</small>
          </div>
        </div>

        <div className="home-stat-item">
          <div className="stat-head">
            <span className="stat-icon gold"><FiBookOpen /></span>
            <strong>50+</strong>
          </div>
          <div className="stat-info">
            <b>Courses Offered</b>
            <small>For bright careers</small>
          </div>
        </div>

        <div className="home-stat-item">
          <div className="stat-head">
            <span className="stat-icon navy"><FiAward /></span>
            <strong>98%</strong>
          </div>
          <div className="stat-info">
            <b>Success Rate</b>
            <small>Proven track record</small>
          </div>
        </div>

        <div className="home-stat-item">
          <div className="stat-head">
            <span className="stat-icon gold"><FaGraduationCap /></span>
            <strong>15+</strong>
          </div>
          <div className="stat-info">
            <b>Years of Excellence</b>
            <small>In education</small>
          </div>
        </div>
      </section>

      {/* ── Quick Inquiry Form on Mobile (Below Stats Strip) ── */}
      <section id="mobile-inquiry-box" className="mobile-home-inquiry-section">
        {renderInquiryCard()}
      </section>

      {/* ── Popular Courses Section (Clickable Cards) ── */}
      <section className="home-courses section-shell">
        <div className="section-heading">
          <div><span>OUR COURSES</span><h2>Explore Our <em>Popular Courses</em></h2></div>
          <Link to="/courses" className="text-link">View All Courses <FiArrowRight /></Link>
        </div>
        <div className="course-grid home-course-grid-3">
          {apiCourses.map((course) => (
            <article 
              className="course-card" 
              key={course._id || course.slug}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/courses/${course.slug}`)}
            >
              <div className="course-card-image">
                <img src={course.image} alt={course.title} />
                <span><FiBookOpen /></span>
              </div>
              <div className="course-card-body">
                <h3>{course.title}</h3>
                <div className="home-course-desc" dangerouslySetInnerHTML={{ __html: course.description }} />
                <div className="course-card-actions">
                  <a 
                    href={`tel:${contactPhone.replace(/\s/g, "")}`} 
                    className="cc-btn cc-call"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiPhone /> Call Now
                  </a>
                  <button 
                    className="cc-btn cc-inquiry" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openInquiryPopup(course);
                    }}
                  >
                    Inquiry
                  </button>
                  <Link 
                    to={`/courses/${course.slug}`} 
                    className="cc-btn cc-read"
                    onClick={(e) => e.stopPropagation()}
                  >
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

      {/* ── About Section with Main Image & Bottom Button Line ── */}
      <section className="ha-about" id="about-preview">
        <div className="ha-about-inner section-shell">

          {/* Left — Single Main Image with Badge & Bottom Button-style Line */}
          <div className="ha-img-col">
            <div className="ha-img-main-wrap">
              <img
                src={aboutData.image || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85"}
                alt="Gyan Institute campus"
                className="ha-img-main"
              />
              {/* floating years badge */}
              <div className="ha-exp-badge">
                <strong>{aboutData.experienceBadgeNumber || "15+"}</strong>
                <span>{aboutData.experienceBadgeText || "Years of\nExcellence"}</span>
              </div>

              {/* Bottom Button-type Caption Line */}
              <div className="ha-img-bottom-btn-pill">
                <span className="ha-pill-icon"><FaGraduationCap /></span>
                <div className="ha-pill-text">
                  <strong>{aboutData.imageCaption || "Gyan Institute of Professional Studies"}</strong>
                  {aboutData.imageSubLine && <small>{aboutData.imageSubLine}</small>}
                </div>
              </div>
            </div>

            {/* decorative gold ring */}
            <div className="ha-deco-ring" />
            <div className="ha-deco-dots" />
          </div>

          {/* Right — Content */}
          <div className="ha-content-col">
            <span className="ha-eyebrow">
              <FiAward /> About Us
            </span>
            <h2 className="ha-heading">
              {aboutData.heading}<br />
              <em>Empowering Every Student</em>
            </h2>
            <p className="ha-desc">{aboutData.introduction}</p>

            {/* highlights */}
            <div className="ha-highlights">
              {aboutData.highlights && aboutData.highlights.map((h, i) => (
                <div className="ha-highlight-item" key={i}>
                  <span className="ha-hl-icon"><FiCheckCircle /></span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* mini stats row */}
            <div className="ha-mini-stats">
              {[
                { val: "5000+", label: "Students" },
                { val: "20+",   label: "Courses" },
                { val: "100%",  label: "Practical" },
              ].map(s => (
                <div className="ha-mini-stat" key={s.label}>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="ha-cta-btn">
              Know More About Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-why" id="why-us">
        <div className="why-inner section-shell">
          <div className="why-heading">
            <span>WHY CHOOSE US</span>
            <h2>Your Success is <em>Our Mission</em></h2>
            <p>We combine strong academics, practical learning and personal guidance to create confident, career-ready students.</p>
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
            ["500+", "Successful Placements", FiBriefcase],
            ["20+", "Awards & Recognition", FiAward]
          ].map(([number, label, Icon]) => (
            <div key={label}><Icon /><strong>{number}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      {/* ── COMPANY LOGO MARQUEE (Above Video Testimonials) ── */}
      <section className="home-company-marquee">
        <div className="section-shell">
          <h3 className="company-marquee-title">OUR STUDENTS ARE PLACED IN TOP COMPANIES</h3>
        </div>
        <div className="company-marquee-wrapper">
          <div className="company-marquee-track">
            {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, idx) => (
              <div className="company-logo-item" key={idx}>
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS / STORIES SECTION ── */}
      <section className="home-video-testimonials section-shell" id="video-testimonials">
        <div className="center-heading">
          <span>VIDEO TESTIMONIALS</span>
          <h2>Real Stories, <em>Real Success</em></h2>
          {/* <p>Watch authentic experiences and reviews shared by our proud students.</p> */}
        </div>

        <div className="video-stories-grid">
          {(showAllVideos ? displayedVideos : displayedVideos.slice(0, 4)).map((video) => (
            <article 
              className="video-story-card" 
              key={video._id} 
              onClick={() => setActiveVideoModal(video)}
            >
              <div className="video-card-inner">
                {/* Background media */}
                <div className="video-card-bg">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.studentName} />
                  ) : (
                    <video src={video.videoUrl} preload="metadata" muted />
                  )}
                  <div className="video-card-gradient-top" />
                  <div className="video-card-gradient-bottom" />
                </div>

                {/* Top Badge & Watermark */}
                <div className="video-card-top">
                  {video.badgeText ? (
                    <span className="story-badge-pill">{video.badgeText}</span>
                  ) : (
                    <span className="story-badge-pill">GYAN INSTITUTE - STORY</span>
                  )}
                  <span className="story-watermark">Gyan Institute</span>
                </div>

                {/* Center Frosted Play Button & Testimonial Tag */}
                <div className="video-card-center">
                  {video.tagPill && (
                    <div className="story-center-pill">
                      <span>{video.tagPill}</span>
                    </div>
                  )}
                  <button className="story-play-btn" aria-label="Play video review">
                    <FiPlay />
                  </button>
                </div>

                {/* Bottom Overlay Card */}
                <div className="video-card-bottom">
                  {(video.title || video.callLine) && (
                    <div className="story-bottom-info-pill">
                      {video.title && <h4>{video.title}</h4>}
                      {video.callLine && <span className="story-call-line">{video.callLine}</span>}
                    </div>
                  )}

                  <div className="story-review-footer">
                    <div className="story-student-review-label">Student Review</div>
                    <div className="story-student-sub">{video.subText || `${video.studentName} · Story`}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Expand / See More Action Button */}
        {displayedVideos.length > 4 && (
          <div className="video-stories-actions">
            <button 
              className="see-more-video-btn" 
              onClick={() => setShowAllVideos(!showAllVideos)}
            >
              <span>{showAllVideos ? "− Show Less" : "+ See More"}</span>
              <span className="see-more-count">
                {showAllVideos ? "collapse" : `+${displayedVideos.length - 4} videos`}
              </span>
            </button>
          </div>
        )}
      </section>

      {/* ── Video Player Modal ── */}
      {activeVideoModal && (
        <div className="vt-modal-overlay" onClick={() => setActiveVideoModal(null)}>
          <div className="vt-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="vt-modal-close" onClick={() => setActiveVideoModal(null)} aria-label="Close video player">
              <FiX />
            </button>
            <div className="vt-modal-player-wrap">
              {activeVideoModal.videoUrl.includes("youtube.com") || activeVideoModal.videoUrl.includes("youtu.be") ? (
                <iframe
                  src={
                    activeVideoModal.videoUrl.includes("watch?v=")
                      ? activeVideoModal.videoUrl.replace("watch?v=", "embed/") + "?autoplay=1"
                      : activeVideoModal.videoUrl + "?autoplay=1"
                  }
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="vt-modal-video"
                />
              ) : (
                <video
                  src={activeVideoModal.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="vt-modal-video"
                />
              )}
            </div>
            <div className="vt-modal-info">
              <span className="vt-modal-badge">{activeVideoModal.badgeText || "WEB MOK - STORY"}</span>
              <h3>{activeVideoModal.title}</h3>
              <div className="vt-modal-meta">
                <b>{activeVideoModal.studentName}</b>
                {activeVideoModal.courseOrRole && <span> · {activeVideoModal.courseOrRole}</span>}
                {activeVideoModal.callLine && <span className="vt-modal-phone"> · {activeVideoModal.callLine}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
