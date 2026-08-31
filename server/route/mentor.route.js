import express from "express";
import {
  getAllMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../controller/mentor.controller.js";

const router = express.Router();

router.get("/", getAllMentors);
router.post("/", createMentor);
router.put("/:id", updateMentor);
router.delete("/:id", deleteMentor);

export default router;
