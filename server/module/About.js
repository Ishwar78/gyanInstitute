import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  eyebrow: { type: String, default: "ABOUT US" },
  heading: { type: String, default: "Welcome to Gyan Time" },
  introduction: { type: String, default: "Gyan Time was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals." },
  missionStatement: { type: String, default: "We believe in empowering young minds with the right knowledge, skills and values to excel in life. Our experienced faculty, modern infrastructure and student-centric approach make us one of the top Times in the region." },
  highlights: { 
    type: [String], 
    default: ["Experienced Faculty", "Modern Infrastructure", "Student Centric Approach", "Proven Results"] 
  }
}, { timestamps: true });

const About = mongoose.model("About", aboutSchema);
export default About;
