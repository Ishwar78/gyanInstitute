import express from "express";
import {
  getVideoTestimonials,
  getVideoTestimonialById,
  createVideoTestimonial,
  updateVideoTestimonial,
  deleteVideoTestimonial,
} from "../controller/videoTestimonial.controller.js";

const router = express.Router();

router.get("/", getVideoTestimonials);
router.get("/:id", getVideoTestimonialById);
router.post("/", createVideoTestimonial);
router.put("/:id", updateVideoTestimonial);
router.delete("/:id", deleteVideoTestimonial);

export default router;
