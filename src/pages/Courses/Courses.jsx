import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight, FiCheckCircle, FiBriefcase,
  FiUsers, FiFilter, FiSearch, FiBookOpen
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./Courses.css";

export default function Courses() {
  const [filter, setFilter] = useState("All Courses");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState(["All Courses"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5005/api/course").then(res => res.json()),
      fetch("http://localhost:5005/api/category").then(res => res.json())
    ]).then(([courseRes, categoryRes]) => {
      if (courseRes.success) setCourses(courseRes.data.filter(c => c.status !== "Draft"));
      if (categoryRes.success) {
        const activeCats = categoryRes.data.filter(c => c.status !== "Draft").map(c => c.name);
        setCategories(["All Courses", ...activeCats]);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load data:", err);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "All Courses"
    ? courses
    : courses.filter(c => c.category === filter);

  return (
    <div className="courses-page">

      {/* ── Hero ── */}
      <section className="courses-hero">
        <div className="courses-hero-inner">
          <div>
            <span>OUR PROGRAMS</span>
            <h1>Shape Your Future with <em>Gyan Time</em></h1>
            <p>From foundational computer skills to advanced competitive exam preparation, we offer courses designed to make you successful.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
            alt="Students learning"
          />
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="courses-hero-stats">
        <div><strong>15+</strong><span>Expert Faculty</span></div>
        <div><strong>5000+</strong><span>Students Taught</span></div>
        <div><strong>100%</strong><span>Practical Training</span></div>
        <div><strong>20+</strong><span>Professional Courses</span></div>
      </div>

      {/* ── Browser ── */}
      <section className="courses-browser section-shell">

        {/* Sidebar filter */}
        <aside className="course-filter">
          <h3><FiFilter /> Filters</h3>
          <div className="course-search">
            <FiSearch />
            <input placeholder="Search courses..." />
          </div>
          <h4>Categories</h4>
          <div className="category-list">
            {categories.map(cat => (
              <button
                key={cat}
                className={filter === cat ? "selected" : ""}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="apply-filter"><FiFilter /> Apply Filter</button>
        </aside>

        {/* Results */}
        <div>
          <div className="course-results-head">
            <div>
              <span>COURSES</span>
              <h2>
                {filter === "All Courses" ? <>All <em>Courses</em></> : <em>{filter}</em>}
              </h2>
              <p>{filtered.length} course{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
            <select>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Duration</option>
            </select>
          </div>

          {loading ? (
            <p style={{ color: "var(--muted)", padding: "30px 0" }}>Loading courses...</p>
          ) : filtered.length === 0 ? (
            <div className="no-results">No courses found in this category.</div>
          ) : (
            filtered.map(course => (
              <article className="course-row" key={course._id}>
                <img src={course.image} alt={course.title} />

                <div className="course-row-main">
                  <h3>{course.title}</h3>
                  <div className="course-card-desc" dangerouslySetInnerHTML={{ __html: course.description }} />
                  <div className="course-tags">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                    <span>{course.mode}</span>
                  </div>
                </div>

                <div className="course-benefits">
                  <span><FiUsers /> Expert Faculty</span>
                  <span><FiBriefcase /> Practical Learning</span>
                  <span><FiCheckCircle /> Certification</span>
                  <Link to={`/courses/${course.slug}`}>
                    View Details <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* ── Quality strip ── */}
      <section className="courses-quality">
        <div className="quality-inner section-shell">
          <div>
            <span>WHY CHOOSE US</span>
            <h2>Quality <em>Education</em> You Can Trust</h2>
          </div>
          <div>
            <article>
              <FiCheckCircle />
              <b>Industry Curriculum</b>
              <small>Updated syllabus matching current standards.</small>
            </article>
            <article>
              <FiUsers />
              <b>Expert Mentors</b>
              <small>Professionals with years of experience.</small>
            </article>
            <article>
              <FiBriefcase />
              <b>Career Assistance</b>
              <small>Placement support and resume guidance.</small>
            </article>
            <article>
              <FaGraduationCap />
              <b>Certification</b>
              <small>Recognised certificates on completion.</small>
            </article>
          </div>
        </div>
      </section>

      {/* ── Popular Categories ── */}
      <section className="course-categories section-shell">
        <div className="center-title">
          <span>POPULAR CATEGORIES</span>
          <h2>Browse Courses by <em>Category</em></h2>
        </div>
        <div className="category-cards">
          {categories.filter(c => c !== "All Courses").map((item, index) => (
            <div key={item}>
              <span className={`category-icon icon-${index}`}><FiBookOpen /></span>
              <h3>{item}</h3>
              <small>{index + 6} Courses</small>
              <p>Build knowledge, practical skills and confidence.</p>
              <Link to="/courses" onClick={() => {
                setFilter(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>Explore <FiArrowRight /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      {/* <section className="courses-cta">
        <div className="section-shell">
          <div>
            <FaGraduationCap />
            <div>
              <span>ADMISSIONS OPEN 2026</span>
              <h2>Ready to Start Your Journey?</h2>
              <p>Join Gyan Time and take the next step towards your bright future.</p>
            </div>
          </div>
          <Link to="/contact" className="primary-btn">
            Enquire Now <FiArrowRight />
          </Link>
        </div>
      </section> */}

    </div>
  );
}
