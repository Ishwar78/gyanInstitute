import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, default: "+91 98765 43210" },
  email: { type: String, default: "info@gyantime.in" },
  addressLine: { type: String, default: "123 Knowledge City" },
  cityState: { type: String, default: "Hisar, Haryana" },
  postalCode: { type: String, default: "125001" },
  officeHours: { type: String, default: "Mon - Sat: 8:00 AM - 6:00 PM" }
}, { timestamps: true });

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export default ContactInfo;
