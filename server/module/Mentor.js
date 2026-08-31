import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      default: "5+ Years",
    },
    company: {
      type: String,
      default: "Industry Expert",
    },
    companyLogo: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "#549ba2",
    },
    bio: {
      type: String,
      default: "",
    },
    courseSlug: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
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

export default mongoose.model("Mentor", mentorSchema);
