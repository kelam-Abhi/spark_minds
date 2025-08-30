import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  UserPlus,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Save,
  AlertCircle,
  MapPin,
  GraduationCap
} from 'lucide-react';

const MentorTraineeManagement = () => {
  const [trainees, setTrainees] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@maganti.com',
      phone: '+1 (555) 123-4567',
      course: 'React Development',
      stage: 'Intermediate',
      joinDate: '2024-01-15',
      status: 'active',
      progress: 75,
      lastActive: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      department: 'Frontend Development',
      mentor: 'John Mentor',
      completedTasks: 18,
      totalTasks: 24,
      averageScore: 85
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@maganti.com',
      phone: '+1 (555) 234-5678',
      course: 'Testing Fundamentals',
      stage: 'Basics',
      joinDate: '2024-01-20',
      status: 'active',
      progress: 60,
      lastActive: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      department: 'Testing',
      mentor: 'John Mentor',
      completedTasks: 12,
      totalTasks: 20,
      averageScore: 78
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@maganti.com',
      phone: '+1 (555) 345-6789',
      course: 'Cloud Computing',
      stage: 'Advanced',
      joinDate: '2024-01-10',
      status: 'active',
      progress: 90,
      lastActive: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      department: 'Cloud Computing',
      mentor: 'John Mentor',
      completedTasks: 25,
      totalTasks: 28,
      averageScore: 92
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTrainee, setEditingTrainee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterStage, setFilterStage] = useState('all');

  const [newTrainee, setNewTrainee] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    stage: '',
    department: '',
    joinDate: '',
    enrolledCourse: '',
    assignedMentor: ''
  });

  const courses = [
    'React Development',
    'Testing Fundamentals',
    'Database Design',
    'Cloud Computing',
    'AIML Basics',
    'DotNet Development'
  ];

  const stages = ['Basics', 'Intermediate', 'Advanced'];

  const departments = [
    'Frontend Development',
    'Backend Development',
    'Testing',
    'Database',
    'Cloud Computing',
    'AIML',
    'DevOps'
  ];

  const handleAddTrainee = () => {
    if (newTrainee.name && newTrainee.email && newTrainee.course && newTrainee.stage) {
      // Ensure trainee is assigned to a mentor
      if (!newTrainee.assignedMentor) {
        alert('Mentor assignment is required for trainees.');
        return;
      }
      
      const trainee = {
        id: trainees.length + 1,
        ...newTrainee,
        status: 'active',
        progress: 0,
        lastActive: 'Just now',
        avatar: 'https://via.placeholder.com/40',
        mentor: newTrainee.assignedMentor,
        completedTasks: 0,
        totalTasks: 0,
        averageScore: 0,
        joinDate: newTrainee.joinDate || new Date().toISOString().split('T')[0]
      };
      setTrainees([...trainees, trainee]);
      setNewTrainee({
        name: '',
        email: '',
        phone: '',
        course: '',
        stage: '',
        department: '',
        joinDate: '',
        enrolledCourse: '',
        assignedMentor: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditTrainee = (trainee) => {
    setEditingTrainee(trainee);
    setNewTrainee({ ...trainee });
    setShowAddModal(true);
  };

  const handleUpdateTrainee = () => {
    if (editingTrainee && newTrainee.name && newTrainee.email && newTrainee.course && newTrainee.stage) {
      // Ensure trainee is assigned to a mentor
      if (!newTrainee.assignedMentor) {
        alert('Mentor assignment is required for trainees.');
        return;
      }
      
      setTrainees(trainees.map(t => t.id === editingTrainee.id ? { ...t, ...newTrainee } : t));
      setEditingTrainee(null);
      setNewTrainee({
        name: '',
        email: '',
        phone: '',
        course: '',
        stage: '',
        department: '',
        joinDate: '',
        enrolledCourse: '',
        assignedMentor: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteTrainee = (traineeId) => {
    if (window.confirm('Are you sure you want to remove this trainee?')) {
      setTrainees(trainees.filter(t => t.id !== traineeId));
    }
  };

  const handleStatusChange = (traineeId, newStatus) => {
    setTrainees(trainees.map(t => t.id === traineeId ? { ...t, status: newStatus } : t));
  };

  const filteredTrainees = trainees.filter(trainee => {
    const matchesSearch = trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || trainee.course === filterCourse;
    const matchesStatus = filterStatus === 'all' || trainee.status === filterStatus;
    const matchesStage = filterStage === 'all' || trainee.stage === filterStage;
    
    return matchesSearch && matchesCourse && matchesStatus && matchesStage;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainee Management</h1>
          <p className="text-gray-600">Create and manage trainee profiles and progress</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Trainee
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Trainees</p>
              <p className="text-2xl font-bold text-gray-900">{trainees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Trainees</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainees.filter(t => t.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(trainees.map(t => t.course)).size}
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
                placeholder="Search trainees..."
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
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
      </div>

      {/* Trainees Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Trainee Profiles</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course & Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainees.map((trainee) => (
                <tr key={trainee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={trainee.avatar}
                        alt={trainee.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{trainee.name}</div>
                        <div className="text-sm text-gray-500">{trainee.email}</div>
                        <div className="text-sm text-gray-500">{trainee.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{trainee.course}</div>
                      <div className="text-sm text-gray-500">{trainee.stage}</div>
                      <div className="text-sm text-gray-500">Mentor: {trainee.assignedMentor || trainee.mentor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressBarColor(trainee.progress)}`}
                          style={{ width: `${trainee.progress}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getProgressColor(trainee.progress)}`}>
                        {trainee.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Tasks: {trainee.completedTasks}/{trainee.totalTasks}</div>
                      <div>Score: {trainee.averageScore}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trainee.status)}`}>
                      {trainee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trainee.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTrainee(trainee)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrainee(trainee.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <select
                        value={trainee.status}
                        onChange={(e) => handleStatusChange(trainee.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Trainee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTrainee ? 'Edit Trainee' : 'Add New Trainee'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTrainee(null);
                  setNewTrainee({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    stage: '',
                    department: '',
                    joinDate: '',
                    enrolledCourse: '',
                    assignedMentor: ''
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newTrainee.name}
                    onChange={(e) => setNewTrainee({...newTrainee, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newTrainee.email}
                    onChange={(e) => setNewTrainee({...newTrainee, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newTrainee.phone}
                    onChange={(e) => setNewTrainee({...newTrainee, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={newTrainee.joinDate}
                    onChange={(e) => setNewTrainee({...newTrainee, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    value={newTrainee.course}
                    onChange={(e) => setNewTrainee({...newTrainee, course: e.target.value})}
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
                    Stage *
                  </label>
                  <select
                    value={newTrainee.stage}
                    onChange={(e) => setNewTrainee({...newTrainee, stage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Stage</option>
                    {stages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Mentor *
                  </label>
                  <select
                    value={newTrainee.assignedMentor}
                    onChange={(e) => setNewTrainee({...newTrainee, assignedMentor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Mentor</option>
                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson (React)</option>
                    <option value="Prof. Mike Chen">Prof. Mike Chen (Testing)</option>
                    <option value="Prof. David Wilson">Prof. David Wilson (DotNet)</option>
                    <option value="Dr. Emily Brown">Dr. Emily Brown (Cloud)</option>
                    <option value="Prof. Alex Kumar">Prof. Alex Kumar (AIML)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTrainee(null);
                  setNewTrainee({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    stage: '',
                    department: '',
                    joinDate: '',
                    enrolledCourse: '',
                    assignedMentor: ''
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={editingTrainee ? handleUpdateTrainee : handleAddTrainee}
                className="btn-primary"
              >
                {editingTrainee ? 'Update Trainee' : 'Add Trainee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorTraineeManagement;
