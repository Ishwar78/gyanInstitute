import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCamera, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import "./Gallery.css";

const filters = ["All", "Campus", "Classroom", "Students", "Events", "Activities"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:5005/api/gallery");
      const json = await res.json();
      if (json.success) {
        setGalleryImages(json.data);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  const visible = galleryImages.filter((img) => filter === "All" || img.label === filter || (filter === "Students" && ["Students","Activities"].includes(img.label)) || (filter === "Events" && ["Seminar","Achievement","Workshop"].includes(img.label)) || (filter === "Campus" && ["Campus","Library"].includes(img.label)) || (filter === "Classroom" && ["Classroom","Computer Lab"].includes(img.label)));

  return (
    <>
      <section className="gallery-hero">
        <div className="gallery-hero-inner">
          <div><span>OUR GALLERY</span><h1>Life at <em>Gyan Time</em></h1><p>A glimpse of campus life, learning, events and opportunities where students grow together.</p></div>
          <div className="camera-card"><FiCamera /><div><b>Campus Stories</b><small>Learn • Grow • Achieve</small></div></div>
        </div>
      </section>

      <section className="gallery-page section-shell">
        <div className="gallery-tabs">
          {filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}
        </div>

        {loading ? (
          <div style={{textAlign: "center", padding: "3rem"}}>Loading gallery...</div>
        ) : (
          <>
            <div className="gallery-grid-large">
              {visible.map((img) => <figure key={img._id}><img src={img.image} alt={img.label} /><figcaption><span>{img.label}</span><b>Gyan Time</b></figcaption></figure>)}
            </div>

            <div className="gallery-count"><FiCheckCircle /> Showing {visible.length} moments from our campus life</div>
          </>
        )}
      </section>

      <section className="gallery-stats">
        <div className="section-shell gallery-stat-inner">
          <div><strong>15+</strong><span>Years of Excellence</span></div>
          <div><strong>2500+</strong><span>Happy Students</span></div>
          <div><strong>100+</strong><span>Expert Faculty</span></div>
          <div><strong>50+</strong><span>Courses Offered</span></div>
          <div><strong>20+</strong><span>Awards Won</span></div>
        </div>
      </section>

      <section className="gallery-cta">
        <div className="section-shell"><div><span>BE A PART OF OUR STORY</span><h2>See Yourself Growing at Gyan Time</h2><p>Explore our courses and take the first step towards your goals.</p></div><Link to="/contact" className="primary-btn">Enquire Now <FiArrowRight /></Link></div>
      </section>
    </>
  );
}
