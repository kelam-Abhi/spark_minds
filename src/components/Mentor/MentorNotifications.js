import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Clock, 
  User, 
  BookOpen, 
  ClipboardList,
  FileText,
  Calendar,
  X,
  Filter,
  Search,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const MentorNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task_submission',
      title: 'Task Submission Received',
      message: 'Alice Johnson submitted "React Component Assignment" for review',
      trainee: 'Alice Johnson',
      course: 'React Development',
      task: 'React Component Assignment',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'test_completion',
      title: 'Test Completed',
      message: 'Bob Smith completed "JavaScript Fundamentals Test" with score 85%',
      trainee: 'Bob Smith',
      course: 'JavaScript Basics',
      test: 'JavaScript Fundamentals Test',
      score: 85,
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 3,
      type: 'class_reminder',
      title: 'Class Reminder',
      message: 'Class "React State Management" starts in 30 minutes',
      course: 'React Development',
      classTitle: 'React State Management',
      startTime: '10:00 AM',
      time: '30 minutes ago',
      read: true,
      priority: 'high',
      actionRequired: false
    },
    {
      id: 4,
      type: 'trainee_enrollment',
      title: 'New Trainee Enrolled',
      message: 'Carol Davis enrolled in "Database Design" course',
      trainee: 'Carol Davis',
      course: 'Database Design',
      time: '1 day ago',
      read: true,
      priority: 'low',
      actionRequired: false
    },
    {
      id: 5,
      type: 'task_overdue',
      title: 'Task Overdue Alert',
      message: 'David Wilson has not submitted "API Development Task" (due 2 days ago)',
      trainee: 'David Wilson',
      course: 'Node.js Backend',
      task: 'API Development Task',
      dueDate: '2024-01-18',
      time: '2 days ago',
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 6,
      type: 'performance_alert',
      title: 'Performance Alert',
      message: 'Emma Brown scored below 70% on "Testing Fundamentals Quiz"',
      trainee: 'Emma Brown',
      course: 'Testing Fundamentals',
      test: 'Testing Fundamentals Quiz',
      score: 65,
      time: '3 days ago',
      read: false,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 7,
      type: 'class_cancellation',
      title: 'Class Cancelled',
      message: 'Class "Cloud Computing Workshop" scheduled for tomorrow has been cancelled',
      course: 'Cloud Computing',
      classTitle: 'Cloud Computing Workshop',
      originalDate: '2024-01-25',
      time: '1 week ago',
      read: true,
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 8,
      type: 'system_update',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM',
      time: '1 week ago',
      read: true,
      priority: 'low',
      actionRequired: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_submission':
        return <ClipboardList className="h-5 w-5 text-blue-600" />;
      case 'test_completion':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'class_reminder':
        return <Calendar className="h-5 w-5 text-purple-600" />;
      case 'trainee_enrollment':
        return <User className="h-5 w-5 text-indigo-600" />;
      case 'task_overdue':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'performance_alert':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'class_cancellation':
        return <Calendar className="h-5 w-5 text-gray-600" />;
      case 'system_update':
        return <Info className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get type label
  const getTypeLabel = (type) => {
    switch (type) {
      case 'task_submission':
        return 'Task Submission';
      case 'test_completion':
        return 'Test Completion';
      case 'class_reminder':
        return 'Class Reminder';
      case 'trainee_enrollment':
        return 'Enrollment';
      case 'task_overdue':
        return 'Task Overdue';
      case 'performance_alert':
        return 'Performance Alert';
      case 'class_cancellation':
        return 'Class Cancelled';
      case 'system_update':
        return 'System Update';
      default:
        return 'Notification';
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.read) ||
                       (filterRead === 'unread' && !notification.read);

    return matchesSearch && matchesType && matchesPriority && matchesRead;
  });

  // Get statistics
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with trainee activities, class reminders, and system updates</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="btn-secondary flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <Bell className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{totalNotifications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-red-500 text-white">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{highPriorityCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-2xl font-bold text-gray-900">{actionRequiredCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-wrap items-center space-x-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="task_submission">Task Submission</option>
                  <option value="test_completion">Test Completion</option>
                  <option value="class_reminder">Class Reminder</option>
                  <option value="trainee_enrollment">Enrollment</option>
                  <option value="task_overdue">Task Overdue</option>
                  <option value="performance_alert">Performance Alert</option>
                  <option value="class_cancellation">Class Cancelled</option>
                  <option value="system_update">System Update</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                <select
                  value={filterRead}
                  onChange={(e) => setFilterRead(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredNotifications.length} Notification{filteredNotifications.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {getTypeLabel(notification.type)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {notification.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className={`text-sm mt-1 ${
                        !notification.read ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>

                      {/* Additional Details */}
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        {notification.trainee && (
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {notification.trainee}
                          </span>
                        )}
                        {notification.course && (
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {notification.course}
                          </span>
                        )}
                        {notification.task && (
                          <span className="flex items-center">
                            <ClipboardList className="h-3 w-3 mr-1" />
                            {notification.task}
                          </span>
                        )}
                        {notification.test && (
                          <span className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {notification.test}
                          </span>
                        )}
                        {notification.score && (
                          <span className="flex items-center">
                            Score: {notification.score}%
                          </span>
                        )}
                        {notification.classTitle && (
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {notification.classTitle}
                          </span>
                        )}
                      </div>

                      {notification.actionRequired && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Action Required
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorNotifications;
