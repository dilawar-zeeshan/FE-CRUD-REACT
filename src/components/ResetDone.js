import React, { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import leftImage from "./left.png";
import MdImage from "./Md.png";

function ResetDone() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    
  };

  return (
    <div className="reset-main">
      <div className="login-lft">
        <img src={MdImage} alt="Icon" className="md-img" />
        <div> </div>
        <img src={leftImage} alt="Icon" className="mid-img" />
        <div
          style={{
            color: "rgb(253, 252, 253)",
            fontSize: "30px",
            fontWeight: "600",
            lineHeight: "40px",
            marginTop: "50px",
          }}
        >
          Wholesome Work Management System
        </div>
        <div
          style={{
            color: "rgb(38, 11, 59)",
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          Manage people, finance, and sales
        </div>
      </div>
      <div className="login-rt">
        <div className="inn-rt">
          <div className="ttl">Reset Password</div>
          <div className="p-ln">
            Streamline your Time and Productivity
          </div>
          <hr style={{ width: "100%", opacity: "30%" }} />

          <div className="input-hd">New Password*</div>
          <input
            className="form-input"
            type="password"
            placeholder="Enter your New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="input-hd">Confirm New Password*</div>
          <input
            className="form-input"
            type="password"
            placeholder="Confirm your New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="log-btn" type="button" onClick={handleReset}>
          </button>
          
          <div style={{ fontWeight: "500", marginTop: "30px" }}>
            Back to login{" "}
            <Link to="/" className="reg-link">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetDone;
