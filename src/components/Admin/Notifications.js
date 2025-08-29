import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Mail,
  MessageSquare,
  BookOpen,
  Eye
} from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New React Course Available',
      message: 'The Advanced React course is now available for enrollment. All React Development trainees are encouraged to register.',
      type: 'announcement',
      recipients: 'all_trainees',
      course: 'React Development',
      status: 'sent',
      sentAt: '2024-03-20T10:00:00',
      readCount: 45,
      totalRecipients: 50
    },
    {
      id: 2,
      title: 'Class Schedule Update',
      message: 'The Testing Fundamentals workshop has been rescheduled to March 25th at 2:00 PM. Please update your calendars.',
      type: 'reminder',
      recipients: 'course_trainees',
      course: 'Testing',
      status: 'scheduled',
      sentAt: '2024-03-21T09:00:00',
      readCount: 0,
      totalRecipients: 20
    },
    {
      id: 3,
      title: 'Task Submission Deadline',
      message: 'Reminder: React Component Lifecycle Quiz submissions are due by March 25th. Please complete and submit on time.',
      type: 'reminder',
      recipients: 'course_trainees',
      course: 'React Development',
      status: 'sent',
      sentAt: '2024-03-19T14:00:00',
      readCount: 38,
      totalRecipients: 42
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'announcement',
    recipients: 'all_trainees',
    course: '',
    scheduledDate: '',
    scheduledTime: '',
    priority: 'normal',
    category: 'general'
  });

  const handleAddNotification = () => {
    if (newNotification.title && newNotification.message && newNotification.recipients) {
      const notification = {
        id: notifications.length + 1,
        ...newNotification,
        status: newNotification.scheduledDate && newNotification.scheduledTime ? 'scheduled' : 'sent',
        sentAt: newNotification.scheduledDate && newNotification.scheduledTime 
          ? `${newNotification.scheduledDate}T${newNotification.scheduledTime}` 
          : new Date().toISOString(),
        readCount: 0,
        totalRecipients: 0
      };
      setNotifications([...notifications, notification]);
      setNewNotification({
        title: '',
        message: '',
        type: 'announcement',
        recipients: 'all_trainees',
        course: '',
        scheduledDate: '',
        scheduledTime: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditNotification = (notification) => {
    setEditingNotification(notification);
    setNewNotification({ ...notification });
    setShowAddModal(true);
  };

  const handleUpdateNotification = () => {
    if (editingNotification && newNotification.title && newNotification.message && newNotification.recipients) {
      setNotifications(notifications.map(n => n.id === editingNotification.id ? { ...n, ...newNotification } : n));
      setEditingNotification(null);
      setNewNotification({
        title: '',
        message: '',
        type: 'announcement',
        recipients: 'all_trainees',
        course: '',
        scheduledDate: '',
        scheduledTime: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteNotification = (notificationId) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== notificationId));
    }
  };

  const sendNotification = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId 
        ? { ...n, status: 'sent', sentAt: new Date().toISOString() }
        : n
    ));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    const matchesCourse = filterCourse === 'all' || notification.course === filterCourse;
    return matchesSearch && matchesType && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      case 'alert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement': return <Bell className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'alert': return <MessageSquare className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getRecipientsText = (recipients) => {
    switch (recipients) {
      case 'all_trainees': return 'All Trainees';
      case 'all_mentors': return 'All Mentors';
      case 'course_trainees': return 'Course Trainees';
      case 'course_mentors': return 'Course Mentors';
      default: return 'Specific Users';
    }
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Send and manage notifications to mentors and trainees</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Send Notification
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="announcement">Announcement</option>
            <option value="reminder">Reminder</option>
            <option value="alert">Alert</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>

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

          <div className="text-sm text-gray-500 flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            {filteredNotifications.length} notifications found
          </div>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Notification Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(notification.type)}
                  <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {notification.status === 'scheduled' && (
                    <button
                      onClick={() => sendNotification(notification.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Send Now"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEditNotification(notification)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{notification.message}</p>

              {/* Notification Badges */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </span>
              </div>

              {/* Notification Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{getRecipientsText(notification.recipients)}</span>
                </div>
                {notification.course && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{notification.course}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{formatDateTime(notification.sentAt)}</span>
                </div>
              </div>
            </div>

            {/* Notification Stats and Actions */}
            <div className="p-6">
              {/* Read Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary-600">{notification.readCount}</div>
                  <div className="text-xs text-gray-500">Read</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{notification.totalRecipients}</div>
                  <div className="text-xs text-gray-500">Recipients</div>
                </div>
              </div>

              {/* Progress Bar */}
              {notification.totalRecipients > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Read Rate</span>
                    <span>{Math.round((notification.readCount / notification.totalRecipients) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(notification.readCount / notification.totalRecipients) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Notification Actions */}
              <div className="flex space-x-2">
                <button className="btn-secondary flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </button>
                <button className="btn-primary flex-1">
                  <Users className="w-4 h-4 mr-1" />
                  Manage Recipients
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingNotification ? 'Edit Notification' : 'Send New Notification'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter notification title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter notification message"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="announcement">Announcement</option>
                      <option value="reminder">Reminder</option>
                      <option value="alert">Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recipients</label>
                    <select
                      value={newNotification.recipients}
                      onChange={(e) => setNewNotification({...newNotification, recipients: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all_trainees">All Trainees</option>
                      <option value="all_mentors">All Mentors</option>
                      <option value="course_trainees">Course Trainees</option>
                      <option value="course_mentors">Course Mentors</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Course (Optional)</label>
                  <select
                    value={newNotification.course}
                    onChange={(e) => setNewNotification({...newNotification, course: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Course (Optional)</option>
                    <option value="React Development">React Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="AIML">AIML</option>
                    <option value="DotNet">DotNet</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule Date (Optional)</label>
                    <input
                      type="date"
                      value={newNotification.scheduledDate}
                      onChange={(e) => setNewNotification({...newNotification, scheduledDate: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule Time (Optional)</label>
                    <input
                      type="time"
                      value={newNotification.scheduledTime}
                      onChange={(e) => setNewNotification({...newNotification, scheduledTime: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingNotification(null);
                    setNewNotification({
                      title: '',
                      message: '',
                      type: 'announcement',
                      recipients: 'all_trainees',
                      course: '',
                      scheduledDate: '',
                      scheduledTime: ''
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={editingNotification ? handleUpdateNotification : handleAddNotification}
                  className="btn-primary"
                >
                  {editingNotification ? 'Update Notification' : 'Send Notification'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
