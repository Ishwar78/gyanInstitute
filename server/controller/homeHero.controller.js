import HomeHero from "../module/HomeHero.js";

export const getHomeHero = async (req, res) => {
  try {
    let hero = await HomeHero.findOne();
    if (!hero) {
      hero = await HomeHero.create({});
    }
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    console.error("Error getting HomeHero:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateHomeHero = async (req, res) => {
  try {
    const data = req.body;
    let hero = await HomeHero.findOne();
    if (!hero) {
      hero = await HomeHero.create(data);
    } else {
      hero = await HomeHero.findByIdAndUpdate(hero._id, data, { new: true });
    }
    res.status(200).json({ success: true, data: hero, message: "Home Hero updated successfully" });
  } catch (error) {
    console.error("Error updating HomeHero:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
