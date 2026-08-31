import VideoTestimonial from "../module/VideoTestimonial.js";

// GET all video testimonials
export const getVideoTestimonials = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const list = await VideoTestimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching video testimonials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET single video testimonial by ID
export const getVideoTestimonialById = async (req, res) => {
  try {
    const item = await VideoTestimonial.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Video testimonial not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching video testimonial:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// CREATE new video testimonial
export const createVideoTestimonial = async (req, res) => {
  try {
    const {
      title,
      studentName,
      courseOrRole,
      subText,
      badgeText,
      tagPill,
      callLine,
      videoUrl,
      thumbnailUrl,
      order,
      status,
    } = req.body;

    if (!studentName || !videoUrl) {
      return res.status(400).json({ success: false, message: "Student name and video URL are required" });
    }

    const newItem = await VideoTestimonial.create({
      title: title || "",
      studentName: studentName.trim(),
      courseOrRole: courseOrRole || "",
      subText: subText || "",
      badgeText: badgeText || "",
      tagPill: tagPill || "",
      callLine: callLine || "",
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl || "",
      order: order !== undefined ? Number(order) : 0,
      status: status || "Active",
    });

    res.status(201).json({ success: true, data: newItem, message: "Video testimonial created successfully" });
  } catch (error) {
    console.error("Error creating video testimonial:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE video testimonial
export const updateVideoTestimonial = async (req, res) => {
  try {
    const updated = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Video testimonial not found" });
    }
    res.status(200).json({ success: true, data: updated, message: "Video testimonial updated successfully" });
  } catch (error) {
    console.error("Error updating video testimonial:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE video testimonial
export const deleteVideoTestimonial = async (req, res) => {
  try {
    const deleted = await VideoTestimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Video testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Video testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting video testimonial:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
