import React, { useState, useRef } from 'react';
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
  Star
} from 'lucide-react';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageSource, setImageSource] = useState('upload'); // 'upload' or 'camera'
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [profile, setProfile] = useState({
    name: 'John Mentor',
    email: 'john.mentor@maganti.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Mentor',
    department: 'React Development',
    location: 'San Francisco, CA',
    joinDate: '2023-03-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced React developer and mentor with 8+ years of experience in frontend development. Passionate about teaching and helping trainees master modern web technologies.',
    expertise: ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'CSS/SCSS'],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional', 'Microsoft Azure Developer'],
    education: 'Bachelor of Computer Science, Stanford University',
    experience: '8+ years in software development',
    preferences: {
      language: 'English',
      timezone: 'UTC-8:00',
      notifications: true,
      theme: 'light',
      availability: 'Monday-Friday, 9 AM - 6 PM'
    },
    stats: {
      totalTrainees: 45,
      activeCourses: 3,
      averageRating: 4.8,
      totalHours: 1200
    }
  });

  const [editProfile, setEditProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editProfile);
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
    const file = event.target.files[0];
    if (file) {
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
        setEditProfile(prev => ({
          ...prev,
          avatar: e.target.result
        }));
        setProfile(prev => ({
          ...prev,
          avatar: e.target.result
        }));
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: 'user' // Use front camera by default
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to load before showing
        videoRef.current.onloadedmetadata = () => {
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
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      try {
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        // Draw the video frame to canvas
        context.drawImage(videoRef.current, 0, 0);
        
        // Convert to high-quality JPEG
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
        
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
        
        // Stop camera and close modal
        stopCamera();
        setShowImageModal(false);
        
        // Show success message
        alert('Photo captured successfully!');
      } catch (error) {
        console.error('Error capturing photo:', error);
        alert('Error capturing photo. Please try again.');
      }
    }
  };

  const openImageModal = (source) => {
    setImageSource(source);
    setShowImageModal(true);
    if (source === 'camera') {
      startCamera();
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    stopCamera();
    setCapturedImage(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentor Profile</h1>
          <p className="text-gray-600">Manage your profile and mentor preferences</p>
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
              <div className="relative inline-block">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0 flex space-x-1">
                    <button 
                      onClick={() => openImageModal('upload')}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      title="Upload Image"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openImageModal('camera')}
                      className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                      title="Take Photo"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
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
            </div>

            {/* Mentor Stats */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Total Trainees</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{profile.stats.totalTrainees}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Active Courses</span>
                </div>
                <span className="text-lg font-bold text-green-600">{profile.stats.activeCourses}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">{profile.stats.averageRating}/5.0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-600">Mentoring Hours</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{profile.stats.totalHours}h</span>
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

          {/* Expertise & Certifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-600" />
              Expertise & Certifications
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Skills
              </label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'CSS/SCSS', 'Python', 'Java', 'AWS', 'Docker'].map((skill) => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editProfile.expertise.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange('expertise', [...editProfile.expertise, skill]);
                          } else {
                            handleInputChange('expertise', editProfile.expertise.filter(s => s !== skill));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">{skill}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{profile.education}</p>
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
                    <option value="UTC-8:00">UTC-8:00 (PST)</option>
                    <option value="UTC-5:00">UTC-5:00 (EST)</option>
                    <option value="UTC+0:00">UTC+0:00 (GMT)</option>
                    <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profile.preferences.timezone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                {isEditing ? (
                  <select
                    value={editProfile.preferences.theme}
                    onChange={(e) => handlePreferenceChange('preferences', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                ) : (
                  <p className="text-gray-900 capitalize">{profile.preferences.theme}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.preferences.availability}
                    onChange={(e) => handlePreferenceChange('preferences', 'availability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Monday-Friday, 9 AM - 6 PM"
                  />
                ) : (
                  <p className="text-gray-900">{profile.preferences.availability}</p>
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

export default MentorProfile;
