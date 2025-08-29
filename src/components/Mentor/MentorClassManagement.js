import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock, 
  MapPin,
  Link,
  Video,
  Building,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  BookOpen,
  X,
  Save,
  AlertCircle,
  FileText
} from 'lucide-react';

const MentorClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: 'React State Management Deep Dive',
      course: 'React Development',
      mentor: 'John Mentor',
      date: '2024-01-20',
      time: '10:00',
      duration: '2 hours',
      type: 'virtual',
      link: 'https://meet.google.com/abc-123-def',
      location: null,
      maxTrainees: 25,
      enrolledTrainees: 22,
      status: 'scheduled',
      description: 'Advanced concepts of React state management including Context API and Redux patterns',
      materials: ['slides.pdf', 'demo-code.zip'],
      agenda: [
        'Introduction to State Management',
        'Context API Deep Dive',
        'Redux Fundamentals',
        'Practical Examples',
        'Q&A Session'
      ]
    },
    {
      id: 2,
      title: 'Testing Fundamentals Workshop',
      course: 'Testing Fundamentals',
      mentor: 'John Mentor',
      date: '2024-01-21',
      time: '14:00',
      duration: '3 hours',
      type: 'manual',
      link: null,
      location: 'Room 201, Building A',
      maxTrainees: 20,
      enrolledTrainees: 18,
      status: 'scheduled',
      description: 'Hands-on workshop covering unit testing, integration testing, and test-driven development',
      materials: ['workshop-guide.pdf', 'test-examples.zip'],
      agenda: [
        'Testing Principles',
        'Unit Testing with Jest',
        'Integration Testing',
        'TDD Practice',
        'Hands-on Exercises'
      ]
    },
    {
      id: 3,
      title: 'AWS EC2 Instance Management',
      course: 'Cloud Computing',
      mentor: 'John Mentor',
      date: '2024-01-22',
      time: '11:00',
      duration: '2.5 hours',
      type: 'virtual',
      link: 'https://teams.microsoft.com/l/meetup-join/xyz',
      location: null,
      maxTrainees: 30,
      enrolledTrainees: 28,
      status: 'scheduled',
      description: 'Practical session on EC2 instance creation, configuration, and management',
      materials: ['aws-setup.pdf', 'terraform-scripts.zip'],
      agenda: [
        'AWS EC2 Overview',
        'Instance Types and Pricing',
        'Security Groups and Key Pairs',
        'Instance Launch and Configuration',
        'Monitoring and Scaling'
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newClass, setNewClass] = useState({
    title: '',
    course: '',
    mentor: 'John Mentor',
    date: '',
    time: '',
    duration: '',
    type: 'virtual',
    link: '',
    location: '',
    maxTrainees: 25,
    description: '',
    materials: [],
    agenda: []
  });

  const courses = [
    'React Development',
    'Testing Fundamentals',
    'Database Design',
    'Cloud Computing',
    'AIML Basics',
    'DotNet Development'
  ];

  const classTypes = [
    { value: 'virtual', label: 'Virtual Class', icon: Video },
    { value: 'manual', label: 'In-Person Class', icon: Building }
  ];

  const handleAddClass = () => {
    if (newClass.title && newClass.course && newClass.date && newClass.time && newClass.duration) {
      const classItem = {
        id: classes.length + 1,
        ...newClass,
        status: 'scheduled',
        enrolledTrainees: 0
      };
      setClasses([...classes, classItem]);
      setNewClass({
        title: '',
        course: '',
        mentor: 'John Mentor',
        date: '',
        time: '',
        duration: '',
        type: 'virtual',
        link: '',
        location: '',
        maxTrainees: 25,
        description: '',
        materials: [],
        agenda: []
      });
      setShowAddModal(false);
    }
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClass({ ...classItem });
    setShowAddModal(true);
  };

  const handleUpdateClass = () => {
    if (editingClass && newClass.title && newClass.course && newClass.date && newClass.time && newClass.duration) {
      setClasses(classes.map(c => c.id === editingClass.id ? { ...c, ...newClass } : c));
      setEditingClass(null);
      setNewClass({
        title: '',
        course: '',
        mentor: 'John Mentor',
        date: '',
        time: '',
        duration: '',
        type: 'virtual',
        link: '',
        location: '',
        maxTrainees: 25,
        description: '',
        materials: [],
        agenda: []
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== classId));
    }
  };

  const handleStatusChange = (classId, newStatus) => {
    setClasses(classes.map(c => c.id === classId ? { ...c, status: newStatus } : c));
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || classItem.course === filterCourse;
    const matchesType = filterType === 'all' || classItem.type === filterType;
    const matchesStatus = filterStatus === 'all' || classItem.status === filterStatus;
    
    return matchesSearch && matchesCourse && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    const classType = classTypes.find(t => t.value === type);
    if (classType) {
      const Icon = classType.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <Calendar className="w-4 h-4" />;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'virtual': return 'bg-purple-100 text-purple-800';
      case 'manual': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600">Schedule and manage virtual and in-person classes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Class
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <Video className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Virtual Classes</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.type === 'virtual').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Building className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In-Person Classes</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.filter(c => c.type === 'manual').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">
                {classes.reduce((sum, c) => sum + c.enrolledTrainees, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            {classTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Scheduled Classes</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map((classItem) => (
                <tr key={classItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{classItem.title}</div>
                      <div className="text-sm text-gray-500">{classItem.course}</div>
                      <div className="text-sm text-gray-500">{classItem.description.substring(0, 60)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                      {getTypeIcon(classItem.type)}
                      <span className="ml-1">{classTypes.find(t => t.value === classItem.type)?.label}</span>
                    </span>
                    {classItem.type === 'virtual' && classItem.link && (
                      <div className="mt-1">
                        <a 
                          href={classItem.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                        >
                          <Link className="w-3 h-3 mr-1" />
                          Join Meeting
                        </a>
                      </div>
                    )}
                    {classItem.type === 'manual' && classItem.location && (
                      <div className="mt-1 text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {classItem.location}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{formatDate(classItem.date)}</div>
                      <div>{formatTime(classItem.time)}</div>
                      <div className="text-gray-500">{classItem.duration}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{classItem.enrolledTrainees}/{classItem.maxTrainees}</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(classItem.enrolledTrainees / classItem.maxTrainees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                      {classItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClass(classItem)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClass(classItem.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <select
                        value={classItem.status}
                        onChange={(e) => handleStatusChange(classItem.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingClass ? 'Edit Class' : 'Schedule New Class'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                  setNewClass({
                    title: '',
                    course: '',
                    mentor: 'John Mentor',
                    date: '',
                    time: '',
                    duration: '',
                    type: 'virtual',
                    link: '',
                    location: '',
                    maxTrainees: 25,
                    description: '',
                    materials: [],
                    agenda: []
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter class title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    value={newClass.course}
                    onChange={(e) => setNewClass({...newClass, course: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Type *
                  </label>
                  <select
                    value={newClass.type}
                    onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {classTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Trainees
                  </label>
                  <input
                    type="number"
                    value={newClass.maxTrainees}
                    onChange={(e) => setNewClass({...newClass, maxTrainees: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              {/* Schedule Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newClass.date}
                    onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>

              {/* Type-specific fields */}
              {newClass.type === 'virtual' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={newClass.link}
                    onChange={(e) => setNewClass({...newClass, link: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              )}

              {newClass.type === 'manual' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newClass.location}
                    onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Room 201, Building A"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the class content and objectives"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                  setNewClass({
                    title: '',
                    course: '',
                    mentor: 'John Mentor',
                    date: '',
                    time: '',
                    duration: '',
                    type: 'virtual',
                    link: '',
                    location: '',
                    maxTrainees: 25,
                    description: '',
                    materials: [],
                    agenda: []
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={editingClass ? handleUpdateClass : handleAddClass}
                className="btn-primary"
              >
                {editingClass ? 'Update Class' : 'Schedule Class'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorClassManagement;
