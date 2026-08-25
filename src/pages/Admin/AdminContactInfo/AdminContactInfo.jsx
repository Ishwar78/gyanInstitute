import { FiEdit3, FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import "./AdminContactInfo.css";
export default function AdminContactInfo(){
 return <div className="admin-page contact-admin"><div className="admin-page-head"><div><span className="eyebrow">WEBSITE SETTINGS</span><h1>Contact Info</h1><p>Manage the contact details displayed across the website.</p></div></div>
 <div className="contact-admin-grid">{[
  [FiPhone,"Phone","+91 98765 43210","Mon - Sat: 8:00 AM - 6:00 PM"],
  [FiMail,"Email","info@gyaninstitute.com","Replies within 24 hours"],
  [FiMapPin,"Address","123 Knowledge City, Hisar, Haryana","India - 125001"],
  [FiClock,"Office Hours","Mon - Sat: 8:00 AM - 6:00 PM","Sunday: Closed"]
 ].map(([I,title,value,note])=><div className="contact-setting" key={title}><div className="contact-setting-icon"><I/></div><div><span>{title}</span><strong>{value}</strong><small>{note}</small></div><button><FiEdit3/></button></div>)}</div>
 <div className="form-panel"><h2>Update Institute Contact Details</h2><div className="form-grid">{["Institute Phone","Institute Email","Address Line","City / State","Postal Code","Office Hours"].map(x=><label key={x}>{x}<input defaultValue={x==="Institute Phone"?"+91 98765 43210":x==="Institute Email"?"info@gyaninstitute.com":x==="City / State"?"Hisar, Haryana":x==="Postal Code"?"125001":x==="Office Hours"?"Mon - Sat: 8:00 AM - 6:00 PM":"123 Knowledge City"}/></label>)}</div><button className="save-btn">Save Changes</button></div></div>
}
