import mongoose from "mongoose";

const placedStudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Associate Engineer",
    },
    package: {
      type: String,
      default: "",
    },
    worksWithLabel: {
      type: String,
      default: "Works with:",
    },
    worksWith: {
      type: String,
      default: "",
    },
    course: {
      type: String,
      default: "General",
    },
    courseSlug: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlacedStudent", placedStudentSchema);
