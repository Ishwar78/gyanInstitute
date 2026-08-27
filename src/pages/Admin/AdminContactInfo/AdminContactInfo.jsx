import { useState, useEffect } from "react";
import { FiEdit3, FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import "./AdminContactInfo.css";

export default function AdminContactInfo() {
  const [formData, setFormData] = useState({
    phone: "+91 92530 10028",
    email: "info@gyantime.in",
    addressLine: "123 Knowledge City",
    cityState: "Hisar, Haryana",
    postalCode: "125001",
    officeHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/contact-info");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData({
          phone: json.data.phone || "",
          email: json.data.email || "",
          addressLine: json.data.addressLine || "",
          cityState: json.data.cityState || "",
          postalCode: json.data.postalCode || "",
          officeHours: json.data.officeHours || "",
        });
      }
    } catch (err) {
      console.error("Failed to load contact info:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("http://localhost:5005/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        alert("Contact Information updated successfully!");
        fetchContactInfo(); // refresh the view above
      }
    } catch (err) {
      console.error("Failed to save contact info:", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-page">Loading...</div>;

  return (
    <div className="admin-page contact-admin">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">WEBSITE SETTINGS</span>
          <h1>Contact Info</h1>
          <p>Manage the contact details displayed across the website.</p>
        </div>
      </div>
      <div className="contact-admin-grid">
        {[
          [FiPhone, "Phone", formData.phone, "Main Contact Number"],
          [FiMail, "Email", formData.email, "Replies within 24 hours"],
          [FiMapPin, "Address", `${formData.addressLine}, ${formData.cityState}`, `India - ${formData.postalCode}`],
          [FiClock, "Office Hours", formData.officeHours, "Available times"],
        ].map(([I, title, value, note]) => (
          <div className="contact-setting" key={title}>
            <div className="contact-setting-icon"><I /></div>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
            <button onClick={() => window.scrollTo(0, document.body.scrollHeight)}><FiEdit3 /></button>
          </div>
        ))}
      </div>
      <div className="form-panel">
        <h2>Update Time Contact Details</h2>
        <div className="form-grid">
          <label>Time Phone
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <label>Time Email
            <input name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>Address Line
            <input name="addressLine" value={formData.addressLine} onChange={handleChange} />
          </label>
          <label>City / State
            <input name="cityState" value={formData.cityState} onChange={handleChange} />
          </label>
          <label>Postal Code
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
          </label>
          <label>Office Hours
            <input name="officeHours" value={formData.officeHours} onChange={handleChange} />
          </label>
        </div>
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
