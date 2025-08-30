import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  Award,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Mock data for charts
  const courseEnrollmentData = [
    { name: 'React Dev', enrolled: 45, completed: 32, active: 38 },
    { name: 'Testing', enrolled: 38, completed: 25, active: 30 },
    { name: 'Cloud Comp', enrolled: 42, completed: 28, active: 35 },
    { name: 'AIML', enrolled: 35, completed: 20, active: 28 },
    { name: 'DotNet', enrolled: 30, completed: 18, active: 25 }
  ];

  const performanceData = [
    { name: 'Week 1', avgScore: 75, submissions: 45 },
    { name: 'Week 2', avgScore: 82, submissions: 52 },
    { name: 'Week 3', avgScore: 78, submissions: 48 },
    { name: 'Week 4', avgScore: 85, submissions: 55 },
    { name: 'Week 5', avgScore: 88, submissions: 58 }
  ];

  const taskCompletionData = [
    { name: 'Completed', value: 68, color: '#10B981' },
    { name: 'In Progress', value: 22, color: '#F59E0B' },
    { name: 'Not Started', value: 10, color: '#EF4444' }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const stats = [
    { title: 'Total Trainees', value: '180', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Courses', value: '15', change: '+2', icon: BookOpen, color: 'text-green-600' },
    { title: 'Avg Completion Rate', value: '78%', change: '+5%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Total Tasks', value: '245', change: '+18', icon: Award, color: 'text-orange-600' }
  ];

  const recentActivities = [
    { id: 1, action: 'New trainee enrolled in React Development', time: '2 hours ago', type: 'enrollment' },
    { id: 2, action: 'Task "Build Todo App" completed by 15 trainees', time: '4 hours ago', type: 'completion' },
    { id: 3, action: 'Course "Testing Fundamentals" started', time: '6 hours ago', type: 'course' },
    { id: 4, action: 'Monthly performance report generated', time: '1 day ago', type: 'report' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'enrollment': return <Users className="w-4 h-4 text-blue-500" />;
      case 'completion': return <Award className="w-4 h-4 text-green-500" />;
      case 'course': return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'report': return <BarChart3 className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'enrollment': return 'bg-blue-50 border-blue-200';
      case 'completion': return 'bg-green-50 border-green-200';
      case 'course': return 'bg-purple-50 border-purple-200';
      case 'report': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track trainee performance and course analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Courses</option>
            <option value="react">React Development</option>
            <option value="testing">Testing</option>
            <option value="cloud">Cloud Computing</option>
            <option value="aiml">AIML</option>
            <option value="dotnet">DotNet</option>
          </select>
          <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Enrollment Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Enrollment Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrolled" fill="#3B82F6" name="Enrolled" />
              <Bar dataKey="active" fill="#10B981" name="Active" />
              <Bar dataKey="completed" fill="#8B5CF6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#3B82F6" strokeWidth={2} name="Average Score" />
              <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={2} name="Submissions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task Completion Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Status</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskCompletionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskCompletionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Generate Custom Report</p>
              <p className="text-xs text-gray-500">Create detailed analytics</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Trainee Performance</p>
              <p className="text-xs text-gray-500">Individual progress reports</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Course Analytics</p>
              <p className="text-xs text-gray-500">Course-wise insights</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
