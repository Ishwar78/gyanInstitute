import mongoose from "mongoose";

const homeHeroSchema = new mongoose.Schema({
  badgeText: { type: String, default: "Top Rated Time" },
  heading: { type: String, default: "Empowering Minds, Shaping" },
  highlightedWord: { type: String, default: "Futures" },
  description: { type: String, default: "At Gyan Time, we provide quality education, expert guidance and holistic development to help students build a successful career." },
  primaryButtonText: { type: String, default: "Explore Courses" },
  secondaryButtonText: { type: String, default: "Inquiry now" },
  imageUrl: { type: String, default: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85" },
  images: { type: [String], default: ["https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1300&q=85"] }
}, { timestamps: true });

const HomeHero = mongoose.model("HomeHero", homeHeroSchema);
export default HomeHero;
