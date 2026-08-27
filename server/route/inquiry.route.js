import express from "express";
import { createInquiry, getInquiries, updateInquiryStatus } from "../controller/inquiry.controller.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", getInquiries);
router.put("/:id/status", updateInquiryStatus);

export default router;
