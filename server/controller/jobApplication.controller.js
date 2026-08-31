import JobApplication from "../module/JobApplication.js";

// Submit a new application / user detail with resume
export const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      city,
      experience,
      qualification,
      resumeUrl,
      resumeFilename,
      coverLetter
    } = req.body;

    if (!fullName || !email || !phone || !resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, Phone, and Resume file are required."
      });
    }

    const newApplication = new JobApplication({
      jobId: jobId || null,
      jobTitle: jobTitle || "General Application",
      fullName,
      email,
      phone,
      city: city || "",
      experience: experience || "Fresher",
      qualification: qualification || "",
      resumeUrl,
      resumeFilename: resumeFilename || "",
      coverLetter: coverLetter || "",
      status: "New"
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully! Our team will contact you.",
      data: newApplication
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    res.status(500).json({ success: false, message: "Error submitting application", error: error.message });
  }
};

// Get all applications (Admin)
export const getAllApplications = async (req, res) => {
  try {
    const { status, jobId } = req.query;
    let query = {};
    if (status) query.status = status;
    if (jobId) query.jobId = jobId;

    const applications = await JobApplication.find(query)
      .populate("jobId", "title department location")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
};

// Get single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id).populate("jobId");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching application", error: error.message });
  }
};

// Update status (New, Reviewed, Shortlisted, Rejected, Hired)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updated = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Status updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating status", error: error.message });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const deleted = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting application", error: error.message });
  }
};
