import express from "express";
import {
  getAllJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:slug", getJobBySlug);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
