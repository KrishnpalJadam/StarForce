
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/logo.png";
import axios from 'axios';
import BASE_URL from '../../../utils/Config';
import { useAuth } from '../Auth/AuthContext';

const JobPortalAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
const { login } = useAuth(); // Already imported - ✅ Good

const handleLogin = async () => {
  const { email, password } = formData;

  if (!email || !password) {
    toast.error("Please enter both email and password");
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password
    });

    const { role, token, id } = response.data.data;
    const { message } = response.data;

    const loginData = {
      id,
      role,
      token,
      email
    };

    // Store in AuthContext (very important!)
    login(loginData); // 👈 This will set user in context

    // Show success
    toast.success(message || `Login successful as ${role}`);

    // Redirect
    setTimeout(() => {
      if (role === "admin") navigate("/dashboard");
      else if (role === "employer") navigate("/employer/employerDash");
      else if (role === "employee") navigate("/employee/employeDash");
    }, 1500);

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        name,
        email,
        password,
        role
      });

      toast.success("Account created successfully! Please login.");
      setIsLogin(true);
      setShowSignupForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setShowSignupForm(true);
  };

  const togglePage = () => {
    setIsLogin(!isLogin);
    setRole(null);
    setShowSignupForm(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
       <style jsx>{`
        .auth-container {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 1100px;
          overflow: hidden;
          border: none;
          display: flex;
          min-height: 600px;
        }

        .left-section {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .profile-circles {
          position: relative;
          width: 300px;
          height: 300px;
        }

        .profile-circle {
          position: absolute;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .profile-circle:hover {
          transform: scale(1.05);
        }

        .profile-circle.large {
          width: 80px;
          height: 80px;
        }

        .profile-circle.medium {
          width: 60px;
          height: 60px;
        }

        .profile-circle.small {
          width: 45px;
          height: 45px;
        }

        .profile-circle.circle-1 {
          top: 20px;
          left: 50px;
          background: linear-gradient(135deg, #ff6b6b, #ffa726);
        }

        .profile-circle.circle-2 {
          top: 80px;
          right: 30px;
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
        }

        .profile-circle.circle-3 {
          top: 140px;
          left: 20px;
          background: linear-gradient(135deg, #a8edea, #fed6e3);
        }

        .profile-circle.circle-4 {
          bottom: 120px;
          right: 60px;
          background: linear-gradient(135deg, #ffecd2, #fcb69f);
        }

        .profile-circle.circle-5 {
          bottom: 60px;
          left: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .profile-circle.circle-6 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #ff9a9e, #fecfef);
        }

        .profile-img {
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>') center/cover;
        }

        .left-content {
          text-align: center;
          color: white;
          margin-top: 40px;
        }

        .left-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .left-subtitle {
          font-size: 16px;
          opacity: 0.9;
          line-height: 1.5;
        }

        .right-section {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .auth-subtitle {
          color: #718096;
          font-size: 16px;
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 8px;
          display: block;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          background: #ffffff;
          transition: all 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: #3182ce;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }

        .form-control::placeholder {
          color: #a0aec0;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .form-check {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-check-input {
          width: 16px;
          height: 16px;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
        }

        .form-check-label {
          font-size: 14px;
          color: #4a5568;
          margin: 0;
        }

        .forgot-link {
          color: #3182ce;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .forgot-link:hover {
          color: #2c5282;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          background: #3182ce;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 24px;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: #2c5282;
          transform: translateY(-1px);
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 24px 0;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .divider-text {
          background: white;
          padding: 0 16px;
          color: #718096;
          font-size: 14px;
        }

        .social-btn {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #4a5568;
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
          transition: all 0.2s;
        }

        .social-btn:hover {
          border-color: #cbd5e0;
          background: #f7fafc;
        }

        .toggle-text {
          text-align: center;
          font-size: 14px;
          color: #718096;
          margin-top: 24px;
        }

        .toggle-link {
          color: #3182ce;
          text-decoration: none;
          font-weight: 500;
        }

        .toggle-link:hover {
          color: #2c5282;
        }

        @media (max-width: 768px) {
          .auth-card {
            flex-direction: column;
            max-width: 400px;
          }
          
          .left-section {
            min-height: 300px;
          }
          
          .profile-circles {
            width: 250px;
            height: 250px;
          }
          
          .right-section {
            padding: 30px 20px;
          }
          
          .auth-title {
            font-size: 28px;
          }
        }
      `}</style>
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="auth-container">
        <div className="auth-card">
          {/* Left Section - Image/Visual */}
          <div className="left-section relative">
            <div className="profile-circles mt-5">
              <div className="profile-circle large circle-1">
                <div className="profile-img"></div>
              </div>
              <div className="profile-circle medium circle-2">
                <div className="profile-img"></div>
              </div>
              <div className="profile-circle small circle-3">
                <div className="profile-img"></div>
              </div>
              <div className="profile-circle medium circle-4">
                <div className="profile-img"></div>
              </div>
              <div className="profile-circle small circle-5">
                <div className="profile-img"></div>
              </div>
              <div className="profile-circle large circle-6">
                <div className="profile-img"></div>
              </div>
            </div>

            <div className="left-content">
              <h2 className="left-title">Find Your Dream Job</h2>
              <img
                src={logo}
                alt="Star Force Logo"
                className="absolute top-0 left-0 object-contain"
                style={{ width: "200px", marginTop: "-20px" }}
              />
              <p className="left-subtitle">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="right-section">
            <h1 className="auth-title">
              {isLogin ? 'Login' : 'Create Your Account'}
            </h1>
            <p className="auth-subtitle">
              {isLogin ? 'Welcome back! Please enter your details.' : 'Get started with your free account today.'}
            </p>

            {isLogin ? (
              <>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="remember-forgot">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label ms-3 p-1" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button
                  className="btn-primary"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Login'
                  )}
                </button>
              </>
            ) : (
              <>
                <h5 className="text-center text-lg font-semibold mb-3 text-gray-700">
                  {showSignupForm ? '' : 'Select a Role'}
                </h5>
                
                {!showSignupForm ? (
                  <div className="flex justify-center gap-6 mb-6">
                    <div
                      className={`cursor-pointer p-4 border rounded-xl text-center transition duration-200 ${role === 'employee' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                      onClick={() => handleRoleSelection('employee')}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Employee" className="w-12 h-12 mx-auto" />
                      <p className="mt-2 font-medium text-sm">Employee</p>
                    </div>
                    <div
                      className={`cursor-pointer p-4 border rounded-xl text-center transition duration-200 ${role === 'employer' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                      onClick={() => handleRoleSelection('employer')}
                    >
                      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Employer" className="w-12 h-12 mx-auto" />
                      <p className="mt-2 font-medium text-sm">Employer</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-600 text-sm mb-1">
                        {role === 'employee' ? 'Full Name' : 'Company Name'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-400"
                        placeholder={role === 'employee' ? 'Enter full name' : 'Enter company name'}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button
                      type="button"
                      className="text-blue-500 text-sm mb-4"
                      onClick={() => setShowSignupForm(false)}
                    >
                      ← Change Role
                    </button>

                    <button
                      className="btn-primary"
                      onClick={handleSignup}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Sign up'
                      )}
                    </button>
                  </>
                )}
              </>
            )}

            <div className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <a href="#" className="toggle-link" onClick={(e) => { e.preventDefault(); togglePage(); }}>
                {isLogin ? 'Sign up' : 'Login'}
              </a>
            </div>

            {isLogin && (
              <div className="remember-forgot d-flex justify-content-center mt-3">
                <Link to="/OtherInquiry" className="forgot-link text-decoration-none text-secondary d-flex align-items-center">
                  Other Inquiries <i className="bi bi-question-circle ms-2"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </>
  );
};

export default JobPortalAuth;



