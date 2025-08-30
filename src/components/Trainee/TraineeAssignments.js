import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, FileText, Code, Upload, CheckCircle, Clock, AlertCircle, Eye, Download, Send, Plus, BookOpen, User, Target } from 'lucide-react';

const TraineeAssignments = () => {
  const { user } = useAuth(); // Get user data from AuthContext
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Mock data for assignments - all courses
  const allPendingAssignments = [
    // React Development Assignments
    {
      id: 1,
      title: 'Build a Todo App',
      type: 'Coding',
      course: 'React Development',
      dueDate: '2024-01-20',
      status: 'In Progress',
      progress: 60,
      description: 'Create a fully functional Todo application using React hooks and local storage',
      requirements: ['Use functional components', 'Implement CRUD operations', 'Add local storage', 'Responsive design'],
      estimatedTime: '4 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'React Component Library',
      type: 'Coding',
      course: 'React Development',
      dueDate: '2024-01-22',
      status: 'Not Started',
      progress: 0,
      description: 'Create a reusable component library with Storybook documentation',
      requirements: ['10+ reusable components', 'Storybook stories', 'TypeScript support', 'Unit tests'],
      estimatedTime: '8 hours',
      difficulty: 'Advanced'
    },
    // Testing Fundamentals Assignments
    {
      id: 3,
      title: 'API Testing Suite',
      type: 'Project',
      course: 'Testing Fundamentals',
      dueDate: '2024-01-18',
      status: 'Not Started',
      progress: 0,
      description: 'Develop a comprehensive testing suite for REST API endpoints',
      requirements: ['Unit tests for all endpoints', 'Integration tests', 'Mock data setup', 'Test coverage report'],
      estimatedTime: '6 hours',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'Test Automation Framework',
      type: 'Coding',
      course: 'Testing Fundamentals',
      dueDate: '2024-01-25',
      status: 'In Progress',
      progress: 40,
      description: 'Build a test automation framework using Selenium and Python',
      requirements: ['Page Object Model', 'Test data management', 'Reporting system', 'Cross-browser support'],
      estimatedTime: '10 hours',
      difficulty: 'Advanced'
    },
    // DotNet Development Assignments
    {
      id: 5,
      title: 'Web API with Entity Framework',
      type: 'Coding',
      course: 'DotNet Development',
      dueDate: '2024-01-20',
      status: 'Not Started',
      progress: 0,
      description: 'Create a RESTful Web API using ASP.NET Core and Entity Framework',
      requirements: ['CRUD operations', 'Database relationships', 'Authentication', 'Swagger documentation'],
      estimatedTime: '12 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'Blazor Server App',
      type: 'Coding',
      course: 'DotNet Development',
      dueDate: '2024-01-28',
      status: 'Not Started',
      progress: 0,
      description: 'Build a Blazor Server application with real-time updates',
      requirements: ['SignalR integration', 'User authentication', 'Database operations', 'Responsive UI'],
      estimatedTime: '15 hours',
      difficulty: 'Advanced'
    }
  ];

  // Filter assignments based on user's enrolled course
  const pendingAssignments = allPendingAssignments.filter(
    assignment => assignment.course === user?.enrolledCourse
  );

  const allCompletedAssignments = [
    // React Development Completed
    {
      id: 1,
      title: 'React Hooks Basics',
      type: 'Coding',
      course: 'React Development',
      submittedDate: '2024-01-10',
      score: 95,
      feedback: 'Excellent work! The components are well-structured and follow best practices. Great use of TypeScript.',
      mentor: 'Dr. Sarah Johnson'
    },
    // Testing Fundamentals Completed
    {
      id: 2,
      title: 'Testing Fundamentals Quiz',
      type: 'Test',
      course: 'Testing Fundamentals',
      submittedDate: '2024-01-08',
      score: 88,
      feedback: 'Good understanding of testing concepts. Consider exploring more advanced testing patterns.',
      mentor: 'Prof. Mike Chen'
    },
    // DotNet Development Completed
    {
      id: 3,
      title: 'C# Fundamentals',
      type: 'Coding',
      course: 'DotNet Development',
      submittedDate: '2024-01-05',
      score: 92,
      feedback: 'Great understanding of C# basics. Your code is clean and well-organized.',
      mentor: 'Prof. David Wilson'
    }
  ];

  // Filter completed assignments based on user's enrolled course
  const completedAssignments = allCompletedAssignments.filter(
    assignment => assignment.course === user?.enrolledCourse
  );

  const allUpcomingTests = [
    // React Development Tests
    {
      id: 1,
      title: 'React Hooks Assessment',
      course: 'React Development',
      date: '2024-01-22',
      duration: '60 min',
      questions: 25,
      topics: ['useState', 'useEffect', 'useContext', 'Custom hooks'],
      instructions: 'This is an open-book test. You can refer to React documentation.'
    },
    {
      id: 2,
      title: 'React State Management',
      course: 'React Development',
      date: '2024-01-26',
      duration: '45 min',
      questions: 20,
      topics: ['Redux', 'Context API', 'useReducer', 'State patterns'],
      instructions: 'Practical test focusing on state management concepts.'
    },
    // Testing Fundamentals Tests
    {
      id: 3,
      title: 'Testing Best Practices',
      course: 'Testing Fundamentals',
      date: '2024-01-24',
      duration: '45 min',
      questions: 20,
      topics: ['Unit testing', 'Integration testing', 'Mocking', 'Test coverage'],
      instructions: 'Practical test with coding questions. Ensure your development environment is ready.'
    },
    // DotNet Development Tests
    {
      id: 4,
      title: 'C# Advanced Concepts',
      course: 'DotNet Development',
      date: '2024-01-23',
      duration: '90 min',
      questions: 30,
      topics: ['LINQ', 'Async/Await', 'Generics', 'Delegates'],
      instructions: 'Advanced C# concepts test. No external resources allowed.'
    }
  ];

  // Filter tests based on user's enrolled course
  const upcomingTests = allUpcomingTests.filter(
    test => test.course === user?.enrolledCourse
  );

  const handleStartAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    // Navigate to assignment workspace
    console.log('Starting assignment:', assignment.title);
  };

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
  };

  const handleViewFeedback = (assignment) => {
    // Show feedback modal
    console.log('Viewing feedback for:', assignment.title);
  };

  const handleDownloadAssignment = (assignment) => {
    // Handle download logic
    console.log('Downloading assignment:', assignment.title);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Assignments</h1>
        <p className="text-gray-600">Track, submit, and review your assignments and tests</p>
        {user?.enrolledCourse && (
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <BookOpen className="h-4 w-4 mr-2" />
              Enrolled in: {user.enrolledCourse}
            </div>
            {user?.assignedMentor && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <User className="h-4 w-4 mr-2" />
                Mentor: {user.assignedMentor}
              </div>
            )}
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              <Target className="h-4 w-4 mr-2" />
              Single Course System
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingAssignments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedAssignments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingTests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedAssignments.length > 0 
                  ? Math.round(completedAssignments.reduce((sum, a) => sum + a.score, 0) / completedAssignments.length)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['pending', 'completed', 'tests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Pending Assignments Tab */}
          {activeTab === 'pending' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Assignments</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{assignment.title}</h4>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(assignment.difficulty)}`}>
                            {assignment.difficulty}
                          </span>
                          {isOverdue(assignment.dueDate) && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Course:</span>
                            <p className="font-medium">{assignment.course}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Type:</span>
                            <p className="font-medium">{assignment.type}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Due Date:</span>
                            <p className={`font-medium ${isOverdue(assignment.dueDate) ? 'text-red-600' : ''}`}>
                              {assignment.dueDate}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Est. Time:</span>
                            <p className="font-medium">{assignment.estimatedTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-600">{assignment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(assignment.progress)}`}
                          style={{ width: `${assignment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Requirements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {assignment.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-start space-x-4 mt-4">
                      {assignment.progress === 0 ? (
                        <button
                          onClick={() => handleStartAssignment(assignment)}
                          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Start Assignment
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSubmitAssignment(assignment)}
                          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Assignment
                        </button>
                      )}
                      <button className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200 font-medium">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Assignments Tab */}
          {activeTab === 'completed' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed Assignments</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {completedAssignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{assignment.title}</h4>
                        <p className="text-gray-600">{assignment.course}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                            Submitted {assignment.submittedDate}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {assignment.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{assignment.score}%</div>
                        <div className="text-sm text-gray-500">Score</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Feedback from {assignment.mentor}:</h5>
                      <p className="text-gray-600 bg-white p-3 rounded-lg border">{assignment.feedback}</p>
                    </div>

                    <div className="flex items-center justify-start space-x-4 mt-4">
                      <button
                        onClick={() => handleViewFeedback(assignment)}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      <button className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition-colors duration-200 font-medium">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Tests</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search tests..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h4>
                        <p className="text-gray-600">{test.course}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{test.duration}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{test.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Questions:</span>
                        <span className="font-medium">{test.questions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Topics:</span>
                        <span className="font-medium">{test.topics.length}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Topics Covered:</h5>
                      <div className="flex flex-wrap gap-2">
                        {test.topics.map((topic, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                      <p className="text-sm text-gray-600">{test.instructions}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Start Test
                      </button>
                      <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeAssignments;
