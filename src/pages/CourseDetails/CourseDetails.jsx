import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, FiClock, FiLayers, FiMonitor, FiTag, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch single course
    fetch(`http://localhost:5005/api/course/${slug}`)
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setCourse(json.data);
          // Fetch related courses
          fetch("http://localhost:5005/api/course")
            .then(res => res.json())
            .then(allJson => {
              if (allJson.success) {
                const others = allJson.data.filter(c => c.slug !== slug && c.category === json.data.category && c.status !== "Draft");
                setRelated(others.slice(0, 2));
              }
            });
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error("Failed to load course details:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <>
      {/* Hero */}
      <section className="cd-hero">
        <div className="cd-hero-inner">
          <div className="cd-hero-copy">
            <Link to="/courses" className="cd-back"><FiArrowLeft /> All Courses</Link>
            <span className="cd-eyebrow">{course.category}</span>
            <h1>{course.title}</h1>
            <div className="cd-long-desc" dangerouslySetInnerHTML={{ __html: course.longDescription }} />

            <div className="cd-meta-row">
              <div className="cd-meta-badge"><FiClock /> <span>{course.duration}</span></div>
              <div className="cd-meta-badge"><FiLayers /> <span>{course.level}</span></div>
              <div className="cd-meta-badge"><FiMonitor /> <span>{course.mode}</span></div>
            </div>

            <div className="cd-cta-row">
              <Link to="/contact" className="cd-enroll-btn">Enroll Now <FiArrowRight /></Link>
              <div className="cd-fee-box">
                <span>Course Fee</span>
                <strong>{course.fee}</strong>
              </div>
            </div>
          </div>

          <div className="cd-hero-image">
            <img src={course.image} alt={course.title} />
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

      {/* Main Content */}
      <section className="cd-body section-shell">
        <div className="cd-main">

          {/* Highlights */}
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

          {/* Syllabus */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="cd-card">
              <h2><FiBookOpen /> Course Syllabus</h2>
              <div className="cd-syllabus-list">
                {course.syllabus.map((item, i) => (
                  <div key={i} className="cd-syllabus-item">
                    <span className="cd-syllabus-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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

      {/* CTA */}
      {/* <section className="cd-cta">
        <div className="section-shell cd-cta-inner">
          <div>
            <FaGraduationCap />
            <div>
              <span>ADMISSIONS OPEN 2026</span>
              <h2>Start Learning Today at Gyan Time</h2>
              <p>Enroll now and take the first step towards your successful career.</p>
            </div>
          </div>
          <Link to="/contact" className="cd-enroll-btn">Enquire Now <FiArrowRight /></Link>
        </div>
      </section> */}
    </>
  );
}
