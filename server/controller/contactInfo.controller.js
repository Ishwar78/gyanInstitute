import ContactInfo from "../module/ContactInfo.js";

export const getContactInfo = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create({});
    }
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    console.error("Error getting ContactInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    const data = req.body;
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(data);
    } else {
      info = await ContactInfo.findByIdAndUpdate(info._id, data, { new: true });
    }
    res.status(200).json({ success: true, data: info, message: "Contact Info updated successfully" });
  } catch (error) {
    console.error("Error updating ContactInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
