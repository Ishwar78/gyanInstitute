import Course from "../module/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching courses", error: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching course", error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    // Generate slug from title if not provided or empty
    let slug = req.body.slug;
    if (!slug) {
      slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    
    // Ensure unique slug
    const existing = await Course.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newCourse = new Course({ ...req.body, slug });
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting course", error: error.message });
  }
};
