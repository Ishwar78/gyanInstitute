import express from "express";
import { getAbout, updateAbout } from "../controller/about.controller.js";

const router = express.Router();

router.route("/")
  .get(getAbout)
  .put(updateAbout);

export default router;
