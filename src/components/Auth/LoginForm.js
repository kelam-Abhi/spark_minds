import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'mentor') {
        navigate('/mentor-dashboard');
      } else {
        navigate('/trainee-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('LoginForm: Starting login process');
      console.log('LoginForm: Email entered:', email);
      console.log('LoginForm: Password entered:', password);
      
      const user = await login(email, password);
      console.log('LoginForm: Login successful, user received:', user);
      console.log('LoginForm: User role from login response:', user.role);
      
      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate based on user role
      if (user.role === 'admin') {
        console.log('LoginForm: Navigating to admin dashboard');
        navigate('/admin-dashboard');
      } else if (user.role === 'mentor') {
        console.log('LoginForm: Navigating to mentor dashboard');
        navigate('/mentor-dashboard');
      } else {
        console.log('LoginForm: Navigating to trainee dashboard');
        navigate('/trainee-dashboard');
      }
    } catch (error) {
      console.error('LoginForm: Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    console.log('Demo login requested for role:', role);
    
    let demoEmail = '';
    let demoPassword = 'password123';
    
    switch (role) {
      case 'admin':
        demoEmail = 'admin@maganti.com';
        console.log('Demo admin email set to:', demoEmail);
        break;
      case 'mentor':
        demoEmail = 'mentor@maganti.com';
        console.log('Demo mentor email set to:', demoEmail);
        break;
      case 'trainee':
        demoEmail = 'trainee@maganti.com';
        console.log('Demo trainee email set to:', demoEmail);
        break;
      default:
        demoEmail = 'admin@maganti.com';
        console.log('Demo default email set to:', demoEmail);
    }
    
    console.log('Demo login: Starting direct login process for role:', role);
    
    try {
      setIsLoading(true);
      console.log('Demo login: Calling login function directly');
      
      const user = await login(demoEmail, demoPassword);
      console.log('Demo login: Login successful, user received:', user);
      console.log('Demo login: User role from login response:', user.role);
      
      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate based on user role
      if (user.role === 'admin') {
        console.log('Demo login: Navigating to admin dashboard');
        navigate('/admin-dashboard');
      } else if (user.role === 'mentor') {
        console.log('Demo login: Navigating to mentor dashboard');
        navigate('/mentor-dashboard');
      } else {
        console.log('Demo login: Navigating to trainee dashboard');
        navigate('/trainee-dashboard');
      }
    } catch (error) {
      console.error('Demo login: Login error:', error);
      toast.error('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Maganti LMS
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your learning management dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or try demo accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('mentor')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Mentor Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('trainee')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Trainee Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
