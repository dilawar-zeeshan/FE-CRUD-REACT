import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../actions/authActions';
import leftImage from './left.png';
import MdImage from './Md.png';

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State for admin toggle
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await dispatch(signup({ firstName, lastName, email, password, userType: isAdmin ? 'admin' : 'user' }, navigate)); // Pass userType based on isAdmin state
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-main">
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
          <div className="ttl">Setup a new organization</div>
          <div className="p-ln">Streamline your Time and Productivity</div>
          <hr style={{ width: '100%', opacity: '30%' }} />
          <div className="name-div">
            <div className="fname">
              <div className="input-hd">First Name*</div>
              <input
                className="form-input"
                type="text"
                placeholder=" Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="lname">
              <div className="input-hd">Last Name*</div>
              <input
                className="form-input"
                type="text"
                placeholder=" Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-hd">Email*</div>
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
          <div>
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Admin
            </label>
          </div>
          <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
          <Link to="/reset-password" className="f-pwd">
            Forgot Password
          </Link>
          <button className="log-btn" type="submit" onClick={handleSignup}>
            Register now
          </button>
          <div style={{ fontWeight: '500', marginTop: '30px' }}>
            Already have an account?{' '}
            <Link to="/" className="reg-link">
              Click here to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
