import mongoose from "mongoose";
import Admin from "./module/Admin.js";
import connectDB from "./config/db.js";

const seedAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@gyaninstitute.com" });
    if (existingAdmin) {
      console.log("Admin already exists in the database.");
    } else {
      const admin = new Admin({
        email: "admin@gyaninstitute.com",
        password: "admin123" // In production, we'd hash this. Given user instructions, just saving it.
      });
      await admin.save();
      console.log("Admin credentials saved successfully.");
    }
    
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
