import express from "express";
import { getAllCourses, getCourseBySlug, createCourse, updateCourse, deleteCourse } from "../controller/course.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
