import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCamera, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { galleryImages } from "../../data/siteData";
import "./Gallery.css";

const filters = ["All", "Campus", "Classroom", "Students", "Events", "Activities"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");

  const visible = galleryImages.filter(([label]) => filter === "All" || label === filter || (filter === "Students" && ["Students","Activities"].includes(label)) || (filter === "Events" && ["Seminar","Achievement","Workshop"].includes(label)) || (filter === "Campus" && ["Campus","Library"].includes(label)) || (filter === "Classroom" && ["Classroom","Computer Lab"].includes(label)));

  return (
    <>
      <section className="gallery-hero">
        <div className="gallery-hero-inner">
          <div><span>OUR GALLERY</span><h1>Life at <em>Gyan Institute</em></h1><p>A glimpse of campus life, learning, events and opportunities where students grow together.</p></div>
          <div className="camera-card"><FiCamera /><div><b>Campus Stories</b><small>Learn • Grow • Achieve</small></div></div>
        </div>
      </section>

      <section className="gallery-page section-shell">
        <div className="gallery-tabs">
          {filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}
        </div>

        <div className="gallery-grid-large">
          {visible.map(([label, image]) => <figure key={`${label}-${image}`}><img src={image} alt={label} /><figcaption><span>{label}</span><b>Gyan Institute</b></figcaption></figure>)}
        </div>

        <div className="gallery-count"><FiCheckCircle /> Showing {visible.length} moments from our campus life</div>
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
        <div className="section-shell"><div><span>BE A PART OF OUR STORY</span><h2>See Yourself Growing at Gyan Institute</h2><p>Explore our courses and take the first step towards your goals.</p></div><Link to="/contact" className="primary-btn">Enquire Now <FiArrowRight /></Link></div>
      </section>
    </>
  );
}
