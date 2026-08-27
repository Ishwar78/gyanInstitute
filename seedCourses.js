import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./server/module/Course.js";
import { courses } from "./src/data/siteData.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/gyan-institute");
    console.log("Connected to MongoDB.");

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
