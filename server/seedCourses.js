import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Course from "./module/Course.js";

dotenv.config();

const courses = [
  {
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    category: "Computer Courses",
    duration: "6 Months",
    level: "Beginner to Advanced",
    mode: "Offline / Online",
    fee: "₹18,000",
    description: "Master HTML, CSS, JavaScript, React, Node.js, Express and MongoDB through practical projects.",
    longDescription: "This comprehensive Full Stack Web Development course takes you from absolute basics to building real-world applications. You'll learn frontend technologies like HTML, CSS, and React for creating beautiful interfaces, and backend technologies like Node.js, Express and MongoDB for building powerful APIs and databases.",
    syllabus: [
      "HTML5 & CSS3 Fundamentals",
      "Responsive Design & Flexbox / Grid",
      "JavaScript ES6+ & DOM Manipulation",
      "React.js – Components, Hooks, Router",
      "Node.js & Express.js Backend",
      "MongoDB & Mongoose",
      "REST API Development",
      "Git & Deployment (Vercel / Render)"
    ],
    highlights: ["Certificate on Completion", "Live Project Work", "Placement Assistance", "Doubt Support Sessions", "Industry Expert Faculty"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "upsc-civil-services-preparation",
    title: "UPSC Civil Services Preparation",
    category: "Competitive Exams",
    duration: "12 Months",
    level: "Beginner to Advanced",
    mode: "Offline",
    fee: "₹35,000",
    description: "Comprehensive preparation for UPSC Prelims, Mains and Interview with expert guidance and test series.",
    longDescription: "Our UPSC Civil Services Preparation program is meticulously designed by experienced educators. The course covers the entire UPSC syllabus with a strong focus on concept clarity, current affairs, answer writing and interview preparation. Regular mock tests and performance analysis ensure you are always ahead.",
    syllabus: [
      "General Studies Paper I, II, III & IV",
      "Indian Polity & Governance",
      "Economy & Economic Development",
      "History, Art & Culture",
      "Geography – Indian & World",
      "Current Affairs & Editorial Analysis",
      "Essay Writing & Answer Practice",
      "CSAT Paper Preparation",
      "Mains Answer Writing Workshop",
      "Mock Interviews & Personality Test"
    ],
    highlights: ["Daily Current Affairs", "Weekly Mock Tests", "Answer Writing Practice", "Personal Mentoring", "Study Material Provided"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "tally-prime-with-gst",
    title: "Tally Prime with GST",
    category: "Professional Courses",
    duration: "2 Months",
    level: "Beginner",
    mode: "Offline / Online",
    fee: "₹5,500",
    description: "Learn Tally Prime, GST, TDS, payroll, inventory and practical accounting workflows.",
    longDescription: "This practical course on Tally Prime is perfect for students and professionals who want to build a career in accounting and finance. You will gain hands-on experience with real business scenarios covering GST filing, TDS, payroll management, and complete accounting cycles.",
    syllabus: [
      "Introduction to Accounting Concepts",
      "Tally Prime Interface & Setup",
      "Company Creation & Management",
      "Voucher Entry & Ledger Management",
      "GST Configuration & Returns",
      "TDS / TCS Configuration",
      "Payroll & Employee Management",
      "Inventory & Stock Management",
      "Bank Reconciliation",
      "MIS Reports & Financial Statements"
    ],
    highlights: ["Practical Assignments", "GST Filing Practice", "Certificate on Completion", "Job Assistance", "Expert Trainer"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "spoken-english-communication",
    title: "Spoken English & Communication",
    category: "Language Courses",
    duration: "3 Months",
    level: "Beginner",
    mode: "Offline / Online",
    fee: "₹6,000",
    description: "Improve spoken English, grammar, vocabulary, confidence and interview communication.",
    longDescription: "Our Spoken English & Communication course is designed to help students and professionals speak English confidently in everyday life, interviews and professional settings. Through interactive sessions, group discussions, and role plays, you will improve your grammar, fluency, vocabulary and presentation skills.",
    syllabus: [
      "Basics of English Grammar",
      "Vocabulary Building Techniques",
      "Pronunciation & Accent Training",
      "Conversational English Practice",
      "Reading & Comprehension",
      "Group Discussions & Debates",
      "Public Speaking & Presentation",
      "Interview Communication Skills",
      "Email & Professional Writing",
      "Confidence Building Activities"
    ],
    highlights: ["Daily Speaking Practice", "Group Discussion Sessions", "Mock Interview Practice", "Personality Development", "Small Batch Size"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "academic-excellence-program",
    title: "Academic Excellence Program",
    category: "Academic Courses",
    duration: "10 Months",
    level: "School Students",
    mode: "Offline",
    fee: "₹12,000",
    description: "Concept-based learning, doubt support, regular tests and board-focused preparation.",
    longDescription: "The Academic Excellence Program is crafted for school students aiming to excel in board examinations. Our experienced faculty provides concept-based teaching combined with regular practice tests, doubt-clearing sessions, and personalized feedback to ensure every student achieves their full potential.",
    syllabus: [
      "Mathematics – Concepts & Problem Solving",
      "Science – Physics, Chemistry, Biology",
      "English – Grammar & Writing",
      "Social Studies & GK",
      "Chapter-wise Tests & Assessments",
      "Board Pattern Practice Papers",
      "Doubt Clearing Sessions",
      "Study Planning & Time Management",
      "Annual Revision & Mock Exams"
    ],
    highlights: ["Regular Tests & Feedback", "Doubt Clearing Sessions", "Study Material Provided", "Board Pattern Practice", "Personal Attention"],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
  },
  {
    slug: "personality-development",
    title: "Personality Development",
    category: "Personality Development",
    duration: "8 Weeks",
    level: "All Levels",
    mode: "Offline / Online",
    fee: "₹7,500",
    description: "Build communication, leadership, confidence, presentation and professional life skills.",
    longDescription: "This transformative Personality Development program goes beyond academics to build the professional and personal skills needed in today's world. From effective communication and leadership to body language, goal-setting and stress management — this course helps you become the best version of yourself.",
    syllabus: [
      "Self-Awareness & Goal Setting",
      "Effective Communication Skills",
      "Body Language & Non-verbal Communication",
      "Leadership & Decision Making",
      "Time Management & Productivity",
      "Confidence Building & Public Speaking",
      "Teamwork & Interpersonal Skills",
      "Interview & Professional Etiquette",
      "Stress Management Techniques",
      "Personal Branding & Networking"
    ],
    highlights: ["Interactive Activities", "Group Exercises", "Real-life Scenarios", "Expert Life Coach", "Certificate of Excellence"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for Seeding.");

    await Course.deleteMany({});
    console.log("Cleared existing courses.");

    for (const c of courses) {
      const course = new Course(c);
      await course.save();
    }
    console.log(`Seeded ${courses.length} courses successfully.`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
