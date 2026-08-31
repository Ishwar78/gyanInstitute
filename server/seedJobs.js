import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./module/Job.js";

dotenv.config();

const sampleJobs = [
  {
    title: "Full Stack Web Development Trainer",
    slug: "full-stack-web-development-trainer",
    department: "IT & Computer Science",
    location: "Rohtak, Haryana",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹3,60,000 - ₹5,50,000 PA",
    openings: 2,
    description: "<p>We are looking for an experienced Full Stack Web Developer / Mentor to train our students in React, Node.js, Express, and MongoDB. You will guide students on live projects, conduct coding workshops, and review student assignments.</p>",
    requirements: [
      "Proficiency in HTML5, CSS3, JavaScript, React.js, and Node.js",
      "Experience with MongoDB / SQL databases",
      "Good communication and mentoring skills",
      "Passion for teaching and student success"
    ],
    deadline: "15 Oct 2026",
    status: "Active"
  },
  {
    title: "Academic Counselor & Admission Executive",
    slug: "academic-counselor-admission-executive",
    department: "Admissions & Student Relations",
    location: "Rohtak, Haryana",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "₹2,40,000 - ₹3,60,000 PA + Incentives",
    openings: 3,
    description: "<p>We are seeking energetic counselors to guide prospective students and parents about our diploma and certification courses, resolve inquiries, and assist with admission onboarding.</p>",
    requirements: [
      "Excellent communication and interpersonal skills in Hindi & English",
      "Basic understanding of computer education courses",
      "Confidence in interacting with students & parents",
      "Graduate in any discipline"
    ],
    deadline: "20 Oct 2026",
    status: "Active"
  },
  {
    title: "Digital Marketing & Graphic Design Specialist",
    slug: "digital-marketing-graphic-design-specialist",
    department: "Marketing & Media",
    location: "Rohtak, Haryana / Hybrid",
    type: "Full-time",
    experience: "1-2 Years",
    salary: "₹3,00,000 - ₹4,20,000 PA",
    openings: 1,
    description: "<p>Manage institute social media campaigns, design promotional banners & brochures, run Google/Meta ads, and train students in digital marketing essentials.</p>",
    requirements: [
      "Hands-on with Canva, Adobe Photoshop, and Illustrator",
      "Experience running Meta & Google Ads campaigns",
      "Knowledge of SEO and content creation",
      "Creative mindset and attention to detail"
    ],
    deadline: "30 Oct 2026",
    status: "Active"
  }
];

const seedJobs = async () => {
  try {
    await connectDB();
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany(sampleJobs);
      console.log("✅ Sample jobs seeded successfully!");
    } else {
      console.log(`ℹ️ Jobs collection already has ${count} records. No seeding needed.`);
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding jobs failed:", error);
    process.exit(1);
  }
};

seedJobs();
