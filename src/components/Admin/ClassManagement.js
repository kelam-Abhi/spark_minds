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
  BookOpen
} from 'lucide-react';

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: 'React State Management Deep Dive',
      course: 'React Development',
      mentor: 'John Mentor',
      date: '2024-03-20',
      time: '10:00',
      duration: '2 hours',
      type: 'virtual',
      link: 'https://meet.google.com/abc-123-def',
      location: null,
      maxTrainees: 25,
      enrolledTrainees: 22,
      status: 'scheduled',
      description: 'Advanced concepts of React state management including Context API and Redux patterns'
    },
    {
      id: 2,
      title: 'Testing Fundamentals Workshop',
      course: 'Testing',
      mentor: 'Sarah Mentor',
      date: '2024-03-21',
      time: '14:00',
      duration: '3 hours',
      type: 'manual',
      link: null,
      location: 'Room 201, Building A',
      maxTrainees: 20,
      enrolledTrainees: 18,
      status: 'scheduled',
      description: 'Hands-on workshop covering unit testing, integration testing, and test-driven development'
    },
    {
      id: 3,
      title: 'AWS EC2 Instance Management',
      course: 'Cloud Computing',
      mentor: 'Mike Mentor',
      date: '2024-03-22',
      time: '11:00',
      duration: '2.5 hours',
      type: 'virtual',
      link: 'https://teams.microsoft.com/l/meetup-join/xyz',
      location: null,
      maxTrainees: 30,
      enrolledTrainees: 28,
      status: 'scheduled',
      description: 'Practical session on EC2 instance creation, configuration, and management'
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
    mentor: '',
    date: '',
    time: '',
    duration: '',
    type: 'virtual',
    link: '',
    location: '',
    maxTrainees: 25,
    description: ''
  });

  const handleAddClass = () => {
    if (newClass.title && newClass.course && newClass.mentor && newClass.date && newClass.time && newClass.duration) {
      const classItem = {
        id: classes.length + 1,
        ...newClass,
        status: 'scheduled',
        enrolledTrainees: 0,
        link: newClass.type === 'virtual' ? newClass.link : null,
        location: newClass.type === 'manual' ? newClass.location : null
      };
      setClasses([...classes, classItem]);
      setNewClass({
        title: '',
        course: '',
        mentor: '',
        date: '',
        time: '',
        duration: '',
        type: 'virtual',
        link: '',
        location: '',
        maxTrainees: 25,
        description: ''
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
    if (editingClass && newClass.title && newClass.course && newClass.mentor && newClass.date && newClass.time && newClass.duration) {
      setClasses(classes.map(c => c.id === editingClass.id ? { ...c, ...newClass } : c));
      setEditingClass(null);
      setNewClass({
        title: '',
        course: '',
        mentor: '',
        date: '',
        time: '',
        duration: '',
        type: 'virtual',
        link: '',
        location: '',
        maxTrainees: 25,
        description: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== classId));
    }
  };

  const toggleClassStatus = (classId) => {
    setClasses(classes.map(c => 
      c.id === classId 
        ? { ...c, status: c.status === 'scheduled' ? 'cancelled' : 'scheduled' }
        : c
    ));
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || classItem.course === filterCourse;
    const matchesType = filterType === 'all' || classItem.type === filterType;
    const matchesStatus = filterStatus === 'all' || classItem.status === filterStatus;
    return matchesSearch && matchesCourse && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'virtual' ? <Video className="w-4 h-4" /> : <Building className="w-4 h-4" />;
  };

  const formatDateTime = (date, time) => {
    const classDate = new Date(`${date}T${time}`);
    return classDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600">Schedule and manage virtual and in-person classes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Class
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Courses</option>
            <option value="React Development">React Development</option>
            <option value="Testing">Testing</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="AIML">AIML</option>
            <option value="DotNet">DotNet</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="virtual">Virtual</option>
            <option value="manual">In-Person</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {filteredClasses.length} classes found
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Class Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{classItem.title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleClassStatus(classItem.id)}
                    className={classItem.status === 'scheduled' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                  >
                    {classItem.status === 'scheduled' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEditClass(classItem)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClass(classItem.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{classItem.description}</p>

              {/* Class Type Badge */}
              <div className="flex items-center space-x-2 mb-4">
                {getTypeIcon(classItem.type)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(classItem.status)}`}>
                  {classItem.type === 'virtual' ? 'Virtual' : 'In-Person'}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(classItem.status)}`}>
                  {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                </span>
              </div>

              {/* Class Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{classItem.course}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{classItem.mentor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{formatDateTime(classItem.date, classItem.time)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{classItem.duration}</span>
                </div>
                
                {classItem.type === 'virtual' && classItem.link && (
                  <div className="flex items-center space-x-2">
                    <Link className="w-4 h-4 text-gray-400" />
                    <a 
                      href={classItem.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 truncate"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
                
                {classItem.type === 'manual' && classItem.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{classItem.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Class Stats and Actions */}
            <div className="p-6">
              {/* Enrollment Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary-600">{classItem.enrolledTrainees}</div>
                  <div className="text-xs text-gray-500">Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{classItem.maxTrainees}</div>
                  <div className="text-xs text-gray-500">Capacity</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Enrollment</span>
                  <span>{Math.round((classItem.enrolledTrainees / classItem.maxTrainees) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(classItem.enrolledTrainees / classItem.maxTrainees) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Class Actions */}
              <div className="flex space-x-2">
                <button className="btn-secondary flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="btn-primary flex-1">
                  <Users className="w-4 h-4 mr-1" />
                  Manage Enrollment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingClass ? 'Edit Class' : 'Schedule New Class'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Class Title</label>
                  <input
                    type="text"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter class title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter class description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                      value={newClass.course}
                      onChange={(e) => setNewClass({...newClass, course: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Course</option>
                      <option value="React Development">React Development</option>
                      <option value="Testing">Testing</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="AIML">AIML</option>
                      <option value="DotNet">DotNet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mentor</label>
                    <input
                      type="text"
                      value={newClass.mentor}
                      onChange={(e) => setNewClass({...newClass, mentor: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter mentor name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={newClass.duration}
                      onChange={(e) => setNewClass({...newClass, duration: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class Type</label>
                    <select
                      value={newClass.type}
                      onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="virtual">Virtual</option>
                      <option value="manual">In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Trainees</label>
                    <input
                      type="number"
                      value={newClass.maxTrainees}
                      onChange={(e) => setNewClass({...newClass, maxTrainees: parseInt(e.target.value)})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      min="1"
                    />
                  </div>
                </div>

                {newClass.type === 'virtual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
                    <input
                      type="url"
                      value={newClass.link}
                      onChange={(e) => setNewClass({...newClass, link: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter meeting link (Google Meet, Teams, Zoom, etc.)"
                    />
                  </div>
                )}

                {newClass.type === 'manual' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={newClass.location}
                      onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter room number and building"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingClass(null);
                    setNewClass({
                      title: '',
                      course: '',
                      mentor: '',
                      date: '',
                      time: '',
                      duration: '',
                      type: 'virtual',
                      link: '',
                      location: '',
                      maxTrainees: 25,
                      description: ''
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
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
