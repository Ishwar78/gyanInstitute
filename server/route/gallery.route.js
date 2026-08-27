import express from "express";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "../controller/gallery.controller.js";

const router = express.Router();

router.route("/")
  .get(getGalleryImages)
  .post(addGalleryImage);

router.route("/:id")
  .delete(deleteGalleryImage);

export default router;
