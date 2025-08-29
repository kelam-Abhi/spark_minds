import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  MoreVertical,
  Bell,
  Settings,
  User,
  ClipboardList,
  BarChart3,
  MessageSquare,
  FileText,
  GraduationCap
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/admin-dashboard/users');
  };

  const handleCreateCourse = () => {
    navigate('/admin-dashboard/courses');
  };

  const handleManageUsers = () => {
    navigate('/admin-dashboard/users');
  };

  const handleManageCourses = () => {
    navigate('/admin-dashboard/courses');
  };

  const handleScheduleClasses = () => {
    navigate('/admin-dashboard/classes');
  };

  const handleViewReports = () => {
    navigate('/admin-dashboard/reports');
  };

  // Additional quick action handlers
  const handleTaskManagement = () => {
    navigate('/admin-dashboard/tasks');
  };

  const handleNotifications = () => {
    navigate('/admin-dashboard/notifications');
  };

  const handleSettings = () => {
    navigate('/admin-dashboard/settings');
  };

  const handleAdminProfile = () => {
    navigate('/admin-dashboard/profile');
  };

  const handleUserAnalytics = () => {
    navigate('/admin-dashboard/reports');
  };

  const handleCourseAnalytics = () => {
    navigate('/admin-dashboard/reports');
  };

  const handleClassAnalytics = () => {
    navigate('/admin-dashboard/reports');
  };

  try {
    // Mock data for charts
    const courseData = [
      { name: 'React', value: 35, color: '#3B82F6' },
      { name: 'Testing', value: 25, color: '#10B981' },
      { name: 'Cloud', value: 20, color: '#F59E0B' },
      { name: 'AIML', value: 15, color: '#EF4444' },
      { name: 'DotNet', value: 5, color: '#8B5CF6' }
    ];

    const performanceData = [
      { month: 'Jan', trainees: 45, completion: 78 },
      { month: 'Feb', trainees: 52, completion: 82 },
      { month: 'Mar', trainees: 48, completion: 75 },
      { month: 'Apr', trainees: 58, completion: 88 },
      { month: 'May', trainees: 55, completion: 85 },
      { month: 'Jun', trainees: 62, completion: 90 }
    ];

    const recentActivities = [
      { id: 1, action: 'New trainee enrolled', user: 'Sarah Johnson', course: 'React Basics', time: '2 hours ago' },
      { id: 2, action: 'Course completed', user: 'Mike Chen', course: 'Testing Intermediate', time: '4 hours ago' },
      { id: 3, action: 'New mentor assigned', user: 'David Wilson', course: 'Cloud Advanced', time: '6 hours ago' },
      { id: 4, action: 'Task submitted', user: 'Emily Brown', course: 'AIML Basics', time: '8 hours ago' },
      { id: 5, action: 'Class scheduled', user: 'Alex Turner', course: 'DotNet Intermediate', time: '1 day ago' }
    ];

    // Real-time calculations based on actual data
    // Mock course data (in real app, this would come from API/database)
    const courses = [
      {
        id: 1,
        name: 'React Development',
        status: 'active',
        totalTrainees: 43,
        stages: [
          { name: 'Basics', status: 'active', trainees: 25 },
          { name: 'Intermediate', status: 'active', trainees: 18 },
          { name: 'Advanced', status: 'draft', trainees: 0 }
        ]
      },
      {
        id: 2,
        name: 'Testing Fundamentals',
        status: 'active',
        totalTrainees: 47,
        stages: [
          { name: 'Basics', status: 'active', trainees: 20 },
          { name: 'Intermediate', status: 'active', trainees: 15 },
          { name: 'Advanced', status: 'active', trainees: 12 }
        ]
      },
      {
        id: 3,
        name: 'Cloud Computing',
        status: 'active',
        totalTrainees: 30,
        stages: [
          { name: 'Basics', status: 'active', trainees: 30 },
          { name: 'Intermediate', status: 'draft', trainees: 0 },
          { name: 'Advanced', status: 'draft', trainees: 0 }
        ]
      },
      {
        id: 4,
        name: 'AIML Basics',
        status: 'active',
        totalTrainees: 35,
        stages: [
          { name: 'Basics', status: 'active', trainees: 35 },
          { name: 'Intermediate', status: 'draft', trainees: 0 },
          { name: 'Advanced', status: 'draft', trainees: 0 }
        ]
      },
      {
        id: 5,
        name: 'DotNet Development',
        status: 'active',
        totalTrainees: 28,
        stages: [
          { name: 'Basics', status: 'active', trainees: 28 },
          { name: 'Intermediate', status: 'draft', trainees: 0 },
          { name: 'Advanced', status: 'draft', trainees: 0 }
        ]
      }
    ];

    // Mock trainee progress data for performance calculation
    const traineeProgress = [
      // React Development trainees
      { courseId: 1, progress: [75, 60, 45, 0, 80, 65, 70, 55, 40, 35, 50, 60, 70, 80, 45, 55, 65, 75, 85, 40, 50, 60, 70, 80, 90, 45, 55, 65, 75, 85, 95, 50, 60, 70, 80, 90, 100, 55, 65, 75, 85, 95, 100] },
      // Testing Fundamentals trainees
      { courseId: 2, progress: [80, 70, 55, 65, 75, 85, 45, 55, 65, 75, 85, 95, 50, 60, 70, 80, 90, 100, 55, 65, 75, 85, 95, 100, 60, 70, 80, 90, 100, 100, 65, 75, 85, 95, 100, 100, 70, 80, 90, 100, 100, 100, 75, 85, 95, 100, 100, 100, 100] },
      // Cloud Computing trainees
      { courseId: 3, progress: [65, 40, 70, 80, 45, 55, 65, 75, 85, 50, 60, 70, 80, 90, 55, 65, 75, 85, 95, 60, 70, 80, 90, 100, 65, 75, 85, 95, 100, 100] },
      // AIML Basics trainees
      { courseId: 4, progress: [70, 80, 45, 55, 65, 75, 85, 50, 60, 70, 80, 90, 55, 65, 75, 85, 95, 60, 70, 80, 90, 100, 65, 75, 85, 95, 100, 70, 80, 90, 100, 75, 85, 95, 100, 100] },
      // DotNet Development trainees
      { courseId: 5, progress: [75, 85, 50, 60, 70, 80, 90, 55, 65, 75, 85, 95, 60, 70, 80, 90, 100, 65, 75, 85, 95, 100, 70, 80, 90, 100, 100, 75, 85, 95, 100, 100, 100] }
    ];

    // Calculate real-time statistics
    const calculateStats = () => {
      // Total Users (Trainees + Mentors + Admins)
      const totalTrainees = courses.reduce((sum, course) => sum + course.totalTrainees, 0);
      const totalMentors = courses.length; // Each course has 1 mentor
      const totalAdmins = 3; // Assuming 3 admin users
      const totalUsers = totalTrainees + totalMentors + totalAdmins;

      // Active Courses
      const activeCourses = courses.filter(course => course.status === 'active').length;

      // Scheduled Classes (Active stages across all courses)
      const scheduledClasses = courses.reduce((sum, course) => {
        return sum + course.stages.filter(stage => stage.status === 'active').length;
      }, 0);

      // Average Performance (based on trainee progress)
      const allProgress = traineeProgress.flatMap(course => course.progress);
      const averagePerformance = allProgress.length > 0 
        ? Math.round(allProgress.reduce((sum, progress) => sum + progress, 0) / allProgress.length)
        : 0;

      // Calculate month-over-month changes
      const lastMonthUsers = Math.floor(totalUsers * 0.88); // 12% increase
      const lastMonthCourses = Math.floor(activeCourses * 0.8); // 3 course increase
      const lastMonthClasses = Math.floor(scheduledClasses * 0.82); // 5 class increase
      const lastMonthPerformance = Math.floor(averagePerformance * 0.97); // 2.5% increase

      return [
        { 
          name: 'Total Users', 
          value: totalUsers.toLocaleString(), 
          change: `+${totalUsers - lastMonthUsers}`, 
          changeType: 'positive', 
          icon: Users,
          detail: `${totalTrainees} Trainees, ${totalMentors} Mentors, ${totalAdmins} Admins`
        },
        { 
          name: 'Active Courses', 
          value: activeCourses.toString(), 
          change: `+${activeCourses - lastMonthCourses}`, 
          changeType: 'positive', 
          icon: BookOpen,
          detail: `${courses.filter(c => c.status === 'active').length} Active, ${courses.filter(c => c.status === 'draft').length} Draft`
        },
        { 
          name: 'Scheduled Classes', 
          value: scheduledClasses.toString(), 
          change: `+${scheduledClasses - lastMonthClasses}`, 
          changeType: 'positive', 
          icon: Calendar,
          detail: `${scheduledClasses} Active Stages across all courses`
        },
        { 
          name: 'Avg. Performance', 
          value: `${averagePerformance}%`, 
          change: `+${averagePerformance - lastMonthPerformance}%`, 
          changeType: 'positive', 
          icon: TrendingUp,
          detail: `Based on ${allProgress.length} trainee progress records`
        }
      ];
    };

    const stats = calculateStats();

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your learning management system</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary" onClick={handleAddUser}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
            <button className="btn-primary" onClick={handleCreateCourse}>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                    <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                  {stat.detail && (
                    <p className="text-xs text-gray-400 mt-1">{stat.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Calculations Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Calculations Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">User Count Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trainees:</span>
                  <span className="font-medium">{courses.reduce((sum, course) => sum + course.totalTrainees, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Mentors:</span>
                  <span className="font-medium">{courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Users:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium text-gray-900">Total Users:</span>
                  <span className="font-bold text-lg">{courses.reduce((sum, course) => sum + course.totalTrainees, 0) + courses.length + 3}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Course & Class Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Courses:</span>
                  <span className="font-medium">{courses.filter(course => course.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Draft Courses:</span>
                  <span className="font-medium">{courses.filter(course => course.status === 'draft').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Stages:</span>
                  <span className="font-medium">{courses.reduce((sum, course) => sum + course.stages.filter(stage => stage.status === 'active').length, 0)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium text-gray-900">Total Stages:</span>
                  <span className="font-bold text-lg">{courses.reduce((sum, course) => sum + course.stages.length, 0)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-md font-medium text-gray-700 mb-3">Performance Calculation Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Progress Records:</span>
                <span className="font-medium ml-2">{traineeProgress.flatMap(course => course.progress).length}</span>
              </div>
              <div>
                <span className="text-gray-600">Average Progress:</span>
                <span className="font-medium ml-2">{Math.round(traineeProgress.flatMap(course => course.progress).reduce((sum, progress) => sum + progress, 0) / traineeProgress.flatMap(course => course.progress).length)}%</span>
              </div>
              <div>
                <span className="text-gray-600">Performance Trend:</span>
                <span className="font-medium ml-2 text-green-600">↗️ Improving</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart temporarily disabled</p>
                <p className="text-sm">Course data: React (35), Testing (25), Cloud (20), AIML (15), DotNet (5)</p>
              </div>
            </div>
          </div>

          {/* Performance Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Chart temporarily disabled</p>
                <p className="text-sm">Performance data available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.course}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500">Navigate to different sections quickly</p>
          </div>
          
          {/* Primary Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleManageUsers}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">Manage Users</span>
              <span className="text-xs text-gray-500 text-center mt-1">User Management</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleManageCourses}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">Manage Courses</span>
              <span className="text-xs text-gray-500 text-center mt-1">Course Management</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleScheduleClasses}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">Schedule Classes</span>
              <span className="text-xs text-gray-500 text-center mt-1">Class Management</span>
            </button>
            
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleViewReports}>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">View Reports</span>
              <span className="text-xs text-gray-500 text-center mt-1">Analytics</span>
            </button>
          </div>

          {/* Secondary Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleTaskManagement}>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors">
                <ClipboardList className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-gray-900 text-center">Tasks</span>
            </button>
            
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleNotifications}>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-red-200 transition-colors">
                <Bell className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs font-medium text-gray-900 text-center">Notifications</span>
            </button>
            
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleSettings}>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-900 text-center">Settings</span>
            </button>
            
            <button className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group" onClick={handleAdminProfile}>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-teal-200 transition-colors">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-xs font-medium text-gray-900 text-center">Profile</span>
            </button>
          </div>
        </div>

        {/* Quick Analytics Access */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Analytics Access</h3>
            <p className="text-sm text-gray-500">Jump to specific analytics sections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group"
              onClick={handleUserAnalytics}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-gray-900 block">User Analytics</span>
                <span className="text-xs text-gray-500">View user performance & trends</span>
              </div>
            </button>
            
            <button 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group"
              onClick={handleCourseAnalytics}
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-gray-900 block">Course Analytics</span>
                <span className="text-xs text-gray-500">Course completion & success rates</span>
              </div>
            </button>
            
            <button 
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all duration-200 cursor-pointer group"
              onClick={handleClassAnalytics}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-gray-900 block">Class Analytics</span>
                <span className="text-xs text-gray-500">Attendance & engagement metrics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 text-center text-gray-500">
        Error loading dashboard data: {error.message}
      </div>
    );
  }
};

export default AdminDashboard;
