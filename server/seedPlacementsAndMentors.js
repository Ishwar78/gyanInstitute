import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import PlacedStudent from "./module/PlacedStudent.js";
import Mentor from "./module/Mentor.js";

dotenv.config();

const samplePlacedStudents = [
  {
    name: "Nitin Thakur",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85",
    role: "Account Executive,",
    company: "Ogilvy",
    companyLogo: "/images/tc.png",
    worksWithLabel: "Works with:",
    worksWith: "Cadbury, 5 Star",
    package: "₹8.5 LPA",
    course: "General",
    courseSlug: "",
    status: "Active",
    order: 1
  },
  {
    name: "Shivam Arora",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
    role: "Ecommerce Executive,",
    company: "Interactive Avenues",
    companyLogo: "/images/multi.png",
    worksWithLabel: "Works with:",
    worksWith: "Boro Plus, Zandu",
    package: "₹7.2 LPA",
    course: "General",
    courseSlug: "",
    status: "Active",
    order: 2
  },
  {
    name: "Divya Pawar",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85",
    role: "E-commerce Associate,",
    company: "Starcom",
    companyLogo: "/images/hcl.png",
    worksWithLabel: "Runs ads on:",
    worksWith: "Colgate, Interactive Avenues",
    package: "₹6.8 LPA",
    course: "General",
    courseSlug: "",
    status: "Active",
    order: 3
  },
  {
    name: "Vanshika Sharma",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85",
    role: "Content Lead,",
    company: "Infinix",
    companyLogo: "/images/dell.png",
    worksWithLabel: "Manages Channels:",
    worksWith: "YouTube, Instagram",
    package: "₹7.8 LPA",
    course: "General",
    courseSlug: "",
    status: "Active",
    order: 4
  }
];

const sampleMentors = [
  {
    name: "Aanam Chashmawala",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85",
    role: "Founder, Wearified - India's first influencer-led, clean beauty brand",
    company: "Wearified",
    companyLogo: "/images/under.svg",
    experience: "13 Years",
    bgColor: "#4f8f97",
    linkedinUrl: "https://linkedin.com",
    bio: "Passionate entrepreneur and digital marketing visionary mentoring students on growth, branding and digital transformation.",
    skills: ["Brand Strategy", "Influencer Marketing", "E-commerce"],
    status: "Active",
    order: 1
  },
  {
    name: "Akira Mitsumasu",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    role: "VP - Global Marketing - Japan Airlines",
    company: "Japan Airlines",
    companyLogo: "/images/indigo.png",
    experience: "31 Years",
    bgColor: "#5a9a92",
    linkedinUrl: "https://linkedin.com",
    bio: "Global leadership and marketing expert with over 3 decades driving international brand expansion.",
    skills: ["Global Marketing", "Aviation Strategy", "Leadership"],
    status: "Active",
    order: 2
  },
  {
    name: "Rohan Prasher",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85",
    role: "Media Director, Coca Cola - Global beverage giant",
    company: "Coca-Cola",
    companyLogo: "/images/redbull.png",
    experience: "18 Years",
    bgColor: "#68a0a8",
    linkedinUrl: "https://linkedin.com",
    bio: "Leading large scale omni-channel media campaigns and performance-driven digital advertising strategies.",
    skills: ["Media Planning", "Data Analytics", "Performance Marketing"],
    status: "Active",
    order: 3
  },
  {
    name: "Deepa Joshi",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85",
    role: "Ex CMO, Starbucks - Global iconic coffee brand",
    company: "Starbucks",
    companyLogo: "/images/zom.png",
    experience: "19 Years",
    bgColor: "#528e96",
    linkedinUrl: "https://linkedin.com",
    bio: "Expert in consumer experience, product lifecycle management, and scalable customer acquisition.",
    skills: ["Product Marketing", "Omnichannel", "Brand Experience"],
    status: "Active",
    order: 4
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await PlacedStudent.deleteMany({});
    await PlacedStudent.insertMany(samplePlacedStudents);
    console.log("✅ Placed students updated with exact reference design data!");

    await Mentor.deleteMany({});
    await Mentor.insertMany(sampleMentors);
    console.log("✅ Mentors updated with exact reference design data!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
