import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import "./Blog.css";

const posts = [
  {
    slug: "how-to-choose-right-career-course",
    title: "How to Choose the Right Career Course After School",
    category: "Career Guidance",
    date: "August 18, 2026",
    author: "Gyan Institute Team",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    excerpt: "A practical guide to compare your interests, strengths, career goals and course outcomes before making an important education decision."
  },
  {
    slug: "smart-study-habits-for-exams",
    title: "7 Smart Study Habits That Improve Exam Preparation",
    category: "Study Tips",
    date: "August 12, 2026",
    author: "Academic Team",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Build a consistent study routine with realistic targets, active recall, revision blocks and healthy breaks."
  },
  {
    slug: "skills-that-make-you-job-ready",
    title: "Skills That Can Make Students More Job-Ready",
    category: "Career",
    date: "August 05, 2026",
    author: "Placement Team",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Technical ability matters, but communication, teamwork, problem solving and practical exposure can make a major difference."
  },
  {
    slug: "why-practical-learning-matters",
    title: "Why Practical Learning Matters in Modern Education",
    category: "Education",
    date: "July 28, 2026",
    author: "Gyan Institute Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    excerpt: "See how hands-on projects and guided practice can turn classroom concepts into useful, confident skills."
  }
];

export default function Blog() {
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="section-shell blog-hero-grid">
          <div>
            <span className="eyebrow">GYAN INSTITUTE BLOG</span>
            <h1 className="page-title">Ideas That Help You <span className="gold">Learn & Grow</span></h1>
            <p>Career guidance, study strategies, education updates and practical advice for students building a brighter future.</p>
          </div>
          <div className="blog-hero-image">
            <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85" alt="Students studying" />
          </div>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="section-shell">
          <div className="blog-section-heading">
            <div>
              <span className="eyebrow">LATEST ARTICLES</span>
              <h2 className="section-title">From Our <span className="gold">Learning Desk</span></h2>
            </div>
            <p>Useful insights written in a simple, student-friendly way.</p>
          </div>

          <div className="blog-grid">
            {posts.map(post => (
              <article className="blog-card" key={post.slug}>
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                  <span>{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span><FiCalendar /> {post.date}</span>
                    <span><FiUser /> {post.author}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`}>Read Article <FiArrowRight /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="blog-cta">
        <div className="section-shell">
          <div>
            <span className="eyebrow">NEED GUIDANCE?</span>
            <h2>Let's Plan Your <span className="gold">Next Step</span></h2>
            <p>Talk to our academic team for course and admission guidance.</p>
          </div>
          <Link to="/contact">Talk to an Expert <FiArrowRight /></Link>
        </div>
      </section> */}
    </div>
  );
}
