import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCamera,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import "./Gallery.css";

const filters = [
  "All",
  "Campus",
  "Classroom",
  "Students",
  "Events",
  "Activities",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("http://localhost:5005/api/gallery");
      const json = await res.json();

      if (json.success) {
        setGalleryImages(json.data || []);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  const visible = useMemo(() => {
    return galleryImages.filter(
      (img) =>
        filter === "All" ||
        img.label === filter ||
        (filter === "Students" &&
          ["Students", "Activities"].includes(img.label)) ||
        (filter === "Events" &&
          ["Seminar", "Achievement", "Workshop"].includes(img.label)) ||
        (filter === "Campus" &&
          ["Campus", "Library"].includes(img.label)) ||
        (filter === "Classroom" &&
          ["Classroom", "Computer Lab"].includes(img.label))
    );
  }, [galleryImages, filter]);

  const selectedImage =
    selectedIndex !== null ? visible[selectedIndex] : null;

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? visible.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === visible.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, visible.length]);

  return (
    <>
      {/* =====================================================
          GALLERY HERO
      ====================================================== */}
      <section className="gallery-hero">
        <div className="gallery-hero-glow gallery-glow-one"></div>
        <div className="gallery-hero-glow gallery-glow-two"></div>

        <div className="gallery-hero-inner">

          <div className="gallery-hero-content">

            <div className="gallery-kicker">
              <span className="kicker-line"></span>
              <span>Our Gallery</span>
            </div>

            <h1>
              Moments That
              <br />
              <em>Tell Our Story.</em>
            </h1>

            <p>
              Explore the vibrant world of Gyan Time — from classrooms and
              campus life to events, achievements and unforgettable student
              moments.
            </p>

            <div className="gallery-hero-bottom">

              <div className="gallery-mini-stat">
                <strong>{galleryImages.length}+</strong>
                <span>Moments</span>
              </div>

              <div className="hero-stat-divider"></div>

              <div className="gallery-mini-stat">
                <strong>06</strong>
                <span>Categories</span>
              </div>

              <div className="hero-stat-divider"></div>

              <div className="gallery-mini-stat">
                <strong>01</strong>
                <span>Community</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}
          <div className="gallery-hero-visual">

            <div className="hero-visual-ring"></div>

            <div className="hero-photo hero-photo-back">
              {galleryImages[1]?.image ? (
                <img
                  src={galleryImages[1].image}
                  alt={galleryImages[1].label || "Gyan Time"}
                />
              ) : (
                <div className="hero-empty-photo">
                  <FiCamera />
                </div>
              )}
            </div>

            <div className="hero-photo hero-photo-main">
              {galleryImages[0]?.image ? (
                <img
                  src={galleryImages[0].image}
                  alt={galleryImages[0].label || "Gyan Time"}
                />
              ) : (
                <div className="hero-empty-photo">
                  <FiCamera />
                </div>
              )}

              <div className="hero-photo-overlay"></div>

              <div className="hero-photo-info">
                <span>Gyan Time</span>
                <strong>Life. Learning. Growth.</strong>
              </div>
            </div>

            <div className="hero-camera-badge">
              <span>
                <FiCamera />
              </span>

              <div>
                <strong>Campus Stories</strong>
                <small>Captured moments</small>
              </div>
            </div>

            <div className="hero-floating-dot"></div>

          </div>
        </div>
      </section>


      {/* =====================================================
          GALLERY CONTENT
      ====================================================== */}
      <main className="gallery-page">

        <div className="section-shell">

          {/* SECTION TOP */}
          <div className="gallery-content-head">

            <div>
              <span className="gallery-section-label">
                <span></span>
                Explore Our World
              </span>

              <h2>
                Life at <em>Gyan Time</em>
              </h2>

              <p>
                A visual journey through the people, places and experiences
                that make our institute special.
              </p>
            </div>

            <div className="gallery-result-box">
              <strong>{visible.length}</strong>
              <span>
                {visible.length === 1 ? "Moment" : "Moments"}
                <br />
                displayed
              </span>
            </div>

          </div>


          {/* FILTERS */}
          <div className="gallery-filter-wrap">

            <div className="gallery-tabs">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={filter === item ? "active" : ""}
                  onClick={() => {
                    setFilter(item);
                    setSelectedIndex(null);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>


          {/* LOADING */}
          {loading ? (
            <div className="gallery-loading">

              <div className="gallery-loader"></div>

              <strong>Loading moments...</strong>

              <span>
                Bringing campus stories to life
              </span>

            </div>
          ) : visible.length === 0 ? (

            /* EMPTY */
            <div className="gallery-empty">

              <div className="empty-icon">
                <FiCamera />
              </div>

              <h3>No moments found</h3>

              <p>
                There are no gallery images available in this category yet.
              </p>

              <button
                type="button"
                onClick={() => setFilter("All")}
              >
                View All Moments
              </button>

            </div>

          ) : (

            <>
              {/* =================================================
                  MASONRY GALLERY
              ================================================== */}
              <div className="gallery-masonry">

                {visible.map((img, index) => (
                  <figure
                    className={`gallery-item gallery-item-${index % 7}`}
                    key={img._id || index}
                    onClick={() => openLightbox(index)}
                  >

                    <img
                      src={img.image}
                      alt={img.label || "Gyan Time gallery"}
                      loading="lazy"
                    />

                    <div className="gallery-item-shade"></div>

                    <div className="gallery-item-top">
                      <span className="gallery-category">
                        {img.label || "Campus"}
                      </span>

                      <span className="gallery-expand">
                        <FiExternalLink />
                      </span>
                    </div>

                    <figcaption>

                      <div>
                        <small>GYAN TIME</small>

                        <strong>
                          {img.label || "Campus Moment"}
                        </strong>
                      </div>

                      <span className="gallery-arrow">
                        <FiArrowRight />
                      </span>

                    </figcaption>

                  </figure>
                ))}

              </div>


              {/* COUNT */}
              <div className="gallery-count">
                <span className="count-check">
                  <FiCheckCircle />
                </span>

                Showing
                <strong>{visible.length}</strong>
                {visible.length === 1 ? "moment" : "moments"}
                from our campus life
              </div>
            </>
          )}

        </div>
      </main>


      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="gallery-stats">

        <div className="gallery-stats-pattern"></div>

        <div className="section-shell gallery-stat-inner">

          <div className="gallery-stat">
            <strong>15<span>+</span></strong>
            <small>Years of Excellence</small>
          </div>

          <div className="gallery-stat">
            <strong>2500<span>+</span></strong>
            <small>Happy Students</small>
          </div>

          <div className="gallery-stat">
            <strong>50<span>+</span></strong>
            <small>Courses Offered</small>
          </div>

          <div className="gallery-stat">
            <strong>20<span>+</span></strong>
            <small>Awards Won</small>
          </div>

        </div>
      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="gallery-cta">

        <div className="section-shell gallery-cta-box">

          <div className="cta-decoration"></div>

          <div className="gallery-cta-copy">

            <span>
              BE PART OF THE NEXT MOMENT
            </span>

            <h2>
              Your Story Could Be
              <em> Here.</em>
            </h2>

            <p>
              Start your journey with Gyan Time and create moments worth
              remembering.
            </p>

          </div>

          <Link
            to="/contact"
            className="gallery-cta-button"
          >
            <span>Enquire Now</span>
            <FiArrowRight />
          </Link>

        </div>

      </section>


      {/* =====================================================
          LIGHTBOX
      ====================================================== */}
      {selectedImage && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
        >

          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <FiX />
          </button>


          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            <FiChevronLeft />
          </button>


          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="lightbox-image-wrap">

              <img
                src={selectedImage.image}
                alt={selectedImage.label || "Gyan Time gallery"}
              />

              <div className="lightbox-image-number">
                {(selectedIndex ?? 0) + 1} / {visible.length}
              </div>

            </div>

            <div className="lightbox-info">

              <div>
                <span>
                  {selectedImage.label || "Campus"}
                </span>

                <strong>
                  Gyan Time
                </strong>
              </div>

              <small>
                Use ← → to navigate
              </small>

            </div>

          </div>


          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            <FiChevronRight />
          </button>

        </div>
      )}
    </>
  );
}