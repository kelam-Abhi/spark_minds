import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import loginImage from '../../Logo/login_image.jpg';
import magantiLogo from '../../Logo/maganti_logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const userData = await login(formData.email, formData.password);
      setIsLoading(false);
      
      // Navigate to appropriate dashboard based on role
      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'mentor') {
        navigate('/mentor-dashboard');
      } else if (userData.role === 'trainee') {
        navigate('/trainee-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="login-card">
        <div className="containers-row">
          {/* Image Container - Left side */}
          <div className="image-container">
            <img 
              src={loginImage}
              alt="Login Illustration" 
              className="login-illustration"
            />
          </div>

          {/* Logo and Form Container - Right side */}
          <div className="logo-container">
            <img 
              src={magantiLogo}
              alt="Maganti Logo" 
              className="logo-image"
            />
            
            <div className="login-details-container">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to your account</p>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`login-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading && <div className="spinner"></div>}
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>

                <div className="form-footer">
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
              </form>
              
              {/* <div className="demo-credentials">
                <h4>Demo Credentials:</h4>
                <div className="credential-item">
                  <strong>Admin:</strong> admin@maganti.com
                </div>
                <div className="credential-item">
                  <strong>Mentor:</strong> mentor@maganti.com
                </div>
                <div className="credential-item">
                  <strong>Trainee:</strong> trainee@maganti.com
                </div>
                <p className="credential-note">Use any password to test</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
