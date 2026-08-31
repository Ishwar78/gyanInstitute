import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "Fresher",
    },
    qualification: {
      type: String,
      default: "",
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeFilename: {
      type: String,
      default: "",
    },
    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Reviewed", "Shortlisted", "Rejected", "Hired"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
