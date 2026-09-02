import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    syllabus: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      default: "",
    },
    faqs: [
      {
        question: { type: String, default: "" },
        answer: { type: String, default: "" },
      },
    ],
    programModes: {
      heading: { type: String, default: "" },
      subheading: { type: String, default: "" },
      offline: {
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        points: { type: [String], default: [] },
        brochureUrl: { type: String, default: "" },
      },
      online: {
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        points: { type: [String], default: [] },
        brochureUrl: { type: String, default: "" },
      },
    },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
