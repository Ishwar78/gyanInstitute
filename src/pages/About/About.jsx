import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiBookOpen, FiCheckCircle, FiHeart, FiTarget, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import "./About.css";

const values = [
  ["Student First", "Every learning decision starts with the student's growth and confidence.", FiUsers],
  ["Quality Education", "Strong concepts, practical exposure and experienced mentors.", FiBookOpen],
  ["Career Focus", "We help students turn knowledge into real career opportunities.", FiTarget],
  ["Integrity", "Transparent guidance, supportive culture and responsible mentoring.", FiHeart]
];

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner">
          <div>
            <span>ABOUT US</span>
            <h1>Welcome to <em>Gyan Institute</em></h1>
            <p>Where learning meets opportunity, confidence and a clear path towards success.</p>
          </div>
          <div className="about-hero-image">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=85" alt="Gyan Institute campus" />
          </div>
        </div>
      </section>

      <section className="about-intro section-shell">
        <div className="about-intro-copy">
          <span>WHO WE ARE</span>
          <h2>Building Strong Foundations for <em>Bright Futures</em></h2>
          <p>Gyan Institute was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals.</p>
          <p>Our approach combines experienced faculty, modern infrastructure, practical learning and individual guidance. Whether a student is preparing for an examination, learning technology or developing professional skills, our goal is to make the journey structured and meaningful.</p>
          <ul>
            <li><FiCheckCircle /> Experienced & Dedicated Faculty</li>
            <li><FiCheckCircle /> Modern Infrastructure & Smart Classrooms</li>
            <li><FiCheckCircle /> Student-Centric Learning Approach</li>
            <li><FiCheckCircle /> Regular Assessments & Mentoring</li>
          </ul>
        </div>
        <div className="about-intro-visual">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85" alt="Students learning" />
          <div className="about-float-card"><strong>15+</strong><span>Years of Excellence</span></div>
        </div>
      </section>

      <section className="about-values" id="facilities">
        <div className="section-shell">
          <div className="about-section-title"><span>OUR CORE VALUES</span><h2>What Makes <em>Gyan Different?</em></h2><p>A learning environment designed around quality, consistency and student success.</p></div>
          <div className="values-grid">
            {values.map(([title, text, Icon]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="about-facilities section-shell">
        <div className="facility-images">
          <img className="facility-main" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85" alt="Computer lab" />
          <img className="facility-small" src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=85" alt="Classroom" />
        </div>
        <div className="facility-copy">
          <span>OUR FACILITIES</span>
          <h2>Modern Spaces for <em>Better Learning</em></h2>
          <p>Our classrooms and learning spaces are designed to support focused study, collaboration and practical learning.</p>
          <div className="facility-list">
            {["Smart Classrooms", "Computer & Practical Labs", "Study & Doubt Support", "Seminar & Workshop Spaces", "Learning Resources", "Comfortable Student Environment"].map((item) => <div key={item}><FiCheckCircle />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="section-shell about-stat-grid">
          <div><FaGraduationCap /><strong>2500+</strong><span>Happy Students</span></div>
          <div><FiUsers /><strong>100+</strong><span>Expert Faculty</span></div>
          <div><FiBookOpen /><strong>50+</strong><span>Courses</span></div>
          <div><FiAward /><strong>98%</strong><span>Success Rate</span></div>
        </div>
      </section>

      <section className="about-cta">
        <div className="section-shell">
          <div><span>START YOUR JOURNEY</span><h2>Learn Today. Lead Tomorrow.</h2><p>Explore our courses and find the right learning path for your goals.</p></div>
          <Link to="/courses" className="primary-btn">Explore Courses <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
