import About from "../module/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    console.error("Error getting About data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const data = req.body;
    let about = await About.findOne();
    if (!about) {
      about = await About.create(data);
    } else {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    }
    res.status(200).json({ success: true, data: about, message: "About section updated successfully" });
  } catch (error) {
    console.error("Error updating About data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
