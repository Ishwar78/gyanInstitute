import express from "express";
import {
  getAllPlacedStudents,
  createPlacedStudent,
  updatePlacedStudent,
  deletePlacedStudent,
} from "../controller/placedStudent.controller.js";

const router = express.Router();

router.get("/", getAllPlacedStudents);
router.post("/", createPlacedStudent);
router.put("/:id", updatePlacedStudent);
router.delete("/:id", deletePlacedStudent);

export default router;
