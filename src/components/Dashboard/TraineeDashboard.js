import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play,
  Download,
  Eye,
  ExternalLink
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import magantiLogo from '../../Logo/maganti_logo.png';

const TraineeDashboard = () => {
  // Mock data
  const enrolledCourses = [
    { id: 1, name: 'React Basics', progress: 75, nextClass: 'Tomorrow 10:00 AM', mentor: 'John Mentor' },
    { id: 2, name: 'Testing Fundamentals', progress: 60, nextClass: 'Today 2:00 PM', mentor: 'Sarah Mentor' },
    { id: 3, name: 'Cloud Computing', progress: 45, nextClass: 'Friday 11:00 AM', mentor: 'Mike Mentor' }
  ];

  const upcomingClasses = [
    { id: 1, course: 'React Basics', title: 'State Management Deep Dive', time: 'Tomorrow 10:00 AM', type: 'virtual', link: 'https://meet.google.com/abc-123' },
    { id: 2, course: 'Testing Fundamentals', title: 'Unit Testing Workshop', time: 'Today 2:00 PM', type: 'virtual', link: 'https://meet.google.com/def-456' },
    { id: 3, course: 'Cloud Computing', title: 'AWS Basics', time: 'Friday 11:00 AM', type: 'manual', location: 'Room 201' }
  ];

  const pendingTasks = [
    { id: 1, course: 'React Basics', title: 'Component Assignment', dueDate: 'Tomorrow', priority: 'high', type: 'assignment' },
    { id: 2, course: 'Testing Fundamentals', title: 'Unit Test Quiz', dueDate: 'Today', priority: 'medium', type: 'quiz' },
    { id: 3, course: 'Cloud Computing', title: 'AWS Lab Exercise', dueDate: 'Next Week', priority: 'low', type: 'lab' }
  ];

  const recentSubmissions = [
    { id: 1, course: 'React Basics', task: 'Props & State Quiz', submitted: '2 hours ago', score: 85, feedback: 'Great understanding of React concepts!' },
    { id: 2, course: 'Testing Fundamentals', task: 'Jest Basics', submitted: '1 day ago', score: 92, feedback: 'Excellent test coverage and structure.' },
    { id: 3, course: 'Cloud Computing', task: 'EC2 Instance Setup', submitted: '2 days ago', score: 78, feedback: 'Good work, but remember to terminate instances.' }
  ];

  const overallProgress = [
    { name: 'React Basics', value: 75, fill: '#3B82F6' },
    { name: 'Testing Fundamentals', value: 60, fill: '#10B981' },
    { name: 'Cloud Computing', value: 45, fill: '#F59E0B' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'assignment': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      case 'lab': return <AlertCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Maganti Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={magantiLogo} 
              alt="Maganti IT's SPARKMINDS Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          {/* Dashboard Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trainee Dashboard</h1>
            <p className="text-gray-600">Track your learning progress and upcoming activities</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Download Materials
          </button>
          <button className="btn-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            View Courses
          </button>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">
                <p>Mentor: {course.mentor}</p>
                <p>Next: {course.nextClass}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="btn-secondary flex-1">
                <Eye className="w-4 h-4 mr-1" />
                View Course
              </button>
              <button className="btn-primary flex-1">
                <Play className="w-4 h-4 mr-1" />
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Classes</h3>
          <p className="text-sm text-gray-500">Your scheduled learning sessions</p>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingClasses.map((classItem) => (
            <div key={classItem.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{classItem.title}</p>
                  <p className="text-sm text-gray-500">{classItem.course} • {classItem.time}</p>
                  <p className="text-xs text-gray-400">
                    {classItem.type === 'virtual' ? 'Virtual Class' : `In-person at ${classItem.location}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {classItem.type === 'virtual' ? (
                  <a
                    href={classItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Join
                  </a>
                ) : (
                  <span className="text-sm text-gray-500">{classItem.location}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
          <p className="text-sm text-gray-500">Tasks and assignments that need your attention</p>
        </div>
        <div className="divide-y divide-gray-200">
          {pendingTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {getTaskTypeIcon(task.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.course} • Due: {task.dueDate}</p>
                  </div>
                </div>
              </div>
              <button className="btn-primary">
                <Eye className="w-4 h-4 mr-1" />
                Start Task
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
          <p className="text-sm text-gray-500">Your completed tasks and feedback</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{submission.task}</p>
                  <p className="text-sm text-gray-500">{submission.course} • Submitted {submission.submitted}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary-600">{submission.score}%</span>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{submission.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Chart temporarily disabled</p>
            <p className="text-sm">Progress data available</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {overallProgress.map((course) => (
            <div key={course.name}>
              <p className="text-sm font-medium text-gray-900">{course.name}</p>
              <p className="text-lg font-bold text-primary-600">{course.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TraineeDashboard;
