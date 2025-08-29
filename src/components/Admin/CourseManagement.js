import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock, 
  TrendingUp,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  Save,
  X,
  UserPlus,
  UserMinus,
  Mail
} from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'React Development',
      description: 'Complete React.js development course from basics to advanced',
      department: 'React Development',
      stages: [
        { name: 'Basics', duration: '4 weeks', status: 'active', trainees: 25 },
        { name: 'Intermediate', duration: '6 weeks', status: 'active', trainees: 18 },
        { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
      ],
      mentor: 'John Mentor',
      totalTrainees: 43,
      status: 'active',
      createdAt: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop',
      // Add more detailed course information
      objectives: [
        'Learn React fundamentals and JSX',
        'Understand component lifecycle and state management',
        'Build real-world applications with React hooks',
        'Implement routing and state management with Redux'
      ],
      prerequisites: ['Basic JavaScript knowledge', 'HTML/CSS fundamentals'],
      materials: ['Online resources', 'Practice projects', 'Code examples'],
      schedule: 'Monday, Wednesday, Friday - 6:00 PM to 8:00 PM'
    },
    {
      id: 2,
      name: 'Testing Fundamentals',
      description: 'Comprehensive testing methodologies and tools',
      department: 'Testing',
      stages: [
        { name: 'Basics', duration: '3 weeks', status: 'active', trainees: 20 },
        { name: 'Intermediate', duration: '5 weeks', status: 'active', trainees: 15 },
        { name: 'Advanced', duration: '6 weeks', status: 'active', trainees: 12 }
      ],
      mentor: 'Sarah Mentor',
      totalTrainees: 47,
      status: 'active',
      createdAt: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop',
      objectives: [
        'Understand testing principles and methodologies',
        'Learn unit testing with Jest and React Testing Library',
        'Master integration and end-to-end testing',
        'Implement test-driven development practices'
      ],
      prerequisites: ['Basic programming knowledge', 'Understanding of software development lifecycle'],
      materials: ['Testing frameworks', 'Sample test cases', 'Best practices guide'],
      schedule: 'Tuesday, Thursday - 7:00 PM to 9:00 PM'
    },
    {
      id: 3,
      name: 'Cloud Computing',
      description: 'AWS, Azure, and Google Cloud platform training',
      department: 'Cloud Computing',
      stages: [
        { name: 'Basics', duration: '5 weeks', status: 'active', trainees: 30 },
        { name: 'Intermediate', duration: '7 weeks', status: 'draft', trainees: 0 },
        { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
      ],
      mentor: 'Mike Mentor',
      totalTrainees: 30,
      status: 'active',
      createdAt: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=120&fit=crop',
      objectives: [
        'Learn cloud computing fundamentals',
        'Master AWS core services and architecture',
        'Understand cloud security and best practices',
        'Deploy and manage applications in the cloud'
      ],
      prerequisites: ['Basic networking knowledge', 'Understanding of virtualization'],
      materials: ['AWS free tier account', 'Cloud labs', 'Architecture diagrams'],
      schedule: 'Monday, Wednesday - 5:00 PM to 7:00 PM'
    }
  ]);

  // Mock trainees data for each course
  const [courseTrainees, setCourseTrainees] = useState({
    1: [
      { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', stage: 'Basics', progress: 75, status: 'active', joinedDate: '2024-01-15' },
      { id: 2, name: 'Mike Chen', email: 'mike.c@example.com', stage: 'Intermediate', progress: 60, status: 'active', joinedDate: '2024-01-20' },
      { id: 3, name: 'Emily Brown', email: 'emily.b@example.com', stage: 'Basics', progress: 45, status: 'active', joinedDate: '2024-01-25' },
      { id: 4, name: 'Alex Turner', email: 'alex.t@example.com', stage: 'Advanced', progress: 0, status: 'pending', joinedDate: '2024-02-01' }
    ],
    2: [
      { id: 5, name: 'David Wilson', email: 'david.w@example.com', stage: 'Basics', progress: 80, status: 'active', joinedDate: '2024-01-20' },
      { id: 6, name: 'Lisa Wang', email: 'lisa.w@example.com', stage: 'Intermediate', progress: 70, status: 'active', joinedDate: '2024-01-25' },
      { id: 7, name: 'Tom Anderson', email: 'tom.a@example.com', stage: 'Advanced', progress: 55, status: 'active', joinedDate: '2024-02-01' }
    ],
    3: [
      { id: 8, name: 'Rachel Green', email: 'rachel.g@example.com', stage: 'Basics', progress: 65, status: 'active', joinedDate: '2024-02-05' },
      { id: 9, name: 'Chris Lee', email: 'chris.l@example.com', stage: 'Basics', progress: 40, status: 'active', joinedDate: '2024-02-10' }
    ]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // New state variables for enhanced functionality
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showTraineeManagement, setShowTraineeManagement] = useState(false);
  const [editingCourseDetails, setEditingCourseDetails] = useState(null);
  const [newTrainee, setNewTrainee] = useState({ name: '', email: '', stage: '' });

  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    department: '',
    mentor: '',
    stages: [
      { name: 'Basics', duration: '4 weeks', status: 'draft', trainees: 0 },
      { name: 'Intermediate', duration: '6 weeks', status: 'draft', trainees: 0 },
      { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
    ]
  });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description && newCourse.department && newCourse.mentor) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        status: 'active',
        totalTrainees: 0,
        createdAt: new Date().toISOString().split('T')[0],
        image: 'https://via.placeholder.com/200x120'
      };
      setCourses([...courses, course]);
      setNewCourse({
        name: '',
        description: '',
        department: '',
        mentor: '',
        stages: [
          { name: 'Basics', duration: '4 weeks', status: 'draft', trainees: 0 },
          { name: 'Intermediate', duration: '6 weeks', status: 'draft', trainees: 0 },
          { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
        ]
      });
      setShowAddModal(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ ...course });
    setShowAddModal(true);
  };

  const handleUpdateCourse = () => {
    if (editingCourse && newCourse.name && newCourse.description && newCourse.department && newCourse.mentor) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...newCourse } : c));
      setEditingCourse(null);
      setNewCourse({
        name: '',
        description: '',
        department: '',
        mentor: '',
        stages: [
          { name: 'Basics', duration: '4 weeks', status: 'draft', trainees: 0 },
          { name: 'Intermediate', duration: '6 weeks', status: 'draft', trainees: 0 },
          { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
        ]
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  // New handler functions for enhanced functionality
  const handleViewCourseDetails = (course) => {
    console.log('View Details clicked for course:', course);
    alert('View Details clicked for: ' + course.name);
    setSelectedCourse(course);
    setEditingCourseDetails({ ...course });
    setShowCourseDetails(true);
    console.log('showCourseDetails set to:', true);
  };

  const handleManageTrainees = (course) => {
    console.log('Manage Trainees clicked for course:', course);
    alert('Manage Trainees clicked for: ' + course.name);
    setSelectedCourse(course);
    setShowTraineeManagement(true);
    console.log('showTraineeManagement set to:', true);
  };

  const handleSaveCourseDetails = () => {
    if (editingCourseDetails) {
      setCourses(courses.map(c => 
        c.id === editingCourseDetails.id ? editingCourseDetails : c
      ));
      setShowCourseDetails(false);
      setEditingCourseDetails(null);
      setSelectedCourse(null);
    }
  };

  const handleAddTrainee = () => {
    if (newTrainee.name && newTrainee.email && newTrainee.stage) {
      const trainee = {
        id: Date.now(),
        ...newTrainee,
        progress: 0,
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      setCourseTrainees(prev => ({
        ...prev,
        [selectedCourse.id]: [...(prev[selectedCourse.id] || []), trainee]
      }));
      
      // Update course total trainees count
      setCourses(courses.map(c => 
        c.id === selectedCourse.id 
          ? { ...c, totalTrainees: c.totalTrainees + 1 }
          : c
      ));
      
      setNewTrainee({ name: '', email: '', stage: '' });
    }
  };

  const handleRemoveTrainee = (traineeId) => {
    if (window.confirm('Are you sure you want to remove this trainee?')) {
      setCourseTrainees(prev => ({
        ...prev,
        [selectedCourse.id]: prev[selectedCourse.id].filter(t => t.id !== traineeId)
      }));
      
      // Update course total trainees count
      setCourses(courses.map(c => 
        c.id === selectedCourse.id 
          ? { ...c, totalTrainees: Math.max(0, c.totalTrainees - 1) }
          : c
      ));
    }
  };

  const handleUpdateTraineeStage = (traineeId, newStage) => {
    setCourseTrainees(prev => ({
      ...prev,
      [selectedCourse.id]: prev[selectedCourse.id].map(t => 
        t.id === traineeId ? { ...t, stage: newStage } : t
      )
    }));
  };

  const toggleCourseStatus = (courseId) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
        : c
    ));
  };

  const toggleStageStatus = (courseId, stageIndex) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        const updatedStages = [...c.stages];
        updatedStages[stageIndex] = {
          ...updatedStages[stageIndex],
          status: updatedStages[stageIndex].status === 'active' ? 'draft' : 'active'
        };
        return { ...c, stages: updatedStages };
      }
      return c;
    }));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  // Debug logging
  console.log('Current state:', { showCourseDetails, showTraineeManagement, selectedCourse });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Create and manage courses with multiple stages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Departments</option>
            <option value="React Development">React Development</option>
            <option value="Testing">Testing</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="AIML">AIML</option>
            <option value="DotNet">DotNet</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>

          <div className="text-sm text-gray-500 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            {filteredCourses.length} courses found
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Course Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCourseStatus(course.id)}
                    className={course.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                  >
                    {course.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{course.description}</p>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary-600">{course.totalTrainees}</div>
                  <div className="text-xs text-gray-500">Trainees</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{course.stages.filter(s => s.status === 'active').length}</div>
                  <div className="text-xs text-gray-500">Active Stages</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{course.mentor.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">Mentor</div>
                </div>
              </div>

              {/* Course Stages */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Course Stages</h4>
                {course.stages.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageStatusColor(stage.status)}`}>
                        {stage.name}
                      </span>
                      <span className="text-xs text-gray-500">{stage.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{stage.trainees} trainees</span>
                      <button
                        onClick={() => toggleStageStatus(course.id, index)}
                        className={stage.status === 'active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {stage.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Actions */}
              <div className="mt-4 flex space-x-2">
                <button 
                  className="btn-secondary flex-1"
                  onClick={() => handleViewCourseDetails(course)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button 
                  className="btn-primary flex-1"
                  onClick={() => handleManageTrainees(course)}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Manage Trainees
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter course name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter course description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                      value={newCourse.department}
                      onChange={(e) => setNewCourse({...newCourse, department: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Department</option>
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
                      value={newCourse.mentor}
                      onChange={(e) => setNewCourse({...newCourse, mentor: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter mentor name"
                    />
                  </div>
                </div>

                {/* Course Stages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Stages</label>
                  <div className="space-y-2">
                    {newCourse.stages.map((stage, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 w-20">{stage.name}</span>
                        <input
                          type="text"
                          value={stage.duration}
                          onChange={(e) => {
                            const updatedStages = [...newCourse.stages];
                            updatedStages[index] = { ...stage, duration: e.target.value };
                            setNewCourse({...newCourse, stages: updatedStages});
                          }}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Duration"
                        />
                        <select
                          value={stage.status}
                          onChange={(e) => {
                            const updatedStages = [...newCourse.stages];
                            updatedStages[index] = { ...stage, status: e.target.value };
                            setNewCourse({...newCourse, stages: updatedStages});
                          }}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCourse(null);
                    setNewCourse({
                      name: '',
                      description: '',
                      department: '',
                      mentor: '',
                      stages: [
                        { name: 'Basics', duration: '4 weeks', status: 'draft', trainees: 0 },
                        { name: 'Intermediate', duration: '6 weeks', status: 'draft', trainees: 0 },
                        { name: 'Advanced', duration: '8 weeks', status: 'draft', trainees: 0 }
                      ]
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
                  className="btn-primary"
                >
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {console.log('Rendering Course Details Modal:', showCourseDetails, selectedCourse)}
      {showCourseDetails && selectedCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Course Details: {selectedCourse.name}</h3>
              <button
                onClick={() => setShowCourseDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Course Image and Basic Info */}
              <div className="flex space-x-6">
                <div className="w-64 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                      type="text"
                      value={editingCourseDetails?.name || ''}
                      onChange={(e) => setEditingCourseDetails({
                        ...editingCourseDetails,
                        name: e.target.value
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editingCourseDetails?.description || ''}
                      onChange={(e) => setEditingCourseDetails({
                        ...editingCourseDetails,
                        description: e.target.value
                      })}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input
                        type="text"
                        value={editingCourseDetails?.department || ''}
                        onChange={(e) => setEditingCourseDetails({
                          ...editingCourseDetails,
                          department: e.target.value
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mentor</label>
                      <input
                        type="text"
                        value={editingCourseDetails?.mentor || ''}
                        onChange={(e) => setEditingCourseDetails({
                          ...editingCourseDetails,
                          mentor: e.target.value
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Objectives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Objectives</label>
                <div className="space-y-2">
                  {editingCourseDetails?.objectives?.map((objective, index) => (
                    <input
                      key={index}
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const updatedObjectives = [...editingCourseDetails.objectives];
                        updatedObjectives[index] = e.target.value;
                        setEditingCourseDetails({
                          ...editingCourseDetails,
                          objectives: updatedObjectives
                        });
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ))}
                </div>
              </div>

              {/* Prerequisites and Materials */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
                  <div className="space-y-2">
                    {editingCourseDetails?.prerequisites?.map((prereq, index) => (
                      <input
                        key={index}
                        type="text"
                        value={prereq}
                        onChange={(e) => {
                          const updatedPrereqs = [...editingCourseDetails.prerequisites];
                          updatedPrereqs[index] = e.target.value;
                          setEditingCourseDetails({
                            ...editingCourseDetails,
                            prerequisites: updatedPrereqs
                          });
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
                  <div className="space-y-2">
                    {editingCourseDetails?.materials?.map((material, index) => (
                      <input
                        key={index}
                        type="text"
                        value={material}
                        onChange={(e) => {
                          const updatedMaterials = [...editingCourseDetails.materials];
                          updatedMaterials[index] = e.target.value;
                          setEditingCourseDetails({
                            ...editingCourseDetails,
                            materials: updatedMaterials
                          });
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  type="text"
                  value={editingCourseDetails?.schedule || ''}
                  onChange={(e) => setEditingCourseDetails({
                    ...editingCourseDetails,
                    schedule: e.target.value
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowCourseDetails(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCourseDetails}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trainee Management Modal */}
      {console.log('Rendering Trainee Management Modal:', showTraineeManagement, selectedCourse)}
      {showTraineeManagement && selectedCourse && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[900px] shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Manage Trainees: {selectedCourse.name}</h3>
              <button
                onClick={() => setShowTraineeManagement(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Add New Trainee */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Add New Trainee</h4>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Trainee Name"
                    value={newTrainee.name}
                    onChange={(e) => setNewTrainee({...newTrainee, name: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newTrainee.email}
                    onChange={(e) => setNewTrainee({...newTrainee, email: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <select
                    value={newTrainee.stage}
                    onChange={(e) => setNewTrainee({...newTrainee, stage: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Stage</option>
                    {selectedCourse.stages.map((stage, index) => (
                      <option key={index} value={stage.name}>{stage.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAddTrainee}
                  className="mt-3 btn-primary"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Trainee
                </button>
              </div>

              {/* Trainees List */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Current Trainees ({courseTrainees[selectedCourse.id]?.length || 0})</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courseTrainees[selectedCourse.id]?.map((trainee) => (
                        <tr key={trainee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trainee.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={trainee.stage}
                              onChange={(e) => handleUpdateTraineeStage(trainee.id, e.target.value)}
                              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                              {selectedCourse.stages.map((stage, index) => (
                                <option key={index} value={stage.name}>{stage.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${trainee.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500">{trainee.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              trainee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {trainee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.joinedDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRemoveTrainee(trainee.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <UserMinus className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={() => setShowTraineeManagement(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
