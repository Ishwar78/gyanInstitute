import { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp, FaUserGraduate } from "react-icons/fa";
import DemoInquiryModal from "../DemoInquiryModal/DemoInquiryModal";
import "./MobileBottomBar.css";

export default function MobileBottomBar() {
  const [phoneNumber, setPhoneNumber] = useState("+91 92530 10028");
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5005/api/contact-info")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.phone) {
          setPhoneNumber(json.data.phone);
        }
      })
      .catch(() => {});
  }, []);

  const rawPhone = phoneNumber.replace(/[^0-9]/g, "");
  const formattedWaPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
  const waUrl = `https://wa.me/${formattedWaPhone}?text=${encodeURIComponent("Hello Gyan Time, I want to know more about your courses.")}`;
  const telUrl = `tel:${phoneNumber.replace(/\s/g, "")}`;

  return (
    <>
      <aside className="mobile-bottom-bar" aria-label="Quick Mobile Actions">
        {/* Left: Call Button */}
        <a href={telUrl} className="mobile-action-item call-action" aria-label="Call Gyan Time">
          <div className="action-icon-box call-icon-box">
            <FiPhoneCall className="action-icon" />
          </div>
          <span className="action-label">CALL</span>
        </a>

        {/* Center: Register Now Button */}
        <button 
          type="button" 
          className="mobile-register-center-btn"
          onClick={() => setRegisterOpen(true)}
          aria-label="Register Now"
        >
          <FaUserGraduate className="register-btn-icon" />
          <span>Register Now</span>
        </button>

        {/* Right: WhatsApp Button */}
        <a 
          href={waUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-action-item whatsapp-action"
          aria-label="Chat on WhatsApp"
        >
          <div className="action-icon-box whatsapp-icon-box">
            <FaWhatsapp className="action-icon" />
          </div>
          <span className="action-label">WHATSAPP</span>
        </a>
      </aside>

      {/* Registration / Inquiry Modal */}
      <DemoInquiryModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        modalTitle="Student Registration & Admission"
        modalBadge="Admissions Open 2026-27"
        modalSubtitle="Fill your details below to secure your seat and receive batch timings."
        inquiryType="Course Registration"
        submitBtnText="Complete Registration"
      />
    </>
  );
}
