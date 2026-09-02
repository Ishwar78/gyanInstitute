import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight, FiCheckCircle, FiBriefcase,
  FiUsers, FiSearch, FiBookOpen, FiAward,
  FiClock, FiStar, FiTrendingUp, FiTarget,
  FiPhone, FiSend, FiX, FiUser, FiMail, FiMessageSquare
} from "react-icons/fi";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import { MdVerified, MdOutlineSchool } from "react-icons/md";
import "./Courses.css";

const STATS = [
  { icon: <FaChalkboardTeacher />, value: "15+",   label: "Expert Faculty" },
  { icon: <FiUsers />,             value: "5000+", label: "Students Taught" },
  { icon: <MdVerified />,          value: "100%",  label: "Practical Training" },
  { icon: <FiBookOpen />,          value: "20+",   label: "Professional Courses" },
];

const QUALITY = [
  { icon: <FiTarget />,        title: "Industry Curriculum",  desc: "Updated syllabus matching current market standards." },
  { icon: <FiUsers />,         title: "Expert Mentors",       desc: "Professionals with years of real-world experience." },
  { icon: <FiBriefcase />,     title: "Career Assistance",    desc: "Placement support and resume guidance." },
  { icon: <FaGraduationCap />, title: "Certification",        desc: "Recognised certificates on completion." },
];

const COURSES_PER_PAGE = 9;

