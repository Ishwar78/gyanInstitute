import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiMonitor,
  FiTag,
  FiUsers,
  FiHelpCircle,
  FiChevronDown,
  FiExternalLink,
  FiPhone
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./CourseDetails.css";

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

export default function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [related, setRelated] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [openSyllabus, setOpenSyllabus] = useState([0]); // Open first syllabus module by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Brochure Modal State
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [selectedProgramMode, setSelectedProgramMode] = useState("Offline");
  const [brochureForm, setBrochureForm] = useState({ name: "", phone: "", email: "", city: "" });
  const [brochureSubmitting, setBrochureSubmitting] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  const [contactInfo, setContactInfo] = useState({ phone: "+91 92530 10028" });

  const toggleSyllabus = (index) => {
    if (openSyllabus.includes(index)) {
      setOpenSyllabus(openSyllabus.filter((i) => i !== index));
    } else {
      setOpenSyllabus([...openSyllabus, index]);
    }
  };

  const handleOpenBrochureModal = (modeTitle) => {
    setSelectedProgramMode(modeTitle);
    setBrochureSuccess(false);
    setBrochureModalOpen(true);
  };

  const handleBrochureSubmit = async (e) => {
    e.preventDefault();
    setBrochureSubmitting(true);
    try {
      // Send brochure lead to backend inquiry API
      await fetch("http://localhost:5005/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brochureForm.name,
          phone: brochureForm.phone,
          email: brochureForm.email || `${brochureForm.phone}@prospect.com`,
          city: brochureForm.city || "Not Provided",
          type: "Brochure Download",
          courseName: course?.title || "Course",
          programMode: selectedProgramMode,
          subject: `Brochure Request for ${course?.title || "Course"} (${selectedProgramMode})`,
          message: `Student requested Brochure download for ${course?.title || "Course"} (${selectedProgramMode} Program). City: ${brochureForm.city || "N/A"}, Phone: ${brochureForm.phone}`
        })
      });
      setBrochureSuccess(true);
      setTimeout(() => {
        setBrochureModalOpen(false);
        setBrochureForm({ name: "", phone: "", email: "", city: "" });
        setBrochureSuccess(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setBrochureSubmitting(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5005/api/contact-info")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setContactInfo(json.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch single course
    fetch(`http://localhost:5005/api/course/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCourse(json.data);
          // Fetch related courses
          fetch("http://localhost:5005/api/course")
            .then((res) => res.json())
            .then((allJson) => {
              if (allJson.success) {
                const others = allJson.data.filter(
                  (c) => c.slug !== slug && c.category === json.data.category && c.status !== "Draft"
                );
                setRelated(others.slice(0, 2));
              }
            });
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load course details:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch Placed Students
    fetch("http://localhost:5005/api/placed-student?status=Active")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setPlacedStudents(json.data);
        }
      })
      .catch((err) => console.error("Failed to load placed students:", err));

    // Fetch Mentors
    fetch("http://localhost:5005/api/mentor?status=Active")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setMentors(json.data);
        }
      })
      .catch((err) => console.error("Failed to load mentors:", err));
  }, [slug]);

  if (loading) {
    return <div style={{ padding: "100px", textAlign: "center" }}>Loading course details...</div>;
  }

  if (error || !course) {
    return (
      <div className="course-not-found">
        <FaGraduationCap />
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist or may have been removed.</p>
        <Link to="/courses" className="back-btn"><FiArrowLeft /> Back to Courses</Link>
      </div>
    );
  }

  // Relevant Placed Students for this course or general
  const filteredPlacedStudents = placedStudents.filter(
    (st) => !st.courseSlug || st.courseSlug === slug || st.courseSlug === "all"
  );
  const displayedStudents = filteredPlacedStudents.length > 0 ? filteredPlacedStudents : placedStudents;

  // Normalized Syllabus Modules with Chapters
  const parsedSyllabus = (course.syllabus && course.syllabus.length > 0 ? course.syllabus : []).map((item, i) => {
    if (typeof item === "string") {
      return {
        title: item,
        topics: [
          "Core concepts and architectural fundamentals",
          "Practical implementation and real-world exercises",
          "Industry standard best practices & project workflow"
        ]
      };
    }
    return {
      title: item.title || `Module ${i + 1}`,
      topics: Array.isArray(item.topics) && item.topics.length > 0
        ? item.topics
        : ["Core concepts and architectural fundamentals", "Hands-on projects & exercises"]
    };
  });

  // Default course-wise FAQs if not provided in admin
  const defaultFaqs = [
    {
      question: `Who can enroll in the ${course.title} course?`,
      answer: `Anyone interested in building a career in this field can enroll. We cover concepts from absolute beginner to advanced industry standards. Both students and working professionals are welcome.`
    },
    {
      question: "Do you provide a certificate upon completion?",
      answer: "Yes, you will receive an industry-recognized certificate from Gyan Time upon successful completion of your course and live projects."
    },
    {
      question: "Is there placement assistance provided?",
      answer: "Yes, our dedicated Corporate Relations & Placement Cell assists students with resume building, mock interviews, and scheduling interview drives with hiring partners."
    },
    {
      question: "What if I miss a class or need doubt resolution?",
      answer: "We provide recorded sessions, backup classes, and 1-on-1 doubt clearing sessions with our faculty whenever you need help."
    }
  ];

  const courseFaqs = course.faqs && course.faqs.length > 0 ? course.faqs : defaultFaqs;

  // Program Modes (Offline & Online 2-Cards)
  const progModes = {
    heading: course.programModes?.heading || `Explore Our Certified ${course.title} Programs`,
    subheading: course.programModes?.subheading || `With over 35,000+ job openings in this sector, this domain is a hotbed for career opportunities. Gyan Time provides the Best ${course.title} Programs, equipping you with Core industry skills in demand to land your dream job.`,
    offline: {
      title: course.programModes?.offline?.title || `Offline ${course.title} & Business Strategy Program`,
      image: course.programModes?.offline?.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      points: Array.isArray(course.programModes?.offline?.points) && course.programModes.offline.points.length > 0
        ? course.programModes.offline.points
        : [
            "Duration: 11 Months",
            "MBA level: Post-Graduate Certification",
            "100% Internship & Job Assistance Guarantee",
            "Preferred by: Fresh graduates, Working professionals (0-3 years of work ex)"
          ],
      brochureUrl: course.programModes?.offline?.brochureUrl || ""
    },
    online: {
      title: course.programModes?.online?.title || `Live & Online ${course.title} Programs`,
      image: course.programModes?.online?.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      points: Array.isArray(course.programModes?.online?.points) && course.programModes.online.points.length > 0
        ? course.programModes.online.points
        : [
            "Duration: 4-6 Months",
            "Advanced/Professional Industry Certification",
            "Dedicated Placement support & mock interview assistance",
            "Preferred by: College students, Working professionals (3+ years of work ex)"
          ],
      brochureUrl: course.programModes?.online?.brochureUrl || ""
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="cd-hero">
        <div className="cd-hero-inner">
          <div className="cd-hero-copy">
            <div className="cd-breadcrumbs">
              <Link to="/courses" className="cd-back"><FiArrowLeft /> All Courses</Link>
              {course.category && (
                <>
                  <span className="cd-crumb-sep">/</span>
                  <span className="cd-eyebrow">{course.category}</span>
                </>
              )}
            </div>
            <h1>{course.title}</h1>
            <div className="cd-long-desc" dangerouslySetInnerHTML={{ __html: course.longDescription || course.description }} />

            <div className="cd-meta-row">
              <div className="cd-meta-badge"><FiClock /> <span>{course.duration}</span></div>
              <div className="cd-meta-badge"><FiLayers /> <span>{course.level}</span></div>
              <div className="cd-meta-badge"><FiMonitor /> <span>{course.mode}</span></div>
            </div>

            <div className="cd-cta-row">
              <div className="cd-fee-box">
                <span className="cd-fee-label">Course Fee</span>
                <strong className="cd-fee-val">{course.fee}</strong>
              </div>
              <Link to="/contact" className="cd-enroll-btn">
                Enroll Now <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="cd-hero-image">
            {course.video ? (
              (() => {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                const match = course.video.match(regExp);
                const ytUrl = match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?rel=0` : null;

                if (ytUrl) {
                  return (
                    <div className="cd-hero-video-wrap">
                      <iframe
                        src={ytUrl}
                        title={course.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="cd-hero-video-frame"
                      />
                    </div>
                  );
                }

                return (
                  <div className="cd-hero-video-wrap">
                    <video
                      controls
                      poster={course.image}
                      playsInline
                      className="cd-hero-video-tag"
                    >
                      <source src={course.video} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              })()
            ) : (
              <img src={course.image} alt={course.title} />
            )}
            <div className="cd-image-badge">
              <FaGraduationCap />
              <div>
                <b>Gyan Time</b>
                <small>Certified Program</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="cd-stats-bar">
        <div className="cd-stats-inner">
          <div><FiUsers /><strong>Expert Faculty</strong><span>Qualified Mentors</span></div>
          <div><FiAward /><strong>Certificate</strong><span>On Completion</span></div>
          <div><FiBriefcase /><strong>Placement Help</strong><span>Career Assistance</span></div>
          <div><FiCheckCircle /><strong>Doubt Support</strong><span>Anytime Sessions</span></div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="cd-body section-shell">
        <div className="cd-main">

          {/* 1. Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <div className="cd-card">
              <h2><FiAward /> Course Highlights</h2>
              <div className="cd-highlights-grid">
                {course.highlights.map((item, i) => (
                  <div key={i} className="cd-highlight-item">
                    <FiCheckCircle />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Course Syllabus (Interactive Dropdown / Accordion Modules) */}
          {parsedSyllabus.length > 0 && (
            <div className="cd-card cd-syllabus-card-wrap">
              <div className="cd-section-title-wrap">
                <div>
                  <span className="cd-sub-eyebrow">CURRICULUM BREAKDOWN</span>
                  <h2><FiBookOpen /> Course Syllabus</h2>
                </div>
                <span className="cd-total-modules-pill">{parsedSyllabus.length} Modules</span>
              </div>
              <p className="cd-section-desc">
                Click on any module to explore the in-depth chapter topics and practical curriculum.
              </p>

              <div className="cd-syllabus-accordion">
                {parsedSyllabus.map((mod, i) => {
                  const isOpen = openSyllabus.includes(i);
                  return (
                    <div key={i} className={`cd-syl-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="cd-syl-header-btn"
                        onClick={() => toggleSyllabus(i)}
                      >
                        <div className="cd-syl-title-group">
                          <span className="cd-syl-num">{String(i + 1).padStart(2, "0")}</span>
                          <span className="cd-syl-title-text">{mod.title}</span>
                          {mod.topics.length > 0 && (
                            <span className="cd-syl-count-tag">{mod.topics.length} Chapters</span>
                          )}
                        </div>
                        <FiChevronDown className={`cd-syl-chevron ${isOpen ? "rotate" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="cd-syl-body">
                          <ul className="cd-syl-topics-list">
                            {mod.topics.map((topic, tIdx) => (
                              <li key={tIdx}>
                                <FiCheckCircle className="syl-check-icon" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Course FAQs Section */}
          <div className="cd-card cd-faqs-card">
            <div className="cd-section-title-wrap">
              <div>
                <span className="cd-sub-eyebrow">COMMON QUESTIONS</span>
                <h2><FiHelpCircle /> Frequently Asked Questions</h2>
              </div>
            </div>
            <p className="cd-section-desc">
              Have questions about batches, fees, curriculum, or career assistance? Here are answers to common queries.
            </p>

            <div className="cd-faqs-accordion">
              {courseFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`cd-faq-item ${openFaq === idx ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="cd-faq-question"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown className={`cd-faq-icon ${openFaq === idx ? "rotate" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="cd-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="cd-sidebar">
          <div className="cd-sidebar-card">
            <h3>Quick Info</h3>
            <ul className="cd-info-list">
              <li><FiClock /><span>Duration</span><b>{course.duration}</b></li>
              <li><FiLayers /><span>Level</span><b>{course.level}</b></li>
              <li><FiMonitor /><span>Mode</span><b>{course.mode}</b></li>
              <li><FiTag /><span>Category</span><b>{course.category}</b></li>
              <li><FiAward /><span>Certificate</span><b>Yes, on Completion</b></li>
            </ul>
            <div className="cd-sidebar-fee">
              <span>Course Fee</span>
              <strong>{course.fee}</strong>
            </div>
            <Link to="/contact" className="cd-enroll-btn">Enroll Now <FiArrowRight /></Link>
          </div>

          <div className="cd-sidebar-card cd-enquiry-card">
            <h3>Have Questions?</h3>
            <p>Talk to our counsellor for more details, batch schedules and admissions.</p>
            <Link to="/contact" className="cd-enquire-btn">Enquire Now <FiArrowRight /></Link>
          </div>
        </aside>
      </section>

      {/* 4. Placed Students Section (Styled matching Screenshot 1) */}
      {displayedStudents.length > 0 && (
        <section className="cd-placed-section-wrap section-shell">
          <div className="cd-full-section-head">
            <div>
              <span className="cd-sub-eyebrow">CAREER OUTCOMES</span>
              <h2>Students Placed in <em>Top Companies</em></h2>
              <p>Our graduates have joined leading tech firms, corporate brands and high-growth startups.</p>
            </div>
            <Link to="/placement-cell" className="cd-more-link">
              View All Placements <FiArrowRight />
            </Link>
          </div>

          <div className="cd-placed-cards-grid">
            {displayedStudents.map((st) => (
              <div className="cd-student-card-v1" key={st._id}>
                {/* Photo Top with soft background */}
                <div className="student-card-photo-box">
                  <img src={st.photo} alt={st.name} className="student-main-photo" />
                </div>

                {/* Content Box */}
                <div className="student-card-body">
                  <h4 className="student-name-text">{st.name}</h4>
                  <span className="student-role-text">{st.role}</span>

                  <div className="student-company-display">
                    {st.companyLogo ? (
                      <img src={st.companyLogo} alt={st.company} className="student-company-logo-img" />
                    ) : (
                      <span className="student-company-brand-name">{st.company}</span>
                    )}
                  </div>

                  <div className="student-footer-row">
                    <span className="student-works-label">{st.worksWithLabel || "Works with:"}</span>
                    <div className="student-works-content">
                      <span>{st.worksWith || st.package || "Top Client Accounts"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Company Logo Marquee ("OUR STUDENTS ARE PLACED IN TOP COMPANIES") */}
      <section className="cd-company-marquee-section">
        <div className="section-shell">
          <h3 className="cd-company-marquee-title">OUR STUDENTS ARE PLACED IN TOP COMPANIES</h3>
        </div>
        <div className="cd-company-marquee-wrapper">
          <div className="cd-company-marquee-track">
            {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, idx) => (
              <div className="cd-company-logo-item" key={idx}>
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5B. Program Formats Section (Offline & Online 2-Cards matching Screenshot 2) */}
      <section className="cd-programs-section-wrap section-shell">
        <div className="cd-programs-head-center">
          <h2>{progModes.heading}</h2>
          <p>{progModes.subheading}</p>
        </div>

        <div className="cd-programs-2col-grid">
          {/* Card 1: Offline Program */}
          <div className="cd-program-card-item">
            <div className="cd-prog-card-image-box">
              <img src={progModes.offline.image} alt={progModes.offline.title} className="cd-prog-card-img" />
            </div>

            <div className="cd-prog-card-content">
              <h3 className="cd-prog-card-title">{progModes.offline.title}</h3>

              <ul className="cd-prog-bullet-list">
                {progModes.offline.points.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <span className="cd-prog-bullet-dot"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="cd-prog-actions-row">
                <a href={`tel:${contactInfo?.phone?.replace(/\s+/g, '') || "+919253010028"}`} className="cd-btn-prog-call">
                  <FiPhone /> Call Now
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenBrochureModal("Offline")}
                  className="cd-btn-prog-download"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Live & Online Program */}
          <div className="cd-program-card-item">
            <div className="cd-prog-card-image-box">
              <img src={progModes.online.image} alt={progModes.online.title} className="cd-prog-card-img" />
            </div>

            <div className="cd-prog-card-content">
              <h3 className="cd-prog-card-title">{progModes.online.title}</h3>

              <ul className="cd-prog-bullet-list">
                {progModes.online.points.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <span className="cd-prog-bullet-dot"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="cd-prog-actions-row">
                <a href={`tel:${contactInfo?.phone?.replace(/\s+/g, '') || "+919253010028"}`} className="cd-btn-prog-call">
                  <FiPhone /> Call Now
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenBrochureModal("Online")}
                  className="cd-btn-prog-download"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mentors Section (Styled matching Screenshot 3) */}
      {mentors.length > 0 && (
        <section className="cd-mentors-section-wrap section-shell">
          <div className="cd-full-section-head">
            <div>
              <span className="cd-sub-eyebrow">EXPERT INSTRUCTORS</span>
              <h2>Meet Your <em>Mentors & Trainers</em></h2>
              <p>Learn directly from seasoned industry professionals with proven real-world track records.</p>
            </div>
          </div>

          <div className="cd-mentors-cards-grid">
            {mentors.map((m) => (
              <div className="cd-mentor-card-v3" key={m._id}>
                {/* Header Container with Custom Teal Background */}
                <div
                  className="mentor-card-header-bg"
                  style={{ backgroundColor: m.bgColor || "#4f8f97" }}
                >
                  <img src={m.photo} alt={m.name} className="mentor-photo-cutout" />
                  
                  {/* Floating Company Pill on bottom-left */}
                  <div className="mentor-floating-company-badge">
                    {m.companyLogo ? (
                      <img src={m.companyLogo} alt={m.company} />
                    ) : (
                      <strong>{m.company || "Industry Lead"}</strong>
                    )}
                  </div>
                </div>

                {/* Body Details */}
                <div className="mentor-card-details">
                  <div className="mentor-name-in-row">
                    <h4>{m.name}</h4>
                    {m.linkedinUrl ? (
                      <a
                        href={m.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="linkedin-badge-btn"
                        title="View LinkedIn Profile"
                      >
                        in
                      </a>
                    ) : (
                      <span className="linkedin-badge-btn">in</span>
                    )}
                  </div>

                  <p className="mentor-bio-headline">
                    {m.role || m.bio}
                  </p>

                  <div className="mentor-experience-footer">
                    <FiBriefcase className="exp-bag-icon" />
                    <span>{m.experience || "10+ Years Exp."}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Courses */}
      {related.length > 0 && (
        <section className="cd-related section-shell">
          <div className="cd-related-head">
            <span>EXPLORE MORE</span>
            <h2>Related <em>Courses</em></h2>
          </div>
          <div className="cd-related-grid">
            {related.map((c) => (
              <article key={c.slug} className="cd-related-card">
                <img src={c.image} alt={c.title} />
                <div className="cd-related-body">
                  <span>{c.category}</span>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="cd-related-tags">
                    <em><FiClock /> {c.duration}</em>
                    <em><FiLayers /> {c.level}</em>
                  </div>
                  <Link to={`/courses/${c.slug}`}>View Course <FiArrowRight /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Brochure Download Modal */}
      {brochureModalOpen && (
        <div className="cd-brochure-modal-backdrop" onClick={() => setBrochureModalOpen(false)}>
          <div className="cd-brochure-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cd-modal-close-btn"
              onClick={() => setBrochureModalOpen(false)}
            >
              &times;
            </button>

            <div className="cd-modal-head-area">
              <span className="cd-modal-badge">{selectedProgramMode} Program</span>
              <h3>Download Course Brochure</h3>
              <p>Get complete curriculum details, batch schedules, syllabus and fee prospectus directly.</p>
            </div>

            {brochureSuccess ? (
              <div className="cd-brochure-success-box">
                <FiCheckCircle className="success-check-icon" />
                <h4>Thank You!</h4>
                <p>Your request has been received. The brochure download will start shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="cd-brochure-form">
                <label>
                  Full Name *
                  <input
                    type="text"
                    required
                    value={brochureForm.name}
                    onChange={(e) => setBrochureForm({ ...brochureForm, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </label>

                <label>
                  Mobile Number *
                  <input
                    type="tel"
                    required
                    value={brochureForm.phone}
                    onChange={(e) => setBrochureForm({ ...brochureForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    value={brochureForm.email}
                    onChange={(e) => setBrochureForm({ ...brochureForm, email: e.target.value })}
                    placeholder="name@example.com"
                  />
                </label>

                <label>
                  City
                  <input
                    type="text"
                    value={brochureForm.city}
                    onChange={(e) => setBrochureForm({ ...brochureForm, city: e.target.value })}
                    placeholder="e.g. Delhi, Mumbai, Lucknow"
                  />
                </label>

                <button type="submit" className="cd-modal-submit-btn" disabled={brochureSubmitting}>
                  {brochureSubmitting ? "Processing..." : "Download Brochure Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

