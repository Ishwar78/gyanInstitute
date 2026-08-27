import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";

import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import AdminOverview from "./pages/Admin/AdminOverview/AdminOverview";
import AdminCourses from "./pages/Admin/AdminCourses/AdminCourses";
import AdminContactInfo from "./pages/Admin/AdminContactInfo/AdminContactInfo";
import AdminInquiries from "./pages/Admin/AdminInquiries/AdminInquiries";
import AdminBlog from "./pages/Admin/AdminBlog/AdminBlog";
import AdminHomeHero from "./pages/Admin/AdminHomeHero/AdminHomeHero";
import AdminAbout from "./pages/Admin/AdminAbout/AdminAbout";
import AdminGallery from "./pages/Admin/AdminGallery/AdminGallery";
import AdminTestimonials from "./pages/Admin/AdminTestimonials/AdminTestimonials";
import AdminCategories from "./pages/Admin/AdminCategories/AdminCategories";

// ===============================
// Scroll To Top
// ===============================
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}


// ===============================
// Public Layout
// ===============================
function PublicLayout({ children }) {
  return (
    <div className="app">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}


// ===============================
// App
// ===============================
export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminOverview />}
          />

          <Route
            path="overview"
            element={<AdminOverview />}
          />

          <Route
            path="courses"
            element={<AdminCourses />}
          />

          <Route
            path="contact-info"
            element={<AdminContactInfo />}
          />

          <Route
            path="inquiries"
            element={<AdminInquiries />}
          />

          <Route
            path="blog"
            element={<AdminBlog />}
          />

          <Route
            path="home-hero"
            element={<AdminHomeHero />}
          />

          <Route
            path="about"
            element={<AdminAbout />}
          />

          <Route
            path="gallery"
            element={<AdminGallery />}
          />

          <Route
            path="testimonials"
            element={<AdminTestimonials />}
          />
          <Route
            path="categories"
            element={<AdminCategories />}
          />
        </Route>


        {/* ================= PUBLIC WEBSITE ================= */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <Routes>

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/courses"
                  element={<Courses />}
                />

                <Route
                  path="/courses/:slug"
                  element={<CourseDetails />}
                />

                <Route
                  path="/gallery"
                  element={<Gallery />}
                />

                <Route
                  path="/contact"
                  element={<Contact />}
                />

                <Route
                  path="/blog"
                  element={<Blog />}
                />

                <Route
                  path="/blog/:slug"
                  element={<BlogDetails />}
                />

                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicy />}
                />

                <Route
                  path="/terms-conditions"
                  element={<TermsConditions />}
                />

              </Routes>
            </PublicLayout>
          }
        />

      </Routes>
    </>
  );
}