import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  city: { type: String, default: "" },
  subject: { type: String },
  message: { type: String, required: true },
  type: { type: String, default: "General Inquiry" }, // "General Inquiry" or "Brochure Download"
  courseName: { type: String, default: "" },
  programMode: { type: String, default: "" },
  status: { type: String, enum: ["New", "Contacted", "Closed"], default: "New" }
}, {
  timestamps: true
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
