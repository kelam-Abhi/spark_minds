import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  Bell, 
  BarChart3, 
  Settings,
  LogOut,
  User,
  GraduationCap,
  FileText,
  MessageSquare
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Dashboard', path: '/admin-dashboard', icon: Home },
        { name: 'User Management', path: '/admin-dashboard/users', icon: Users },
        { name: 'Course Management', path: '/admin-dashboard/courses', icon: BookOpen },
        { name: 'Class Management', path: '/admin-dashboard/classes', icon: Calendar },
        { name: 'Task Management', path: '/admin-dashboard/tasks', icon: ClipboardList },
        { name: 'Reports & Analytics', path: '/admin-dashboard/reports', icon: BarChart3 },
        { name: 'Notifications', path: '/admin-dashboard/notifications', icon: Bell },
        { name: 'Settings', path: '/admin-dashboard/settings', icon: Settings },
        { name: 'Profile', path: '/admin-dashboard/profile', icon: User }
      ];
    } else if (user?.role === 'mentor') {
      return [
        { name: 'Dashboard', path: '/mentor-dashboard', icon: Home },
        { name: 'Trainee Management', path: '/mentor-dashboard/create-trainee', icon: Users },
        { name: 'Task Management', path: '/mentor-dashboard/assign-task', icon: ClipboardList },
        { name: 'View Classes', path: '/mentor-dashboard/classes', icon: Calendar },
        { name: 'View Tests', path: '/mentor-dashboard/tests', icon: FileText },
        { name: 'Notifications', path: '/mentor-dashboard/notifications', icon: Bell },
        { name: 'Profile', path: '/mentor-dashboard/profile', icon: User }
      ];
    } else {
      return [
        { name: 'Dashboard', path: '/trainee-dashboard', icon: Home },
        { name: 'My Courses', path: '/trainee-dashboard/courses', icon: BookOpen },
        { name: 'Classes', path: '/trainee-dashboard/classes', icon: Calendar },
        { name: 'Assignments', path: '/trainee-dashboard/assignments', icon: ClipboardList },
        { name: 'Tasks & Tests', path: '/trainee-dashboard/tasks', icon: ClipboardList },
        { name: 'Performance', path: '/trainee-dashboard/performance', icon: BarChart3 },
        { name: 'Profile', path: '/trainee-dashboard/profile', icon: User }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? 'block' : 'hidden'}
      `}>
        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || user?.profilePhoto || 'https://via.placeholder.com/40'}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
