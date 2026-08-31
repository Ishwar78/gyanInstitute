import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gyan Time API is running",
  });
});

import path from "path";
import { fileURLToPath } from "url";
import inquiryRoutes from "./route/inquiry.route.js";
import homeHeroRoutes from "./route/homeHero.route.js";
import uploadRoutes from "./route/upload.route.js";
import contactInfoRoutes from "./route/contactInfo.route.js";
import galleryRoutes from "./route/gallery.route.js";
import aboutRoutes from "./route/about.route.js";
import courseRoutes from "./route/course.route.js";
import testimonialRoutes from "./route/testimonial.route.js";
import blogRoutes from "./route/blog.route.js";
import categoryRoutes from "./route/category.route.js";
import videoTestimonialRoutes from "./route/videoTestimonial.route.js";
import jobRoutes from "./route/job.route.js";
import jobApplicationRoutes from "./route/jobApplication.route.js";
import placedStudentRoutes from "./route/placedStudent.route.js";
import mentorRoutes from "./route/mentor.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/home-hero", homeHeroRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/video-testimonial", videoTestimonialRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/job-application", jobApplicationRoutes);
app.use("/api/user-details", jobApplicationRoutes);
app.use("/api/placed-student", placedStudentRoutes);
app.use("/api/mentor", mentorRoutes);

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server could not start because MongoDB connection failed.");
    process.exit(1);
  }
};

startServer();