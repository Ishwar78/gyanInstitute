import mongoose from "mongoose";

const videoTestimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    studentName: {
      type: String,
      required: true,
    },
    courseOrRole: {
      type: String,
      default: "",
    },
    subText: {
      type: String,
      default: "",
    },
    badgeText: {
      type: String,
      default: "",
    },
    tagPill: {
      type: String,
      default: "",
    },
    callLine: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const VideoTestimonial = mongoose.model("VideoTestimonial", videoTestimonialSchema);
export default VideoTestimonial;