export default function Courses() {
  const [filter, setFilter]           = useState("All Courses");
  const [search, setSearch]           = useState("");
  const [courses, setCourses]         = useState([]);
  const [categories, setCategories]   = useState(["All Courses"]);
  const [loading, setLoading]         = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  // Inquiry Popup State
  const [inquiryPopup, setInquiryPopup] = useState(false);
  const [popupCourse, setPopupCourse] = useState(null);
  const [popupSent, setPopupSent] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [contactPhone] = useState("+91 92530 10028");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5005/api/course").then(r => r.json()),
      fetch("http://localhost:5005/api/category").then(r => r.json()),
    ]).then(([courseRes, catRes]) => {
      if (courseRes.success) setCourses(courseRes.data.filter(c => c.status !== "Draft"));
      if (catRes.success) {
        const active = catRes.data.filter(c => c.status !== "Draft").map(c => c.name);
        setCategories(["All Courses", ...active]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered   = courses
    .filter(c => filter === "All Courses" || c.category === filter)
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / COURSES_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * COURSES_PER_PAGE, currentPage * COURSES_PER_PAGE);

  const handleFilter = (cat) => {
    setFilter(cat);
    setCurrentPage(1);
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleSearch = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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

  // Sidebar Inquiry Form State
  const [sidebarSent, setSidebarSent] = useState(false);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const handleSidebarInquirySubmit = async (e) => {
    e.preventDefault();
    setSidebarLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.subject) data.subject = "Course Page Sidebar Inquiry";
    try {
      const response = await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSidebarSent(true);
        e.target.reset();
        setTimeout(() => setSidebarSent(false), 6000);
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Sidebar inquiry error:", err);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setSidebarLoading(false);
    }
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
      console.error("Inquiry error:", err);
    } finally {
      setPopupLoading(false);
    }
  };

  const renderSidebarWidgets = () => (
    <>
      <div className="cp-sidebar-cta">
        <MdOutlineSchool />
        <p>Need help choosing a course?</p>
        <Link to="/contact">Get Free Counselling</Link>
      </div>

      {/* ── Sidebar Quick Inquiry Form ── */}
      <div className="cp-sidebar-inquiry-card">
        <div className="cp-sb-inq-header">
          <div className="cp-sb-inq-icon-wrap">
            <FaGraduationCap />
          </div>
          <div>
            <span className="cp-sb-inq-badge">Free Guidance</span>
            <h4>Need Course Advice?</h4>
          </div>
        </div>

        {sidebarSent ? (
          <div className="cp-sb-inq-success">
            <FiCheckCircle className="cp-success-icon" />
            <h5>Inquiry Submitted!</h5>
            <p>Our counsellor will call you shortly to assist you.</p>
          </div>
        ) : (
          <form className="cp-sb-inq-form" onSubmit={handleSidebarInquirySubmit}>
            <div className="cp-sb-group">
              <label><FiUser /> Full Name *</label>
              <input 
                name="name" 
                required 
                placeholder="Enter your full name" 
              />
            </div>

            <div className="cp-sb-group">
              <label><FiPhone /> Mobile Number *</label>
              <input 
                name="phone" 
                required 
                type="tel" 
                placeholder="Enter mobile number" 
              />
            </div>

            <div className="cp-sb-group">
              <label><FiMail /> Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder="Your email (optional)" 
              />
            </div>

            <div className="cp-sb-group">
              <label><FiBookOpen /> Interested Course</label>
              <input 
                type="text"
                name="subject"
                list="course-suggestions-list"
                placeholder="Type or select course name..."
                autoComplete="off"
              />
              <datalist id="course-suggestions-list">
                {courses.map((c) => (
                  <option key={c._id || c.slug} value={c.title} />
                ))}
                <option value="Full Stack Web Development" />
                <option value="Digital Marketing with AI" />
                <option value="Python Data Science" />
                <option value="Graphic Designing" />
                <option value="Basic Computer Course" />
                <option value="Tally Prime with GST" />
                <option value="General Course Counselling" />
              </datalist>
            </div>

            <div className="cp-sb-group">
              <label><FiMessageSquare /> Message / Query</label>
              <textarea 
                name="message" 
                rows="2" 
                placeholder="Any query or preferred batch timing..." 
              />
            </div>

            <button type="submit" className="cp-sb-inq-btn" disabled={sidebarLoading}>
              {sidebarLoading ? "Sending..." : "Request Call"} <FiSend />
            </button>
          </form>
        )}
      </div>
    </>
  );

  const navigate = useNavigate();

  return (
    <div className="cp-page">

      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-hero-bg">
          <div className="cp-hero-orb cp-orb1" />
          <div className="cp-hero-orb cp-orb2" />
          <div className="cp-hero-orb cp-orb3" />
        </div>

        <div className="cp-hero-inner section-shell">
          <div className="cp-hero-text">
            <span className="cp-eyebrow"><FiTrendingUp /> Our Programs</span>
            <h1>Shape Your Future<br />with <em>Gyan Institute</em></h1>
            <p>
              From foundational computer skills to advanced competitive exam
              preparation — courses designed to make you successful.
            </p>
            <div className="cp-hero-actions">
              <a href="#cp-grid" className="cp-btn-primary">
                Explore Courses <FiArrowRight />
              </a>
              <Link to="/contact" className="cp-btn-ghost">Talk to Advisor</Link>
            </div>
          </div>

          <div className="cp-hero-visual">
            <div className="cp-hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
                alt="Students learning"
              />
              <div className="cp-hero-badge">
                <FiStar />
                <span><strong>4.9</strong> Rated Institute</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="cp-stats-row section-shell">
          {STATS.map((s, i) => (
            <div className="cp-stat-card" key={i}>
              <span className="cp-stat-icon">{s.icon}</span>
              <div>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSER */}
      <section className="cp-browser section-shell" id="cp-grid" ref={gridRef}>

        <aside className="cp-sidebar">
          <div className="cp-sidebar-inner">
            <h3 className="cp-sidebar-title"><FiSearch /> Find Your Course</h3>

            <div className="cp-search-box">
              <FiSearch className="cp-search-ico" />
              <input
                placeholder="Search courses..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
              />
            </div>

            <p className="cp-sidebar-label">CATEGORIES</p>
            <nav className="cp-cat-nav">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cp-cat-btn${filter === cat ? " active" : ""}`}
                  onClick={() => handleFilter(cat)}
                >
                  <span className="cp-cat-dot" />
                  {cat}
                  {filter === cat && <FiCheckCircle className="cp-cat-check" />}
                </button>
              ))}
            </nav>

            {/* ── Sidebar Quick Inquiry Form ── */}
            <div className="cp-desktop-sidebar-widgets">
              {renderSidebarWidgets()}
            </div>
          </div>
        </aside>

        <div className="cp-results">
          <div className="cp-results-head">
            <div>
              <h2>
                {filter === "All Courses"
                  ? <>All <em>Courses</em></>
                  : <em>{filter}</em>}
              </h2>
              <p>{filtered.length} course{filtered.length !== 1 ? "s" : ""} available</p>
            </div>
            <select className="cp-sort-select">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Duration</option>
            </select>
          </div>

          {loading ? (
            <div className="cp-loading">
              {[1,2,3].map(i => <div className="cp-skeleton" key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="cp-empty">
              <FiBookOpen />
              <p>No courses found. Try a different filter.</p>
            </div>
          ) : (
            <>
              <div className="cp-grid">
                {paginated.map(course => (
                  <article 
                    className="cp-card" 
                    key={course._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/courses/${course.slug}`)}
                  >
                    <div className="cp-card-img-wrap">
                      <img src={course.image} alt={course.title} />
                      <span className="cp-card-badge">{course.category}</span>
                      {course.level && <span className="cp-card-level">{course.level}</span>}
                    </div>

                    <div className="cp-card-body">
                      <h3>{course.title}</h3>
                      <div
                        className="cp-card-desc"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />
                      <div className="cp-card-meta">
                        {course.duration && <span><FiClock /> {course.duration}</span>}
                        {course.mode && <span><FiBookOpen /> {course.mode}</span>}
                      </div>
                    </div>

                    <div className="cp-card-footer">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="cp-pagination">
                  <button
                    className="cp-pg-btn cp-pg-arrow"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    ← Prev
                  </button>

                  <div className="cp-pg-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`cp-pg-btn${currentPage === page ? " cp-pg-active" : ""}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="cp-pg-btn cp-pg-arrow"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Mobile View Bottom Widgets (Appears below Courses Grid on Mobile) ── */}
        <div className="cp-mobile-bottom-widgets">
          {renderSidebarWidgets()}
        </div>
      </section>

      {/* QUALITY */}
     {/* QUALITY */}
<section className="cp-quality">
  <div className="cp-quality-inner section-shell">
    <div className="cp-quality-text">
      <span className="cp-eyebrow-dark">
        <FiStar /> Why Choose Us
      </span>

      <h2>
        Quality <em>Education</em>
        <br />
        You Can Trust
      </h2>
    </div>

    <div className="cp-quality-grid">
      {QUALITY.map((q, i) => (
        <div className="cp-quality-card" key={i}>

          <div className="cp-quality-card-head">
            <span className="cp-quality-icon">
              {q.icon}
            </span>

            <h4>{q.title}</h4>
          </div>

          <p>{q.desc}</p>

        </div>
      ))}
    </div>
  </div>
</section>

      {/* POPULAR CATEGORIES */}
      {/* <section className="cp-cats section-shell">
        <div className="cp-center-head">
          <span className="cp-eyebrow"><FiBookOpen /> Popular Categories</span>
          <h2>Browse Courses by <em>Category</em></h2>
        </div>
        <div className="cp-cat-cards">
          {categories.filter(c => c !== "All Courses").map((item, i) => (
            <Link
              key={item}
              className="cp-cat-tile"
              to="/courses"
              onClick={() => {
                setFilter(item);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className={`cp-tile-icon icon-${i}`}><FiBookOpen /></span>
              <h3>{item}</h3>
              <p>Build knowledge and practical skills.</p>
              <span className="cp-tile-link">Explore <FiArrowRight /></span>
            </Link>
          ))}
        </div>
      </section> */}

      {/* ── CTA ── */}
      {/* <section className="cp-cta">
        <div className="cp-cta-inner section-shell">
          <div className="cp-cta-text">
            <span><FaGraduationCap /> Admissions Open 2026</span>
            <h2>Ready to Start Your Journey?</h2>
            <p>Join Gyan Institute and take the next step towards a bright future.</p>
          </div>
          <div className="cp-cta-actions">
            <Link to="/contact" className="cp-btn-gold">Enquire Now <FiArrowRight /></Link>
            <Link to="/about" className="cp-btn-outline-white">Learn More</Link>
          </div>
        </div>
      </section> */}

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

    </div>
  );
}
