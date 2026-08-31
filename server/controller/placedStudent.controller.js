import PlacedStudent from "../module/PlacedStudent.js";

// Get all placed students
export const getAllPlacedStudents = async (req, res) => {
  try {
    const { status, courseSlug } = req.query;
    let query = {};
    if (status) query.status = status;
    if (courseSlug && courseSlug !== "all") {
      query.$or = [{ courseSlug }, { courseSlug: "" }, { courseSlug: "all" }, { courseSlug: null }];
    }
    const students = await PlacedStudent.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching placed students", error: error.message });
  }
};

// Create placed student
export const createPlacedStudent = async (req, res) => {
  try {
    const newStudent = new PlacedStudent(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating placed student", error: error.message });
  }
};

// Update placed student
export const updatePlacedStudent = async (req, res) => {
  try {
    const updated = await PlacedStudent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Placed student not found" });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating placed student", error: error.message });
  }
};

// Delete placed student
export const deletePlacedStudent = async (req, res) => {
  try {
    const deleted = await PlacedStudent.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Placed student not found" });
    }
    res.json({ success: true, message: "Placed student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting placed student", error: error.message });
  }
};
