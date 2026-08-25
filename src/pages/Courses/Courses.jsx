import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, FiFilter, FiSearch, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { courses } from "../../data/siteData";
import "./Courses.css";

const categories = ["All Courses", "Computer Courses", "Competitive Exams", "Academic Courses", "Professional Courses", "Language Courses", "Personality Development"];

export default function Courses() {
  const [category, setCategory] = useState("All Courses");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => courses.filter((c) => {
    const cat = category === "All Courses" || c.category === category;
    const text = `${c.title} ${c.description}`.toLowerCase();
    return cat && text.includes(query.toLowerCase());
  }), [category, query]);

  return (
    <>
      <section className="courses-hero">
        <div className="courses-hero-inner">
          <div>
            <span>OUR COURSES</span>
            <h1>Courses Designed for<br /><em>Your Success</em></h1>
            <p>Career-oriented programs designed to build skills, boost confidence and shape a successful future.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85" alt="Students learning" />
        </div>
        <div className="courses-hero-stats">
          <div><FiBookOpen /><strong>50+</strong><span>Courses Offered</span></div>
          <div><FiUsers /><strong>15+</strong><span>Expert Faculty</span></div>
          <div><FaGraduationCap /><strong>2500+</strong><span>Happy Students</span></div>
          <div><FiAward /><strong>98%</strong><span>Success Rate</span></div>
        </div>
      </section>

      <section className="courses-browser section-shell">
        <aside className="course-filter">
          <h3><FiFilter /> Find Your Course</h3>
          <div className="course-search"><FiSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses..." /></div>
          <h4>Filter by Category</h4>
          <div className="category-list">
            {categories.map((item) => <button className={category === item ? "selected" : ""} onClick={() => setCategory(item)} key={item}>{item}<span>{item === "All Courses" ? "50+" : ""}</span></button>)}
          </div>
          <h4>Course Level</h4>
          {["Beginner", "Intermediate", "Advanced"].map((x) => <label key={x}><input type="checkbox" /> {x}</label>)}
          <h4>Course Mode</h4>
          {["Online", "Offline", "Hybrid"].map((x) => <label key={x}><input type="checkbox" /> {x}</label>)}
          <button className="apply-filter">Apply Filters <FiFilter /></button>
        </aside>

        <div className="course-results">
          <div className="course-results-head">
            <div><span>LEARNING PROGRAMS</span><h2>Explore All Courses</h2><p>Choose from our range of industry-focused courses and start your journey towards a brighter future.</p></div>
            <select aria-label="Sort courses"><option>Popularity</option><option>Newest</option><option>Duration</option></select>
          </div>

          {filtered.length === 0 && <div className="no-results">No courses found. Try another search or category.</div>}

          {filtered.map((course) => (
            <article className="course-row" key={course.title}>
              <img src={course.image} alt={course.title} />
              <div className="course-row-main">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-tags"><span>{course.level}</span><span>{course.duration}</span><span>Offline / Online</span></div>
              </div>
              <div className="course-benefits">
                <span><FiUsers /> Expert Faculty</span>
                <span><FiBriefcase /> Practical Learning</span>
                <span><FiCheckCircle /> Certification</span>
                <Link to="/contact">View Details <FiArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="courses-quality">
        <div className="section-shell quality-inner">
          <div><span>WHY CHOOSE OUR COURSES</span><h2>Quality Education. <em>Better Future.</em></h2></div>
          <div><article><FiBookOpen /><b>Industry-Oriented Curriculum</b><small>Designed around practical skills.</small></article><article><FiUsers /><b>Experienced Faculty</b><small>Learn from qualified mentors.</small></article><article><FiBriefcase /><b>Practical Learning</b><small>Hands-on projects and activities.</small></article><article><FiAward /><b>Placement Assistance</b><small>Guidance for your career.</small></article></div>
        </div>
      </section>

      <section className="course-categories section-shell">
        <div className="center-title"><span>POPULAR CATEGORIES</span><h2>Browse Courses by <em>Category</em></h2></div>
        <div className="category-cards">
          {categories.slice(1).map((item, index) => <div key={item}><span className={`category-icon icon-${index}`}><FiBookOpen /></span><h3>{item}</h3><small>{index + 6} Courses</small><p>Build knowledge, practical skills and confidence.</p><Link to="/courses">Explore <FiArrowRight /></Link></div>)}
        </div>
      </section>

      <section className="courses-cta">
        <div className="section-shell"><div><FaGraduationCap /><div><span>ADMISSIONS OPEN 2026</span><h2>Ready to Start Your Journey?</h2><p>Join Gyan Institute and take the next step towards your bright future.</p></div></div><Link to="/contact" className="primary-btn">Enquire Now <FiArrowRight /></Link></div>
      </section>
    </>
  );
}
