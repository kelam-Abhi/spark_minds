import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings, 
  Edit, 
  Save, 
  X,
  Camera,
  Upload,
  Key,
  Bell,
  Globe,
  Building,
  CheckCircle,
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  Target,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

const TraineeProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'camera'
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [profile, setProfile] = useState({
    name: user?.name || 'Sarah Johnson',
    email: user?.email || 'sarah.johnson@maganti.com',
    phone: '+1 (555) 987-6543',
    role: user?.role || 'Trainee',
    department: user?.department || 'React Development',
    location: 'New York, NY',
    joinDate: '2024-01-15',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Passionate about web development and eager to learn React.js. Currently enrolled in the React Development course and making great progress.',
    currentCourse: 'React Development - Intermediate',
    mentor: 'John Mentor',
    progress: user?.progress || 75,
    goals: ['Master React Hooks', 'Build a full-stack application', 'Learn state management'],
    interests: ['Frontend Development', 'UI/UX Design', 'Mobile Apps'],
    education: 'Bachelor of Computer Science, NYU',
    experience: '1 year in web development',
    preferences: {
      language: 'English',
      timezone: 'UTC-5:00',
      notifications: true,
      theme: 'light',
      learningStyle: 'hands-on',
      studyTime: 'Evenings and weekends'
    },
    stats: {
      completedTasks: 18,
      totalTasks: 24,
      averageScore: 85,
      studyHours: 120,
      streak: 15
    }
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  // Sync profile with AuthContext when component mounts or user changes
  useEffect(() => {
    if (user && profile) {
      // Update local profile with user data from AuthContext
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role || prev.role,
        department: user.department || prev.department,
        avatar: user.avatar || prev.avatar,
        progress: user.progress || prev.progress
      }));
      
      // Also update edit profile
      setEditProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role || prev.role,
        department: user.department || prev.department,
        avatar: user.avatar || prev.avatar,
        progress: user.progress || prev.progress
      }));
    }
  }, [user]);

  const handleSave = () => {
    setProfile(editProfile);
    
    // Sync profile changes with AuthContext to update header
    updateUserProfile({
      name: editProfile.name,
      email: editProfile.email,
      department: editProfile.department,
      avatar: editProfile.avatar,
      progress: editProfile.progress
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (category, key, value) => {
    setEditProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleImageUpload = (event) => {
    console.log('Image upload triggered:', event.target.files);
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File read successfully, updating profile...');
        const newAvatar = e.target.result;
        
        // Update local state
        setEditProfile(prev => ({
          ...prev,
          avatar: newAvatar
        }));
        setProfile(prev => ({
          ...prev,
          avatar: newAvatar
        }));
        
        // Sync with AuthContext to update header
        updateUserProfile({ avatar: newAvatar });
        
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    console.log('Attempting to start camera...');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user' // Use front camera by default
        } 
      });
      console.log('Camera started successfully');
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to load before showing
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded, starting playback');
          videoRef.current.play();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      if (error.name === 'NotAllowedError') {
        alert('Camera access denied. Please allow camera permissions and try again.');
      } else if (error.name === 'NotFoundError') {
        alert('No camera found on your device.');
      } else {
        alert('Unable to access camera. Please check permissions and try again.');
      }
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    console.log('Attempting to capture photo...');
    if (videoRef.current && canvasRef.current) {
      try {
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        console.log('Canvas dimensions:', canvasRef.current.width, 'x', canvasRef.current.height);
        
        // Draw the video frame to canvas
        context.drawImage(videoRef.current, 0, 0);
        
        // Convert to high-quality JPEG
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
        console.log('Photo captured successfully, updating profile...');
        
        // Update both edit and current profile
        setCapturedImage(imageDataUrl);
        setEditProfile(prev => ({
          ...prev,
          avatar: imageDataUrl
        }));
        setProfile(prev => ({
          ...prev,
          avatar: imageDataUrl
        }));
        
        // Sync with AuthContext to update header
        updateUserProfile({ avatar: imageDataUrl });
        
        // Stop camera and close modal
        stopCamera();
        setShowImageModal(false);
        
        // Show success message
        alert('Photo captured successfully!');
      } catch (error) {
        console.error('Error capturing photo:', error);
        alert('Error capturing photo. Please try again.');
      }
    } else {
      console.error('Video or canvas ref not available');
    }
  };

  const openImageModal = (source) => {
    console.log('Opening image modal with source:', source);
    setImageSource(source);
    setShowImageModal(true);
    if (source === 'camera') {
      console.log('Starting camera...');
      startCamera();
    }
  };

  const closeImageModal = () => {
    console.log('Closing image modal');
    setShowImageModal(false);
    stopCamera();
    setCapturedImage(null);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainee Profile</h1>
          <p className="text-gray-600">Manage your profile and learning preferences</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="relative inline-block group">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex space-x-2">
                    <button 
                      onClick={() => openImageModal('upload')}
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg border-2 border-white"
                      title="Upload Image from Device"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openImageModal('camera')}
                      className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors shadow-lg border-2 border-white"
                      title="Take Photo with Camera"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {!isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                      <Camera className="w-8 h-8 mx-auto mb-1" />
                      <p className="text-xs font-medium">Click Edit to change photo</p>
                    </div>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">
                {isEditing ? editProfile.name : profile.name}
              </h2>
              <p className="text-blue-600 font-medium">
                {isEditing ? editProfile.role : profile.role}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {isEditing ? editProfile.department : profile.department}
              </p>
              {!isEditing && (
                <p className="text-blue-600 text-xs mt-2 font-medium">
                  💡 Click "Edit Profile" to change your profile picture
                </p>
              )}
            </div>

            {/* Progress Section */}
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Course Progress</span>
                  <span className={`text-lg font-bold ${getProgressColor(profile.progress)}`}>
                    {profile.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressBarColor(profile.progress)}`}
                    style={{ width: `${profile.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {profile.stats.completedTasks}/{profile.stats.totalTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Average Score</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{profile.stats.averageScore}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-gray-600">Study Hours</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{profile.stats.studyHours}h</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">Learning Streak</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{profile.stats.streak} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="React Development">React Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="AIML">AIML</option>
                    <option value="DotNet">DotNet</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.experience}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Course Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
              Course Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Course
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.currentCourse}
                    onChange={(e) => handleInputChange('currentCourse', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.currentCourse}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mentor
                </label>
                <p className="text-gray-900">{profile.mentor}</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Goals
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  {editProfile.goals.map((goal, index) => (
                    <input
                      key={index}
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...editProfile.goals];
                        newGoals[index] = e.target.value;
                        handleInputChange('goals', newGoals);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter learning goal"
                    />
                  ))}
                  <button
                    onClick={() => handleInputChange('goals', [...editProfile.goals, ''])}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Goal
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.goals.map((goal, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-900">{goal}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {['Frontend Development', 'UI/UX Design', 'Mobile Apps', 'Backend Development', 'Data Science', 'DevOps', 'Cloud Computing'].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editProfile.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange('interests', [...editProfile.interests, interest]);
                          } else {
                            handleInputChange('interests', editProfile.interests.filter(i => i !== interest));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">{interest}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-green-600" />
              Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.preferences.language}
                    onChange={(e) => handlePreferenceChange('preferences', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.preferences.language}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.preferences.timezone}
                    onChange={(e) => handlePreferenceChange('preferences', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="UTC-5:00">UTC-5:00 (EST)</option>
                    <option value="UTC-8:00">UTC-8:00 (PST)</option>
                    <option value="UTC+0:00">UTC+0:00 (GMT)</option>
                    <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.preferences.timezone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Style
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.preferences.learningStyle}
                    onChange={(e) => handlePreferenceChange('preferences', 'learningStyle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="hands-on">Hands-on</option>
                    <option value="visual">Visual</option>
                    <option value="auditory">Auditory</option>
                    <option value="reading">Reading</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">{profile.preferences.learningStyle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Study Time
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.preferences.studyTime}
                    onChange={(e) => handlePreferenceChange('preferences', 'studyTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Evenings and weekends"
                  />
                ) : (
                  <p className="text-gray-900">{profile.preferences.studyTime}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notifications
              </label>
              {isEditing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editProfile.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('preferences', 'notifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">Enable notifications</span>
                </label>
              ) : (
                <p className="text-gray-900">
                  {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {imageSource === 'upload' ? 'Upload Profile Picture' : 'Take Profile Picture'}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {imageSource === 'upload' ? (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      const event = { target: { files } };
                      handleImageUpload(event);
                    }
                  }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full btn-primary"
                >
                  Choose File
                </button>
                <div className="text-center">
                  <button
                    onClick={() => setImageSource('camera')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Or take a photo with camera
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 bg-gray-900 rounded-lg"
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                  {!stream && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                      <div className="text-center text-white">
                        <Camera className="w-12 h-12 mx-auto mb-2" />
                        <p>Starting camera...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={capturePhoto}
                    disabled={!stream}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </button>
                  <button
                    onClick={closeImageModal}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setImageSource('upload')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Or upload from device
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraineeProfile;
