import Inquiry from "../module/Inquiry.js";

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, city, subject, message, type, courseName, programMode } = req.body;
    
    if (!name || (!email && !phone)) {
      return res.status(400).json({ success: false, message: "Name and contact number/email are required" });
    }

    const newInquiry = new Inquiry({
      name,
      email: email || `${phone || "user"}@lead.in`,
      phone: phone || "",
      city: city || "",
      subject: subject || (type === "Brochure Download" ? `Brochure Request for ${courseName || "Course"}` : "General Inquiry"),
      message: message || `Brochure download request for ${courseName || "Course"} (${programMode || "General"} Mode)`,
      type: type || (message?.toLowerCase().includes("brochure") ? "Brochure Download" : "General Inquiry"),
      courseName: courseName || "",
      programMode: programMode || ""
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
