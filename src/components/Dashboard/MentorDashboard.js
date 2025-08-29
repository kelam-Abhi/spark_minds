import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  Plus,
  UserPlus,
  ClipboardList,
  Video,
  MessageSquare,
  Settings,
  FileText,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const MentorDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for mentor dashboard
  const [courses] = useState([
    {
      id: 1,
      name: 'React Development',
      department: 'Frontend Development',
      mentor: 'John Doe',
      totalTrainees: 15,
      activeTrainees: 12,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Node.js Backend',
      department: 'Backend Development',
      mentor: 'John Doe',
      totalTrainees: 18,
      activeTrainees: 16,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Database Design',
      department: 'Database',
      mentor: 'John Doe',
      totalTrainees: 10,
      activeTrainees: 8,
      status: 'Active'
    }
  ]);

  const [trainees] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      course: 'React Development',
      progress: 75,
      status: 'Active',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      course: 'Node.js Backend',
      progress: 60,
      status: 'Active',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      course: 'Database Design',
      progress: 90,
      status: 'Active',
      lastActive: '3 hours ago'
    }
  ]);

  const [tasks] = useState([
    {
      id: 1,
      title: 'Build React Component',
      trainee: 'Alice Johnson',
      course: 'React Development',
      dueDate: '2024-01-15',
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 2,
      title: 'API Endpoint Development',
      trainee: 'Bob Smith',
      course: 'Node.js Backend',
      dueDate: '2024-01-20',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Database Schema Design',
      trainee: 'Carol Davis',
      course: 'Database Design',
      dueDate: '2024-01-18',
      status: 'Completed',
      priority: 'High'
    }
  ]);

  const [classes] = useState([
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      course: 'React Development',
      type: 'Virtual',
      date: '2024-01-15',
      time: '10:00 AM',
      attendees: 12,
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Express.js Middleware',
      course: 'Node.js Backend',
      type: 'Manual',
      date: '2024-01-16',
      time: '2:00 PM',
      attendees: 16,
      status: 'Scheduled'
    },
    {
      id: 3,
      title: 'SQL Optimization',
      course: 'Database Design',
      type: 'Virtual',
      date: '2024-01-17',
      time: '11:00 AM',
      attendees: 8,
      status: 'Scheduled'
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      message: 'Alice Johnson submitted task: Build React Component',
      type: 'task',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      message: 'New trainee enrolled in React Development course',
      type: 'enrollment',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      message: 'Class "React Hooks Deep Dive" starts in 30 minutes',
      type: 'reminder',
      time: '30 minutes ago',
      read: true
    }
  ]);

  // Calculate statistics
  const calculateStats = () => {
    const totalTrainees = trainees.length;
    const activeCourses = courses.filter(course => course.status === 'Active').length;
    const scheduledClasses = classes.filter(cls => cls.status === 'Scheduled').length;
    const avgProgress = trainees.length > 0 
      ? Math.round(trainees.reduce((sum, trainee) => sum + trainee.progress, 0) / trainees.length)
      : 0;

    return [
      {
        title: 'Total Trainees',
        value: totalTrainees,
        icon: Users,
        color: 'bg-blue-500',
        detail: `${totalTrainees} trainees enrolled`
      },
      {
        title: 'Active Courses',
        value: activeCourses,
        icon: BookOpen,
        color: 'bg-green-500',
        detail: `${activeCourses} courses running`
      },
      {
        title: 'Scheduled Classes',
        value: scheduledClasses,
        icon: Calendar,
        color: 'bg-purple-500',
        detail: `${scheduledClasses} classes upcoming`
      },
      {
        title: 'Avg. Progress',
        value: `${avgProgress}%`,
        icon: BarChart3,
        color: 'bg-orange-500',
        detail: `Overall trainee progress`
      }
    ];
  };

  const stats = calculateStats();

  // Navigation handlers
  const handleCreateTrainee = () => {
    navigate('/mentor-dashboard/create-trainee');
  };

  const handleAssignTask = () => {
    navigate('/mentor-dashboard/assign-task');
  };

  const handleScheduleClass = () => {
    navigate('/mentor-dashboard/schedule-class');
  };

  const handleViewReports = () => {
    navigate('/mentor-dashboard/reports');
  };

  const handleManageCourses = () => {
    navigate('/mentor-dashboard/create-trainee');
  };

  const handleManageTrainees = () => {
    navigate('/mentor-dashboard/create-trainee');
  };

  const handleViewNotifications = () => {
    navigate('/mentor-dashboard/notifications');
  };

  const handleViewTasks = () => {
    navigate('/mentor-dashboard/assign-task');
  };

  const handleViewClasses = () => {
    navigate('/mentor-dashboard/classes');
  };

  const handleViewTraineeProfile = (traineeId) => {
    navigate('/mentor-dashboard/create-trainee');
  };

  const handleViewCourseDetails = (courseId) => {
    navigate('/mentor-dashboard/create-trainee');
  };

  const handleReviewTask = (taskId) => {
    navigate('/mentor-dashboard/assign-task');
  };

  const handleMessageTrainee = (traineeId) => {
    navigate('/mentor-dashboard/create-trainee');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">Welcome back, John Doe! Manage your trainees, courses, and classes.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Primary Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleCreateTrainee}
              className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
            >
              <UserPlus className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Create Trainee</span>
              <span className="text-sm text-gray-500 text-center">Add new trainees to courses</span>
            </button>

            <button
              onClick={handleAssignTask}
              className="flex flex-col items-center p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
            >
              <ClipboardList className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Assign Task</span>
              <span className="text-sm text-gray-500 text-center">Create and assign tasks</span>
            </button>

            <button
              onClick={handleScheduleClass}
              className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group"
            >
              <Calendar className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Schedule Class</span>
              <span className="text-sm text-gray-500 text-center">Virtual or manual classes</span>
            </button>

            <button
              onClick={handleViewReports}
              className="flex flex-col items-center p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group"
            >
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">View Reports</span>
              <span className="text-sm text-gray-500 text-center">Analytics and insights</span>
            </button>

            <button
              onClick={() => navigate('/mentor-dashboard/create-test')}
              className="flex flex-col items-center p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors group"
            >
              <FileText className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Create Test</span>
              <span className="text-sm text-gray-500 text-center">Quizzes and assignments</span>
            </button>
          </div>
        </div>

        {/* Secondary Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            Secondary Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleManageCourses}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            >
              <BookOpen className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Manage Courses</span>
              <span className="text-sm text-gray-500 text-center">Course details and settings</span>
            </button>

            <button
              onClick={handleManageTrainees}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            >
              <Users className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Manage Trainees</span>
              <span className="text-sm text-gray-500 text-center">Trainee profiles and progress</span>
            </button>

            <button
              onClick={handleViewNotifications}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            >
              <Bell className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Notifications</span>
              <span className="text-sm text-gray-500 text-center">View all notifications</span>
            </button>

            <button
              onClick={handleViewTasks}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            >
              <ClipboardList className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">View Tasks</span>
              <span className="text-sm text-gray-500 text-center">All assigned tasks</span>
            </button>

            <button
              onClick={() => navigate('/mentor-dashboard/tests')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            >
              <FileText className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">View Tests</span>
              <span className="text-sm text-gray-500 text-center">All tests and quizzes</span>
            </button>
          </div>
        </div>

        {/* Quick Analytics Access */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Quick Analytics Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/mentor-dashboard/reports/trainee-analytics')}
              className="flex items-center p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
            >
              <Users className="h-6 w-6 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-medium text-gray-900">Trainee Analytics</span>
                <span className="block text-sm text-gray-500">Progress and performance metrics</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/mentor-dashboard/reports/course-analytics')}
              className="flex items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
            >
              <BookOpen className="h-6 w-6 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-medium text-gray-900">Course Analytics</span>
                <span className="block text-sm text-gray-500">Course effectiveness and engagement</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/mentor-dashboard/reports/class-analytics')}
              className="flex items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group"
            >
              <Calendar className="h-6 w-6 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-medium text-gray-900">Class Analytics</span>
                <span className="block text-sm text-gray-500">Attendance and participation data</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tasks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
              <button
                onClick={handleViewTasks}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.trainee} • {task.course}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                    <button
                      onClick={() => handleReviewTask(task.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Classes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Classes</h3>
              <button
                onClick={handleViewClasses}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {classes.slice(0, 3).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{cls.title}</p>
                    <p className="text-sm text-gray-600">{cls.course} • {cls.date} {cls.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cls.type === 'Virtual' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {cls.type}
                    </span>
                    <span className="text-sm text-gray-600">{cls.attendees} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
            <button
              onClick={handleViewNotifications}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className={`flex items-center p-3 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  notification.read ? 'bg-gray-400' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  notification.type === 'task' ? 'bg-green-100 text-green-800' :
                  notification.type === 'enrollment' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {notification.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Calculations Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Calculations Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Trainee Metrics</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Total Trainees: {trainees.length} (from trainees array)</li>
                <li>• Active Trainees: {trainees.filter(t => t.status === 'Active').length}</li>
                <li>• Average Progress: {Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length)}%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Course & Class Metrics</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Active Courses: {courses.filter(c => c.status === 'Active').length}</li>
                <li>• Scheduled Classes: {classes.filter(c => c.status === 'Scheduled').length}</li>
                <li>• Virtual Classes: {classes.filter(c => c.type === 'Virtual').length}</li>
                <li>• Manual Classes: {classes.filter(c => c.type === 'Manual').length}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
