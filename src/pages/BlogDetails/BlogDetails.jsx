import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5005/api/blog/${slug}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setPost(json.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blog post:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "var(--navy)", background: "var(--light-bg)", minHeight: "60vh" }}>
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "var(--navy)", background: "var(--light-bg)", minHeight: "60vh" }}>
        <h2>Article not found</h2>
        <Link to="/blog" style={{ color: "var(--gold)" }}>Go back to blog</Link>
      </div>
    );
  }

  return (
    <article className="blog-details">
      <Helmet>
        <title>{post.metaTitle || `${post.title} - Gyan Time Blog`}</title>
        {post.metaDescription && <meta name="description" content={post.metaDescription} />}
        {post.metaKeywords && <meta name="keywords" content={post.metaKeywords} />}
      </Helmet>

      <section className="details-hero">
        <div className="section-shell">
          <Link className="back-link" to="/blog"><FiArrowLeft /> Back to Blog</Link>
          <span className="eyebrow">ARTICLE</span>
          <h1>{post.title}</h1>
          <div className="details-meta">
            <span><FiCalendar /> {new Date(post.publishDate).toLocaleDateString()}</span>
            <span><FiUser /> {post.author}</span>
          </div>
        </div>
      </section>

      <section className="details-content">
        <div className="section-shell details-layout">
          <main>
            <img className="details-cover" src={post.image} alt={post.title} />
            
            <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="details-bottom">
              <Link to="/courses">Explore Our Courses →</Link>
              <Link to="/contact">Ask for Guidance →</Link>
            </div>
          </main>
          <aside>
            <div className="details-sidebar-card">
              <span className="eyebrow">GYAN Time</span>
              <h3>Learn. Grow. Succeed.</h3>
              <p>Get course guidance, admission support and practical learning designed around student goals.</p>
              <Link to="/contact">Contact Us →</Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
