import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    console.log('🔄 useEffect: Checking localStorage for saved user');
    console.log('🔄 Raw localStorage data:', savedUser);
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('✅ User loaded from localStorage:', parsedUser);
        console.log('✅ User role from localStorage:', parsedUser.role);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user from localStorage:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    } else {
      console.log('ℹ️ No saved user found in localStorage');
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    console.log('🔐 Login attempt with email:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Direct role detection - no fallbacks, just exact matches
    let mockUser = null;
    
    console.log('🔍 Starting role detection for email:', email);
    
    if (email === 'admin@maganti.com') {
      console.log('🔍 EXACT MATCH: admin@maganti.com -> ADMIN role');
      mockUser = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        department: 'Management'
      };
    } else if (email === 'mentor@maganti.com') {
      console.log('🔍 EXACT MATCH: mentor@maganti.com -> MENTOR role');
      mockUser = {
        id: 2,
        name: 'John Mentor',
        email: email,
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        department: 'React Development',
        assignedCourses: ['React', 'Testing']
      };
    } else if (email === 'trainee@maganti.com') {
      console.log('🔍 EXACT MATCH: trainee@maganti.com -> TRAINEE role');
      mockUser = {
        id: 3,
        name: 'Sarah Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        department: 'React Development',
        enrolledCourses: ['React', 'Testing'],
        progress: 65
      };
    } else {
      // For any other email, default to trainee but log it
      console.log('⚠️ No exact match found, defaulting to TRAINEE role');
      mockUser = {
        id: 3,
        name: 'Default Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        department: 'General',
        enrolledCourses: [],
        progress: 0
      };
    }
    
    console.log('✅ Final user object created:', mockUser);
    console.log('✅ User role confirmed:', mockUser.role);
    console.log('✅ User ID:', mockUser.id);
    console.log('✅ User name:', mockUser.name);
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    
    return mockUser;
  };

  // Logout function
  const logout = () => {
    console.log('🚪 User logged out, clearing user data');
    console.log('🚪 Previous user:', user);
    setUser(null);
    localStorage.removeItem('user');
    console.log('🚪 User data cleared from state and localStorage');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;
  console.log('🔍 Current user state:', { 
    user: user ? { id: user.id, name: user.name, role: user.role, email: user.email } : null, 
    isAuthenticated, 
    isLoading 
  });

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
