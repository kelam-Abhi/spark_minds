import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Play,
  Pause,
  BookOpen,
  Calendar
} from 'lucide-react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'React Component Lifecycle Quiz',
      type: 'quiz',
      course: 'React Development',
      stage: 'Basics',
      mentor: 'John Mentor',
      dueDate: '2024-03-25',
      status: 'active',
      totalTrainees: 25,
      submittedCount: 18,
      averageScore: 85,
      description: 'Multiple choice quiz covering React component lifecycle methods'
    },
    {
      id: 2,
      title: 'Build a Todo App',
      type: 'coding',
      course: 'React Development',
      stage: 'Intermediate',
      mentor: 'John Mentor',
      dueDate: '2024-03-28',
      status: 'active',
      totalTrainees: 18,
      submittedCount: 12,
      averageScore: 78,
      description: 'Create a complete todo application using React hooks and state management'
    },
    {
      id: 3,
      title: 'Testing Fundamentals Assignment',
      type: 'assignment',
      course: 'Testing',
      stage: 'Basics',
      mentor: 'Sarah Mentor',
      dueDate: '2024-03-30',
      status: 'active',
      totalTrainees: 20,
      submittedCount: 15,
      averageScore: 82,
      description: 'Write test cases for a simple calculator function'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newTask, setNewTask] = useState({
    title: '',
    type: 'quiz',
    course: '',
    stage: '',
    mentor: '',
    dueDate: '',
    description: '',
    totalTrainees: 0,
    maxAttempts: 3,
    timeLimit: 60,
    passingScore: 70,
    instructions: '',
    attachments: []
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.course && newTask.stage && newTask.mentor && newTask.dueDate) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        status: 'active',
        submittedCount: 0,
        averageScore: 0
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        type: 'quiz',
        course: '',
        stage: '',
        mentor: '',
        dueDate: '',
        description: '',
        totalTrainees: 0
      });
      setShowAddModal(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ ...task });
    setShowAddModal(true);
  };

  const handleUpdateTask = () => {
    if (editingTask && newTask.title && newTask.course && newTask.stage && newTask.mentor && newTask.dueDate) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
      setEditingTask(null);
      setNewTask({
        title: '',
        type: 'quiz',
        course: '',
        stage: '',
        mentor: '',
        dueDate: '',
        description: '',
        totalTrainees: 0
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' }
        : t
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || task.course === filterCourse;
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesCourse && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'coding': return 'bg-purple-100 text-purple-800';
      case 'assignment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'coding': return '💻';
      case 'assignment': return '📋';
      default: return '📄';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Create and manage tasks, tests, and coding assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
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
            <option value="quiz">Quiz</option>
            <option value="coding">Coding</option>
            <option value="assignment">Assignment</option>
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
            <ClipboardList className="w-4 h-4 mr-2" />
            {filteredTasks.length} tasks found
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Task Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(task.type)}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`flex items-center ${task.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                  >
                    {task.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="flex items-center text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex items-center text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{task.description}</p>

              {/* Task Badges */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(task.type)}`}>
                  {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>

              {/* Task Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{task.course}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{task.mentor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Due: {formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Stage: {task.stage}</span>
                </div>
              </div>
            </div>

            {/* Task Stats and Actions */}
            <div className="p-6">
              {/* Submission Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary-600">{task.totalTrainees}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{task.submittedCount}</div>
                  <div className="text-xs text-gray-500">Submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{task.averageScore}%</div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Submissions</span>
                  <span>{Math.round((task.submittedCount / task.totalTrainees) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(task.submittedCount / task.totalTrainees) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Task Actions */}
              <div className="flex space-x-2">
                <button className="flex items-center bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex-1">
                  <Users className="w-4 h-4 mr-1" />
                  Manage Submissions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task Type</label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="quiz">Quiz</option>
                      <option value="coding">Coding</option>
                      <option value="assignment">Assignment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                      value={newTask.course}
                      onChange={(e) => setNewTask({...newTask, course: e.target.value})}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stage</label>
                    <select
                      value={newTask.stage}
                      onChange={(e) => setNewTask({...newTask, stage: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Stage</option>
                      <option value="Basics">Basics</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mentor</label>
                    <input
                      type="text"
                      value={newTask.mentor}
                      onChange={(e) => setNewTask({...newTask, mentor: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter mentor name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Trainees</label>
                    <input
                      type="number"
                      value={newTask.totalTrainees}
                      onChange={(e) => setNewTask({...newTask, totalTrainees: parseInt(e.target.value)})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTask(null);
                    setNewTask({
                      title: '',
                      type: 'quiz',
                      course: '',
                      stage: '',
                      mentor: '',
                      dueDate: '',
                      description: '',
                      totalTrainees: 0
                    });
                  }}
                  className="flex items-center bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={editingTask ? handleUpdateTask : handleAddTask}
                  className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
