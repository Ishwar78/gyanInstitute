import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import "./Blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/api/blog")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setPosts(json.data.filter(b => b.status !== "Draft"));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog - Gyan Time</title>
        <meta name="description" content="Career guidance, study strategies, education updates and practical advice for students building a brighter future." />
        <meta name="keywords" content="education blog, study tips, career guidance, gyan Time" />
      </Helmet>

      <section className="blog-hero">
        <div className="section-shell blog-hero-grid">
          <div>
            <span className="eyebrow">GYAN Time BLOG</span>
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

          {loading ? (
            <p style={{ padding: "40px 0", color: "var(--muted)" }}>Loading articles...</p>
          ) : posts.length === 0 ? (
            <p style={{ padding: "40px 0", color: "var(--muted)" }}>No articles found.</p>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <article className="blog-card" key={post.slug}>
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span><FiCalendar /> {new Date(post.publishDate).toLocaleDateString()}</span>
                      <span><FiUser /> {post.author}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <Link to={`/blog/${post.slug}`}>Read Article <FiArrowRight /></Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
