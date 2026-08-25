import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Courses from "./pages/Courses/Courses";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout";
import AdminOverview from "./pages/Admin/AdminOverview/AdminOverview";
import AdminCourses from "./pages/Admin/AdminCourses/AdminCourses";
import AdminContactInfo from "./pages/Admin/AdminContactInfo/AdminContactInfo";
import AdminInquiries from "./pages/Admin/AdminInquiries/AdminInquiries";
import AdminBlog from "./pages/Admin/AdminBlog/AdminBlog";
import AdminHomeHero from "./pages/Admin/AdminHomeHero/AdminHomeHero";
import AdminAbout from "./pages/Admin/AdminAbout/AdminAbout";

function PublicLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="contact-info" element={<AdminContactInfo />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="home-hero" element={<AdminHomeHero />} />
        <Route path="about" element={<AdminAbout />} />
      </Route>

      <Route path="*" element={
        <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
          </Routes>
        </PublicLayout>
      } />
    </Routes>
  );
}
