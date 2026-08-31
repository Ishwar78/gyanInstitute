import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  eyebrow: { type: String, default: "ABOUT US" },
  heading: { type: String, default: "Welcome to Gyan Time" },
  introduction: { type: String, default: "Gyan Time was established with a vision to provide world-class education and create a platform where students can learn, grow and achieve their goals." },
  missionStatement: { type: String, default: "We believe in empowering young minds with the right knowledge, skills and values to excel in life. Our experienced faculty, modern infrastructure and student-centric approach make us one of the top Times in the region." },
  highlights: { 
    type: [String], 
    default: ["Experienced Faculty", "Modern Infrastructure", "Student Centric Approach", "Proven Results"] 
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
  },
  heroImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1300&q=90",
  },
  introImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=90",
  },
  facilityMainImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=90",
  },
  facilitySmallImage: {
    type: String,
    default: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=90",
  },
  imageCaption: {
    type: String,
    default: "Gyan Institute of Professional Studies",
  },
  imageSubLine: {
    type: String,
    default: "Empowering Students Since 2011",
  },
  experienceBadgeNumber: {
    type: String,
    default: "15+",
  },
  experienceBadgeText: {
    type: String,
    default: "Years of Excellence",
  }
}, { timestamps: true });

const About = mongoose.model("About", aboutSchema);
export default About;
