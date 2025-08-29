import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, Bell, User, BookOpen, CheckCircle, AlertCircle, Info, Clock, X, Eye, EyeOff } from 'lucide-react';
import magantiLogo from '../../Logo/maganti_logo.png';

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task_submission',
      title: 'Task Submission Received',
      message: 'Alice Johnson submitted "React Component Assignment" for review',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'test_completion',
      title: 'Test Completed',
      message: 'Bob Smith completed "JavaScript Fundamentals Test" with score 85%',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'class_reminder',
      title: 'Class Reminder',
      message: 'Class "React State Management" starts in 30 minutes',
      time: '30 minutes ago',
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'trainee_enrollment',
      title: 'New Trainee Enrolled',
      message: 'Carol Davis enrolled in "Database Design" course',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);
  const notificationRef = useRef(null);
  const [notificationsViewed, setNotificationsViewed] = useState(false);

  // Example: Simulate new notifications arriving (for demo purposes)
  // In a real app, this would be triggered by server events or WebSocket messages
  useEffect(() => {
    // Reset viewed state when notifications change (simulating new notifications)
    if (notifications.some(n => !n.read)) {
      setNotificationsViewed(false);
    }
  }, [notifications]);

  // Add new notification for testing (in real app, this would come from server)
  const addTestNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: 'test_completion',
      title: 'New Test Completed',
      message: 'A new test has been completed and requires review',
      time: 'Just now',
      read: false,
      priority: 'medium'
    };
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationsViewed(false); // Reset viewed state for new notification
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_submission':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'test_completion':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'class_reminder':
        return <Clock className="h-4 w-4 text-purple-600" />;
      case 'trainee_enrollment':
        return <User className="h-4 w-4 text-indigo-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  // Handle opening notifications dropdown
  const handleOpenNotifications = () => {
    if (!showNotifications) {
      // When opening notifications, mark them as viewed
      setNotificationsViewed(true);
    }
    setShowNotifications(!showNotifications);
  };

  // Get unread count - only show if notifications haven't been viewed
  const unreadCount = notificationsViewed ? 0 : notifications.filter(n => !n.read).length;

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-4 lg:px-6">
        {/* Left side: Menu Button and Logo */}
        <div className="flex items-center space-x-3">
          {/* Menu Button for Sidebar */}
          <button
            onClick={onMenuToggle}
            className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-purple-600 hover:bg-blue-500 transition-colors shadow-sm"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Maganti Logo Image */}
          <div className="flex items-center justify-center">
            <img 
              src={magantiLogo} 
              alt="Maganti IT's SPARKMINDS Logo" 
              className="h-20 w-auto"
            />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses, users, task"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Right side: Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={handleOpenNotifications}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md relative transition-colors"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={addTestNotification}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                      >
                        Add Test
                      </button>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {unreadCount > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <Bell className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  {!notification.read && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      New
                                    </span>
                                  )}
                                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                    {notification.priority}
                                  </span>
                                </div>
                              </div>
                              <p className={`text-xs mt-1 ${
                                !notification.read ? 'text-gray-700' : 'text-gray-500'
                              }`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => window.location.href = `/${user?.role || 'admin'}-dashboard/notifications`}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || user?.profilePhoto || 'https://via.placeholder.com/32'}
              alt={user?.name || 'User'}
              className="h-8 w-8 rounded-full border-2 border-gray-200 object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
