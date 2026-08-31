import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|mkv|avi|ogg|quicktime|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const isAllowedMime = 
    file.mimetype.startsWith("image/") || 
    file.mimetype.startsWith("video/") || 
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/octet-stream";

  if (extname || isAllowedMime) {
    return cb(null, true);
  } else {
    cb(new Error("Only image, video, and document (PDF/DOC) files are allowed!"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", (req, res) => {
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message || "File upload failed" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }
    const uploadedFile = req.files[0];
    const fileUrl = `http://localhost:5005/upload/${uploadedFile.filename}`;
    res.json({
      success: true,
      fileUrl,
      imageUrl: fileUrl,
      videoUrl: fileUrl,
      filename: uploadedFile.filename,
      mimetype: uploadedFile.mimetype,
      size: uploadedFile.size
    });
  });
});

export default router;
