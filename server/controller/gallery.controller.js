import Gallery from "../module/Gallery.js";

export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error("Error getting gallery images:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const { label, image } = req.body;
    if (!label || !image) {
      return res.status(400).json({ success: false, message: "Label and image are required" });
    }
    const newImage = await Gallery.create({ label, image });
    res.status(201).json({ success: true, data: newImage, message: "Image added to gallery" });
  } catch (error) {
    console.error("Error adding gallery image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Gallery.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }
    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
