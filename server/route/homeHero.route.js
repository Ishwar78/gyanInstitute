import express from "express";
import { getHomeHero, updateHomeHero } from "../controller/homeHero.controller.js";

const router = express.Router();

router.get("/", getHomeHero);
router.put("/", updateHomeHero);

export default router;
