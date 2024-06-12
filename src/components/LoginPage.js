import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/authActions';
import leftImage from './left.png';
import MdImage from './Md.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({ email, password }, navigate));
  };

  useEffect(() => {
    if (user) {
      if (user.userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="login-main">
      <div className="login-lft">
        <img src={MdImage} alt="Icon" className="md-img" />
        <div></div>
        <img src={leftImage} alt="Icon" className="mid-img" />
        <div
          style={{
            color: 'rgb(253, 252, 253)',
            fontSize: '30px',
            fontWeight: '600',
            lineHeight: '40px',
            marginTop: '50px',
          }}
        >
          Wholesome Work Management System
        </div>
        <div
          style={{
            color: 'rgb(38, 11, 59)',
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: '600',
            marginTop: '10px',
          }}
        >
          Manage people, finance, and sales
        </div>
      </div>
      <div className="login-rt">
        <div className="inn-rt">
          <div className="ttl">Maximize your Efficiency</div>
          <div className="p-ln">
            Streamline your Time and Productivity
          </div>
          <hr style={{ width: '100%', opacity: '30%' }} />
          <div className="input-hd">Email* </div>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-hd">Password*</div>
          <input
            type="password"
            placeholder="Enter your Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Link to="/reset-password" className="f-pwd">
          {error && <div className="error-msg" >{error}</div>} Forgot Password
          </Link>
          <button className="log-btn" type="button" onClick={handleLogin}>
            Login
          </button>
          <div style={{ fontWeight: '500', marginTop: '30px' }}>
            Don't have an account? <Link to="/signup" className="reg-link">Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
