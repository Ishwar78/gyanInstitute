import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      default: "Teaching / Faculty",
    },
    location: {
      type: String,
      default: "Rohtak, Haryana",
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },
    experience: {
      type: String,
      default: "0-2 Years",
    },
    salary: {
      type: String,
      default: "Best in Industry",
    },
    openings: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    deadline: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
