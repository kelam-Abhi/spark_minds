import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  X,
  Clock,
  Target,
  Users,
  BarChart3
} from 'lucide-react';

const MentorTestManagement = () => {
  const [tests, setTests] = useState([
    {
      id: 1,
      title: 'React Component Lifecycle Quiz',
      type: 'quiz',
      course: 'React Development',
      stage: 'Basics',
      description: 'Multiple choice quiz covering React component lifecycle methods',
      dueDate: '2024-01-25',
      status: 'active',
      totalTrainees: 25,
      submittedCount: 18,
      averageScore: 85,
      maxAttempts: 2,
      timeLimit: 30,
      passingScore: 70
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Test',
      type: 'test',
      course: 'JavaScript Basics',
      stage: 'Intermediate',
      description: 'Comprehensive test covering JavaScript fundamentals and ES6 features',
      dueDate: '2024-01-28',
      status: 'active',
      totalTrainees: 20,
      submittedCount: 15,
      averageScore: 78,
      maxAttempts: 1,
      timeLimit: 60,
      passingScore: 75
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [newTest, setNewTest] = useState({
    title: '',
    type: 'quiz',
    course: '',
    stage: '',
    description: '',
    dueDate: '',
    maxAttempts: 1,
    timeLimit: 30,
    passingScore: 70
  });

  const courses = ['React Development', 'JavaScript Basics', 'Database Design', 'Cloud Computing'];
  const stages = ['Basics', 'Intermediate', 'Advanced'];
  const testTypes = ['quiz', 'test', 'assignment'];

  const handleAddTest = () => {
    if (newTest.title && newTest.course && newTest.stage) {
      const test = {
        id: tests.length + 1,
        ...newTest,
        status: 'active',
        submittedCount: 0,
        averageScore: 0,
        totalTrainees: 0
      };
      setTests([...tests, test]);
      setNewTest({
        title: '',
        type: 'quiz',
        course: '',
        stage: '',
        description: '',
        dueDate: '',
        maxAttempts: 1,
        timeLimit: 30,
        passingScore: 70
      });
      setShowAddModal(false);
    }
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setNewTest({ ...test });
    setShowAddModal(true);
  };

  const handleUpdateTest = () => {
    if (editingTest && newTest.title && newTest.course && newTest.stage) {
      setTests(tests.map(t => t.id === editingTest.id ? { ...t, ...newTest } : t));
      setEditingTest(null);
      setNewTest({
        title: '',
        type: 'quiz',
        course: '',
        stage: '',
        description: '',
        dueDate: '',
        maxAttempts: 1,
        timeLimit: 30,
        passingScore: 70
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteTest = (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setTests(tests.filter(t => t.id !== testId));
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || test.course === filterCourse;
    const matchesType = filterType === 'all' || test.type === filterType;
    return matchesSearch && matchesCourse && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'test': return 'bg-green-100 text-green-800';
      case 'assignment': return 'bg-purple-100 text-purple-800';
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Management</h1>
          <p className="text-gray-600">Create and manage quizzes, tests, and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Test
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(tests.reduce((sum, t) => sum + t.averageScore, 0) / tests.length)}%
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
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {tests.reduce((sum, t) => sum + t.submittedCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Tests</p>
              <p className="text-2xl font-bold text-gray-900">
                {tests.filter(t => t.status === 'active').length}
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
                placeholder="Search tests..."
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
            {testTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tests & Assignments</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course & Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{test.title}</div>
                      <div className="text-sm text-gray-500">{test.description.substring(0, 60)}...</div>
                      <div className="text-sm text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {test.timeLimit} min • 
                        <Target className="w-3 h-3 inline mx-1" />
                        {test.passingScore}% pass
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(test.type)}`}>
                      {test.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{test.course}</div>
                      <div className="text-gray-500">{test.stage}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(test.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Score: {test.averageScore}%</div>
                      <div>Submissions: {test.submittedCount}/{test.totalTrainees}</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(test.submittedCount / test.totalTrainees) * 100 || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTest(test)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Test Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTest ? 'Edit Test' : 'Create New Test'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTest(null);
                  setNewTest({
                    title: '',
                    type: 'quiz',
                    course: '',
                    stage: '',
                    description: '',
                    dueDate: '',
                    maxAttempts: 1,
                    timeLimit: 30,
                    passingScore: 70
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
                    Test Title *
                  </label>
                  <input
                    type="text"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter test title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Type *
                  </label>
                  <select
                    value={newTest.type}
                    onChange={(e) => setNewTest({...newTest, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {testTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    value={newTest.course}
                    onChange={(e) => setNewTest({...newTest, course: e.target.value})}
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
                    value={newTest.stage}
                    onChange={(e) => setNewTest({...newTest, stage: e.target.value})}
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
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={newTest.dueDate}
                    onChange={(e) => setNewTest({...newTest, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={newTest.timeLimit}
                    onChange={(e) => setNewTest({...newTest, timeLimit: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="5"
                    max="300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Attempts
                  </label>
                  <input
                    type="number"
                    value={newTest.maxAttempts}
                    onChange={(e) => setNewTest({...newTest, maxAttempts: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    value={newTest.passingScore}
                    onChange={(e) => setNewTest({...newTest, passingScore: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newTest.description}
                  onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the test content and objectives"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTest(null);
                  setNewTest({
                    title: '',
                    type: 'quiz',
                    course: '',
                    stage: '',
                    description: '',
                    dueDate: '',
                    maxAttempts: 1,
                    timeLimit: 30,
                    passingScore: 70
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={editingTest ? handleUpdateTest : handleAddTest}
                className="btn-primary"
              >
                {editingTest ? 'Update Test' : 'Create Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorTestManagement;
