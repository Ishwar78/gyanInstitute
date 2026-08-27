import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
