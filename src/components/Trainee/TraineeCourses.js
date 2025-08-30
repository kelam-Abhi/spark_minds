import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, User, Clock, FileText, Target, Calendar, Play, Eye } from 'lucide-react';

const TraineeCourses = () => {
  const { user } = useAuth();

  // Course data based on user's enrollment
  const getCourseData = () => {
    if (!user?.enrolledCourse) return null;

    const courseData = {
      'React Development': {
        title: 'React Development',
        category: 'Frontend',
        level: 'Intermediate',
        description: 'Master React.js fundamentals, hooks, state management, and build real-world applications.',
        progress: user.progress || 0,
        mentor: user.assignedMentor || 'Dr. Sarah Johnson',
      nextClass: '2024-01-15 10:00 AM',
      materials: 8,
      assignments: 3,
        modules: [
          'React Fundamentals',
          'Hooks & State Management',
          'Component Architecture',
          'Routing & Navigation',
          'State Management (Redux/Context)',
          'Testing React Applications',
          'Performance Optimization',
          'Deployment & CI/CD'
        ],
        upcomingTopics: [
          'Advanced Hooks Patterns',
          'Error Boundaries',
          'Code Splitting',
          'Server-Side Rendering'
        ]
      },
      'Testing Fundamentals': {
        title: 'Testing Fundamentals',
        category: 'QA',
        level: 'Basics',
        description: 'Learn comprehensive testing strategies, automation frameworks, and best practices.',
        progress: user.progress || 0,
        mentor: user.assignedMentor || 'Prof. Mike Chen',
      nextClass: '2024-01-16 02:00 PM',
      materials: 5,
      assignments: 2,
        modules: [
          'Testing Principles',
          'Unit Testing',
          'Integration Testing',
          'Test Automation',
          'Performance Testing',
          'Security Testing',
          'Test Planning & Strategy',
          'Tools & Frameworks'
        ],
        upcomingTopics: [
          'API Testing with Postman',
          'Selenium WebDriver',
          'Test Data Management',
          'Continuous Testing'
        ]
      },
      'DotNet Development': {
        title: 'DotNet Development',
        category: 'Backend',
        level: 'Advanced',
        description: 'Build robust applications using .NET Core, C#, and modern development practices.',
        progress: user.progress || 0,
        mentor: user.assignedMentor || 'Dr. David Wilson',
      nextClass: '2024-01-17 11:00 AM',
      materials: 12,
      assignments: 4,
        modules: [
          'C# Fundamentals',
          'Object-Oriented Programming',
          'ASP.NET Core Web API',
          'Entity Framework Core',
          'Authentication & Authorization',
          'Blazor Applications',
          'Microservices Architecture',
          'Cloud Deployment'
        ],
        upcomingTopics: [
          'Advanced C# Features',
          'Design Patterns',
          'Performance Optimization',
          'Security Best Practices'
        ]
      }
    };

    return courseData[user.enrolledCourse];
  };

  const course = getCourseData();

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Course Enrolled</h3>
          <p className="mt-1 text-sm text-gray-500">Please contact your administrator to enroll in a course.</p>
        </div>
      </div>
    );
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Basics': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Course</h1>
        <p className="text-gray-600">Your enrolled course details and progress</p>
        
        {/* Course Info Badges */}
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <BookOpen className="h-4 w-4 mr-2" />
            {course.title}
            </div>
          <div className="inline-flex items-center px-2 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            {course.category}
            </div>
          <div className={`inline-flex items-center px-2 py-2 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </div>
          {user?.assignedMentor && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <User className="h-4 w-4 mr-2" />
              Mentor: {user.assignedMentor}
        </div>
          )}
        </div>
      </div>

      {/* Course Overview Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Next Class: <span className="font-medium">{course.nextClass}</span></span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Materials: <span className="font-medium">{course.materials}</span></span>
        </div>
              <div className="flex items-center">
                <Target className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Assignments: <span className="font-medium">{course.assignments}</span></span>
                  </div>
                </div>
              </div>

          <div className="space-y-6">
            {/* Progress Section */}
                      <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium text-gray-900">Course Progress</span>
                <span className="text-2xl font-bold text-blue-600">{course.progress}%</span>
                      </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </button>
              <button className="w-full flex items-center justify-center px-6 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium">
                <Eye className="h-4 w-4 mr-2" />
                View Course Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

      {/* Course Modules */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.modules.map((module, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                  </div>
              <span className="text-gray-700">{module}</span>
                    </div>
                  ))}
                </div>
              </div>

      {/* Upcoming Topics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.upcomingTopics.map((topic, index) => (
            <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Calendar className="h-5 w-5 text-yellow-600 mr-3" />
              <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
        </div>
      </div>
    </div>
  );
};

export default TraineeCourses;
