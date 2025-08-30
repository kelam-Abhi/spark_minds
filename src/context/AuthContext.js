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
      console.log('🔍 EXACT MATCH: mentor@maganti.com -> REACT MENTOR role');
      mockUser = {
        id: 2,
        name: 'Dr. Sarah Johnson',
        email: email,
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        department: 'React Development',
        assignedCourse: 'React Development',
        mentorType: 'Course Mentor'
      };
    } else if (email === 'testing.mentor@maganti.com') {
      console.log('🔍 EXACT MATCH: testing.mentor@maganti.com -> TESTING MENTOR role');
      mockUser = {
        id: 7,
        name: 'Prof. Mike Chen',
        email: email,
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        department: 'Testing Fundamentals',
        assignedCourse: 'Testing Fundamentals',
        mentorType: 'Course Mentor'
      };
    } else if (email === 'dotnet.mentor@maganti.com') {
      console.log('🔍 EXACT MATCH: dotnet.mentor@maganti.com -> DOTNET MENTOR role');
      mockUser = {
        id: 8,
        name: 'Dr. David Wilson',
        email: email,
        role: 'mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        department: 'DotNet Development',
        assignedCourse: 'DotNet Development',
        mentorType: 'Course Mentor'
      };
    } else if (email === 'trainee@maganti.com') {
      console.log('🔍 EXACT MATCH: trainee@maganti.com -> REACT TRAINEE role');
      mockUser = {
        id: 3,
        name: 'Sarah Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        department: 'React Development',
        enrolledCourse: 'React Development',
        assignedMentor: 'Dr. Sarah Johnson',
        progress: 65
      };
    } else if (email === 'testing.trainee@maganti.com') {
      console.log('🔍 EXACT MATCH: testing.trainee@maganti.com -> TESTING TRAINEE role');
      mockUser = {
        id: 4,
        name: 'Testing Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        department: 'Testing Fundamentals',
        enrolledCourse: 'Testing Fundamentals',
        assignedMentor: 'Prof. Mike Chen',
        progress: 45
      };
    } else if (email === 'dotnet.trainee@maganti.com') {
      console.log('🔍 EXACT MATCH: dotnet.trainee@maganti.com -> DOTNET TRAINEE role');
      mockUser = {
        id: 5,
        name: 'DotNet Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-2616b612b786?w=150&h=150&fit=crop&crop=face',
        department: 'DotNet Development',
        enrolledCourse: 'DotNet Development',
        assignedMentor: 'Dr. David Wilson',
        progress: 30
      };
    } else {
      // For any other email, default to React trainee but log it
      console.log('⚠️ No exact match found, defaulting to REACT TRAINEE role');
      mockUser = {
        id: 6,
        name: 'Default React Trainee',
        email: email,
        role: 'trainee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        department: 'React Development',
        enrolledCourse: 'React Development',
        assignedMentor: 'Dr. Sarah Johnson',
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

  // Update user profile function
  const updateUserProfile = (updatedData) => {
    console.log('🔄 Updating user profile:', updatedData);
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ User profile updated successfully');
      return updatedUser;
    } else {
      console.error('❌ No user logged in to update');
      return null;
    }
  };

  // Create trainee function with course assignment
  const createTrainee = (traineeData) => {
    const newTrainee = {
      id: Date.now(), // Simple ID generation
      ...traineeData,
      role: 'trainee',
      status: 'active',
      avatar: traineeData.avatar || 'https://via.placeholder.com/150',
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store in localStorage (in a real app, this would be an API call)
    const existingTrainees = JSON.parse(localStorage.getItem('trainees') || '[]');
    existingTrainees.push(newTrainee);
    localStorage.setItem('trainees', JSON.stringify(existingTrainees));
    
    console.log('✅ New trainee created:', newTrainee);
    return newTrainee;
  };

  // Logout function
  const logout = () => {
    console.log('🚪 AuthContext logout called');
    console.log('🚪 Previous user:', user);
    console.log('🚪 Clearing user data...');
    
    try {
      // Clear localStorage first
      localStorage.removeItem('user');
      console.log('✅ localStorage cleared');
      
      // Clear user state
      setUser(null);
      console.log('✅ User state cleared');
      
      // Force a small delay to ensure state update
      setTimeout(() => {
        console.log('✅ Current user state after logout:', null);
        console.log('✅ localStorage after logout:', localStorage.getItem('user'));
      }, 50);
      
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Even if there's an error, try to clear data
      try {
        localStorage.removeItem('user');
        setUser(null);
      } catch (fallbackError) {
        console.error('❌ Fallback logout also failed:', fallbackError);
      }
      throw error;
    }
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
    updateUserProfile,
    createTrainee,
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
