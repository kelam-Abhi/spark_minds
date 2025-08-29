import React, { useState } from 'react';
import { TrendingUp, Award, Clock, Target, BarChart3, Calendar, BookOpen, CheckCircle, XCircle, AlertTriangle, Star, Trophy, Zap } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } from 'recharts';

const TraineePerformance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Mock performance data
  const [performanceData] = useState({
    overall: {
      totalCourses: 3,
      completedCourses: 1,
      inProgressCourses: 2,
      averageScore: 87,
      totalHours: 156,
      certificates: 2,
      streak: 15
    },
    courses: [
      {
        id: 1,
        name: 'React Development',
        stage: 'Intermediate',
        progress: 75,
        score: 89,
        timeSpent: 45,
        totalTime: 60,
        status: 'in-progress',
        lastActivity: '2024-01-15',
        nextMilestone: 'Advanced Concepts',
        achievements: ['First Project', 'Hooks Master', 'Component Expert']
      },
      {
        id: 2,
        name: 'Testing Fundamentals',
        stage: 'Basics',
        progress: 45,
        score: 78,
        timeSpent: 22,
        totalTime: 50,
        status: 'in-progress',
        lastActivity: '2024-01-14',
        nextMilestone: 'Unit Testing',
        achievements: ['Test Basics', 'First Test Case']
      },
      {
        id: 3,
        name: 'Cloud Computing',
        stage: 'Advanced',
        progress: 100,
        score: 94,
        timeSpent: 80,
        totalTime: 80,
        status: 'completed',
        lastActivity: '2024-01-10',
        nextMilestone: 'Certification',
        achievements: ['Cloud Master', 'Architecture Expert', 'Deployment Pro']
      }
    ],
    recentActivity: [
      { id: 1, type: 'task', title: 'React Hooks Assignment', score: 92, date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'test', title: 'Testing Fundamentals Quiz', score: 85, date: '2024-01-14', status: 'completed' },
      { id: 3, type: 'project', title: 'E-commerce App', score: 88, date: '2024-01-12', status: 'completed' },
      { id: 4, type: 'class', title: 'Advanced React Patterns', score: null, date: '2024-01-11', status: 'attended' },
      { id: 5, type: 'task', title: 'API Integration', score: 90, date: '2024-01-10', status: 'completed' }
    ],
    skillProgress: [
      { skill: 'JavaScript', level: 85, target: 90 },
      { skill: 'React', level: 78, target: 85 },
      { skill: 'Testing', level: 65, target: 80 },
      { skill: 'Cloud', level: 92, target: 95 },
      { skill: 'Git', level: 70, target: 85 }
    ],
    weeklyProgress: [
      { week: 'Week 1', hours: 12, tasks: 5, score: 82 },
      { week: 'Week 2', hours: 15, tasks: 7, score: 85 },
      { week: 'Week 3', hours: 18, tasks: 8, score: 88 },
      { week: 'Week 4', hours: 20, tasks: 10, score: 90 },
      { week: 'Week 5', hours: 16, tasks: 6, score: 87 },
      { week: 'Week 6', hours: 22, tasks: 9, score: 92 }
    ],
    achievements: [
      { id: 1, title: 'First Project', description: 'Completed your first React project', icon: Trophy, earned: '2024-01-10', points: 100 },
      { id: 2, title: 'Hooks Master', description: 'Mastered React Hooks concepts', icon: Zap, earned: '2024-01-08', points: 150 },
      { id: 3, title: 'Testing Pro', description: 'Completed 10 test cases successfully', icon: CheckCircle, earned: '2024-01-05', points: 200 },
      { id: 4, title: 'Cloud Expert', description: 'Achieved advanced cloud certification', icon: Award, earned: '2024-01-01', points: 300 }
    ]
  });

  // Safety check for data
  if (!performanceData || !performanceData.overall) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Loading performance data...</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const config = {
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'not-started': { color: 'bg-gray-100 text-gray-800', icon: Clock }
    };
    
    const statusConfig = config[status] || config['not-started'];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
      </span>
    );
  };

  const getActivityIcon = (type) => {
    const icons = {
      task: CheckCircle,
      test: BookOpen,
      project: Award,
      class: Calendar
    };
    const Icon = icons[type] || CheckCircle;
    return <Icon className="w-4 h-4" />;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600">Track your learning progress and achievements</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.overall.averageScore}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Courses in Progress</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.overall.inProgressCourses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.overall.totalHours}h</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.achievements.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'courses', 'skills', 'activity', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Progress Overview Chart */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Weekly Progress Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {performanceData.weeklyProgress && performanceData.weeklyProgress.length > 0 ? (
                    <LineChart data={performanceData.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} name="Score %" />
                      <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={2} name="Hours" />
                    </LineChart>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No progress data available
                    </div>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Course Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    {performanceData.overall && (
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Completed', value: performanceData.overall.completedCourses || 0, color: '#10B981' },
                            { name: 'In Progress', value: performanceData.overall.inProgressCourses || 0, color: '#3B82F6' },
                            { name: 'Not Started', value: (performanceData.overall.totalCourses || 0) - (performanceData.overall.completedCourses || 0) - (performanceData.overall.inProgressCourses || 0), color: '#9CA3AF' }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {[
                            { name: 'Completed', value: performanceData.overall.completedCourses || 0, color: '#10B981' },
                            { name: 'In Progress', value: performanceData.overall.inProgressCourses || 0, color: '#3B82F6' },
                            { name: 'Not Started', value: (performanceData.overall.totalCourses || 0) - (performanceData.overall.completedCourses || 0) - (performanceData.overall.inProgressCourses || 0), color: '#9CA3AF' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Skill Levels</h3>
                  <div className="space-y-4">
                    {performanceData.skillProgress.map((skill, index) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill.skill}</span>
                          <span className="text-gray-600">{skill.level}/{skill.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(skill.level / skill.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              {performanceData.courses.map((course) => (
                <div key={course.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">Stage: {course.stage}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(course.status)}
                          <span className={`text-lg font-semibold ${getScoreColor(course.score)}`}>
                            {course.score}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Target className="w-4 h-4 mr-2" />
                          Progress: {course.progress}%
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          Time: {course.timeSpent}/{course.totalTime}h
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Last: {new Date(course.lastActivity).toLocaleDateString()}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Achievements */}
                      {course.achievements.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Achievements:</p>
                          <div className="flex flex-wrap gap-2">
                            {course.achievements.map((achievement, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                <Star className="w-3 h-3 mr-1" />
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Skill Development Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {performanceData.skillProgress && performanceData.skillProgress.length > 0 ? (
                    <BarChart data={performanceData.skillProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="level" fill="#3B82F6" name="Current Level" />
                      <Bar dataKey="target" fill="#10B981" name="Target Level" />
                    </BarChart>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No skill data available
                    </div>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceData.skillProgress.map((skill, index) => (
                  <div key={skill.skill} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                      <span className="text-sm text-gray-600">{skill.level}/{skill.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(skill.level / skill.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Recent Activity Timeline</h3>
                <div className="space-y-4">
                  {performanceData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {activity.score ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(activity.score)}`}>
                            {activity.score}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(achievement.earned).toLocaleDateString()}
                            </span>
                            <span className="text-xs font-medium text-primary-600">
                              +{achievement.points} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineePerformance;
