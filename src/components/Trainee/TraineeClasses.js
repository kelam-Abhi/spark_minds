import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, FileText, Download, BookOpen, Users, CheckCircle, Play, Bookmark, Bell, Search, Filter, X, Square, Pause } from 'lucide-react';
import toast from 'react-hot-toast';

const TraineeClasses = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [classTime, setClassTime] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isClassActive, setIsClassActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Mock data for classes
  const [classes] = useState([
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      course: 'React',
      mentor: 'John Smith',
      type: 'Virtual',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '2 hours',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      location: 'Virtual',
      status: 'upcoming',
      description: 'Advanced concepts of React Hooks including custom hooks, useReducer, and useContext.',
      materials: [
        { id: 1, name: 'React Hooks Cheat Sheet', type: 'pdf', url: '#', uploadedAt: '2024-01-14' },
        { id: 2, name: 'Hooks Examples', type: 'zip', url: '#', uploadedAt: '2024-01-14' }
      ],
      recordings: [
        { id: 1, name: 'Session 1 - Introduction', duration: '45:00', url: '#', uploadedAt: '2024-01-10' }
      ],
      attendees: 15,
      maxAttendees: 20
    },
    {
      id: 2,
      title: 'Testing Fundamentals',
      course: 'Testing',
      mentor: 'Sarah Johnson',
      type: 'Manual',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '1.5 hours',
      meetingLink: null,
      location: 'Room 201, Building A',
      status: 'upcoming',
      description: 'Introduction to software testing principles, types, and methodologies.',
      materials: [
        { id: 3, name: 'Testing Guide', type: 'pdf', url: '#', uploadedAt: '2024-01-15' }
      ],
      recordings: [],
      attendees: 12,
      maxAttendees: 25
    },
    {
      id: 3,
      title: 'Cloud Architecture Basics',
      course: 'Cloud',
      mentor: 'Mike Wilson',
      type: 'Virtual',
      date: '2024-01-14',
      time: '9:00 AM',
      duration: '2.5 hours',
      meetingLink: 'https://meet.google.com/xyz-uvw-rst',
      location: 'Virtual',
      status: 'completed',
      description: 'Understanding cloud computing fundamentals and architecture patterns.',
      materials: [
        { id: 4, name: 'Cloud Architecture PPT', type: 'pptx', url: '#', uploadedAt: '2024-01-13' },
        { id: 5, name: 'Practice Exercises', type: 'docx', url: '#', uploadedAt: '2024-01-13' }
      ],
      recordings: [
        { id: 2, name: 'Full Session Recording', duration: '2:30:00', url: '#', uploadedAt: '2024-01-14' }
      ],
      attendees: 18,
      maxAttendees: 20
    }
  ]);

  const [savedClasses] = useState([
    {
      id: 4,
      title: 'JavaScript ES6+ Features',
      course: 'JavaScript',
      mentor: 'Alex Brown',
      date: '2024-01-10',
      materials: [
        { id: 6, name: 'ES6+ Cheat Sheet', type: 'pdf', url: '#', uploadedAt: '2024-01-09' },
        { id: 7, name: 'Code Examples', type: 'zip', url: '#', uploadedAt: '2024-01-09' }
      ],
      recordings: [
        { id: 3, name: 'Session Recording', duration: '1:45:00', url: '#', uploadedAt: '2024-01-10' }
      ]
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'class',
      message: 'New class scheduled: React Hooks Deep Dive on Jan 15',
      timestamp: '2024-01-12T10:00:00Z',
      read: false
    },
    {
      id: 2,
      type: 'task',
      message: 'New assignment: React Hooks Practice Exercise',
      timestamp: '2024-01-12T09:30:00Z',
      read: false
    },
    {
      id: 3,
      type: 'test',
      message: 'Test scheduled: JavaScript Fundamentals on Jan 18',
      timestamp: '2024-01-11T16:00:00Z',
      read: true
    }
  ]);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || cls.course === filterCourse;
    const matchesType = filterType === 'all' || cls.type === filterType;
    const matchesStatus = activeTab === 'all' || cls.status === activeTab;
    
    return matchesSearch && matchesCourse && matchesType && matchesStatus;
  });

  const handleJoinClass = (cls) => {
    if (cls.type === 'Virtual' && cls.meetingLink) {
      toast.success(`Joined ${cls.title}`);
      window.open(cls.meetingLink, '_blank');
    } else {
      toast.success(`Attending ${cls.title} at ${cls.location}`);
    }
  };

  const handleSaveClass = (cls) => {
    toast.success(`Class "${cls.title}" saved for revision`);
  };

  const handleDownloadMaterial = (material) => {
    toast.success(`Downloading ${material.name}`);
  };

  const handleMarkNotificationRead = (notificationId) => {
    toast.success('Notification marked as read');
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success('Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.success('Recording stopped and saved');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      ongoing: { color: 'bg-green-100 text-green-800', icon: Play },
      completed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.upcoming;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      Virtual: { color: 'bg-purple-100 text-purple-800', icon: Video },
      Manual: { color: 'bg-orange-100 text-orange-800', icon: MapPin }
    };
    
    const config = typeConfig[type] || typeConfig.Virtual;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {type}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600">Attend classes, access materials, and track your learning progress</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Upcoming Classes</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Saved Classes</p>
              <p className="text-2xl font-bold text-gray-900">{savedClasses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Materials</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.reduce((acc, cls) => acc + cls.materials.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['upcoming', 'completed', 'saved', 'notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          {activeTab !== 'notifications' && (
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search classes, mentors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Courses</option>
                  <option value="React">React</option>
                  <option value="Testing">Testing</option>
                  <option value="Cloud">Cloud</option>
                  <option value="AIML">AIML</option>
                  <option value="DotNet">DotNet</option>
                </select>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {filteredClasses.filter(c => c.status === 'upcoming').map((cls) => (
                <div key={cls.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cls.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{cls.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(cls.status)}
                          {getTypeBadge(cls.type)}
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(cls.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {cls.time} ({cls.duration})
                        </div>
                        <div className="flex items-center text-gray-600">
                          {cls.type === 'Virtual' ? (
                            <Video className="w-4 h-4 mr-2" />
                          ) : (
                            <MapPin className="w-4 h-4 mr-2" />
                          )}
                          {cls.type === 'Virtual' ? 'Virtual Meeting' : cls.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {cls.attendees}/{cls.maxAttendees} attendees
                        </div>
                      </div>
                      
                      {cls.materials.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Materials:</p>
                          <div className="flex flex-wrap gap-2">
                            {cls.materials.map((material) => (
                              <button
                                key={material.id}
                                onClick={() => handleDownloadMaterial(material)}
                                className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-1" />
                                {material.name}
                                <Download className="w-3 h-3 ml-1" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleJoinClass(cls)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {cls.type === 'Virtual' ? 'Join Class' : 'Attend Class'}
                      </button>
                      <button
                        onClick={() => handleSaveClass(cls)}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-4">
              {filteredClasses.filter(c => c.status === 'completed').map((cls) => (
                <div key={cls.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cls.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{cls.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(cls.status)}
                          {getTypeBadge(cls.type)}
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(cls.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {cls.time} ({cls.duration})
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {cls.attendees}/{cls.maxAttendees} attendees
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </div>
                      </div>
                      
                      {(cls.materials.length > 0 || cls.recordings.length > 0) && (
                        <div className="mt-3 space-y-3">
                          {cls.materials.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Materials:</p>
                              <div className="flex flex-wrap gap-2">
                                {cls.materials.map((material) => (
                                  <button
                                    key={material.id}
                                    onClick={() => handleDownloadMaterial(material)}
                                    className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <FileText className="w-4 h-4 mr-1" />
                                    {material.name}
                                    <Download className="w-3 h-3 ml-1" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {cls.recordings.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Recordings:</p>
                              <div className="flex flex-wrap gap-2">
                                {cls.recordings.map((recording) => (
                                  <button
                                    key={recording.id}
                                    className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Video className="w-4 h-4 mr-1" />
                                    {recording.name} ({recording.duration})
                                    <Play className="w-3 h-3 ml-1" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleSaveClass(cls)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <div className="relative mr-2">
                          <Bookmark className="w-4 h-4" />
                          <CheckCircle className="w-2.5 h-2.5 text-green-400 absolute -top-0.5 -right-0.5" />
                        </div>
                        Save for Revision
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              {savedClasses.map((cls) => (
                <div key={cls.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cls.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">Course: {cls.course} • Mentor: {cls.mentor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Bookmark className="w-5 h-5 text-primary-600" />
                            <CheckCircle className="w-3 h-3 text-green-600 absolute -top-1 -right-1" />
                          </div>
                          <span className="text-sm text-gray-500">Saved for Revision</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(cls.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Saved Class
                        </div>
                      </div>
                      
                      {(cls.materials.length > 0 || cls.recordings.length > 0) && (
                        <div className="mt-3 space-y-3">
                          {cls.materials.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Materials:</p>
                              <div className="flex flex-wrap gap-2">
                                {cls.materials.map((material) => (
                                  <button
                                    key={material.id}
                                    onClick={() => handleDownloadMaterial(material)}
                                    className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <FileText className="w-4 h-4 mr-1" />
                                    {material.name}
                                    <Download className="w-3 h-3 ml-1" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {cls.recordings.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Recordings:</p>
                              <div className="flex flex-wrap gap-2">
                                {cls.recordings.map((recording) => (
                                  <button
                                    key={recording.id}
                                    className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <Video className="w-4 h-4 mr-1" />
                                    {recording.name} ({recording.duration})
                                    <Play className="w-3 h-3 ml-1" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {notification.type === 'class' && <Calendar className="w-4 h-4 text-blue-600" />}
                        {notification.type === 'task' && <FileText className="w-4 h-4 text-green-600" />}
                        {notification.type === 'test' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                        <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                          {notification.message}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkNotificationRead(notification.id)}
                        className="ml-4 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Class Modal */}
      {selectedClass && isClassActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Class: {selectedClass.title}</h3>
              <button
                onClick={() => {
                  setIsClassActive(false);
                  setSelectedClass(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Class Time</p>
                    <p className="text-lg font-semibold">{classTime}:00</p>
                  </div>
                  <div className="flex space-x-2">
                    {!isRecording ? (
                      <button
                        onClick={handleStartRecording}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={handleStopRecording}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Recording
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsClassActive(false);
                    setSelectedClass(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  End Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraineeClasses;
