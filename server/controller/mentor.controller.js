import Mentor from "../module/Mentor.js";

// Get all mentors
export const getAllMentors = async (req, res) => {
  try {
    const { status, courseSlug } = req.query;
    let query = {};
    if (status) query.status = status;
    if (courseSlug && courseSlug !== "all") {
      query.$or = [{ courseSlug }, { courseSlug: "" }, { courseSlug: "all" }, { courseSlug: null }];
    }
    const mentors = await Mentor.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching mentors", error: error.message });
  }
};

// Create mentor
export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(201).json({ success: true, data: newMentor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating mentor", error: error.message });
  }
};

// Update mentor
export const updateMentor = async (req, res) => {
  try {
    const updated = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating mentor", error: error.message });
  }
};

// Delete mentor
export const deleteMentor = async (req, res) => {
  try {
    const deleted = await Mentor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }
    res.json({ success: true, message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting mentor", error: error.message });
  }
};
