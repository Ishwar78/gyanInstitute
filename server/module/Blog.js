import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: "Admin" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    status: { type: String, enum: ["Active", "Draft"], default: "Active" },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
