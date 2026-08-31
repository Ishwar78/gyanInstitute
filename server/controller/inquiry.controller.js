import Inquiry from "../module/Inquiry.js";

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, city, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required" });
    }

    const newInquiry = new Inquiry({
      name, email, phone, city: city || "", subject, message
    });

    await newInquiry.save();

    res.status(201).json({ success: true, message: "Inquiry submitted successfully", data: newInquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update inquiry status
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.status(200).json({ success: true, message: "Status updated", data: updatedInquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
