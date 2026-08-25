import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const submit = (e) => { e.preventDefault(); navigate("/admin/overview"); };

  return (
    <div className="admin-login">
      <div className="admin-login-panel">
        <div className="login-logo">G</div>
        <span className="eyebrow">GYAN INSTITUTE</span>
        <h1>Welcome <span>Back</span></h1>
        <p>Sign in to manage your institute website content.</p>
        <form onSubmit={submit}>
          <label>Email Address</label>
          <div className="login-input"><FiMail /><input type="email" placeholder="admin@gyaninstitute.com" defaultValue="admin@gyaninstitute.com" required /></div>
          <label>Password</label>
          <div className="login-input"><FiLock /><input type={show ? "text" : "password"} placeholder="Enter password" defaultValue="admin123" required /><button type="button" onClick={() => setShow(!show)}>{show ? <FiEyeOff/> : <FiEye/>}</button></div>
          <div className="login-row"><label className="remember"><input type="checkbox" defaultChecked /> Remember me</label><a href="#forgot">Forgot Password?</a></div>
          <button className="login-submit">Sign In to Dashboard <FiArrowRight /></button>
        </form>
        <small className="login-note">Demo login UI — connect your real authentication API before production.</small>
      </div>
    </div>
  );
}
