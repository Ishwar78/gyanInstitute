import Job from "../module/Job.js";

// Get all jobs (Admin & Public with filter)
export const getAllJobs = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching jobs", error: error.message });
  }
};

// Get single job by slug or ID
export const getJobBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let job = await Job.findOne({ slug });
    if (!job && slug.match(/^[0-9a-fA-F]{24}$/)) {
      job = await Job.findById(slug);
    }
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching job", error: error.message });
  }
};

// Create a new job
export const createJob = async (req, res) => {
  try {
    let slug = req.body.slug;
    if (!slug && req.body.title) {
      slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    
    // Ensure unique slug
    const existing = await Job.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newJob = new Job({ ...req.body, slug });
    await newJob.save();
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating job", error: error.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating job", error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting job", error: error.message });
  }
};
