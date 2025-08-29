import React, { useState } from 'react';
import { BookOpen, Play, FileText, Video, Download, Eye, Calendar, Clock, Award, TrendingUp, CheckCircle } from 'lucide-react';

const TraineeCourses = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data for trainee courses
  const enrolledCourses = [
    {
      id: 1,
      name: 'React Development',
      department: 'Frontend',
      stage: 'Intermediate',
      progress: 75,
      nextClass: '2024-01-15 10:00 AM',
      mentor: 'Dr. Sarah Johnson',
      materials: 8,
      assignments: 3,
      completed: 6
    },
    {
      id: 2,
      name: 'Testing Fundamentals',
      department: 'QA',
      stage: 'Basics',
      progress: 45,
      nextClass: '2024-01-16 02:00 PM',
      mentor: 'Prof. Mike Chen',
      materials: 5,
      assignments: 2,
      completed: 3
    },
    {
      id: 3,
      name: 'Cloud Architecture',
      department: 'DevOps',
      stage: 'Advanced',
      progress: 90,
      nextClass: '2024-01-17 11:00 AM',
      mentor: 'Dr. Emily Brown',
      materials: 12,
      assignments: 4,
      completed: 10
    }
  ];

  const courseMaterials = [
    { id: 1, name: 'React Hooks Guide', type: 'Document', size: '2.5 MB', uploadDate: '2024-01-10', downloaded: true },
    { id: 2, name: 'Testing Best Practices', type: 'Document', size: '1.8 MB', uploadDate: '2024-01-09', downloaded: false },
    { id: 3, name: 'React Class Recording', type: 'Video', size: '45.2 MB', uploadDate: '2024-01-08', downloaded: true },
    { id: 4, name: 'Assignment Guidelines', type: 'Document', size: '0.8 MB', uploadDate: '2024-01-07', downloaded: false }
  ];

  const upcomingClasses = [
    { id: 1, course: 'React Development', title: 'Advanced State Management', date: '2024-01-15', time: '10:00 AM', duration: '2 hours', type: 'Virtual' },
    { id: 2, course: 'Testing Fundamentals', title: 'Unit Testing with Jest', date: '2024-01-16', time: '2:00 PM', duration: '1.5 hours', type: 'Virtual' },
    { id: 3, course: 'Cloud Architecture', title: 'Microservices Design', date: '2024-01-17', time: '11:00 AM', duration: '2 hours', type: 'Manual' }
  ];

  const recentAssignments = [
    { id: 1, title: 'Build a Todo App', course: 'React Development', dueDate: '2024-01-20', status: 'In Progress', progress: 60 },
    { id: 2, title: 'API Testing Suite', course: 'Testing Fundamentals', dueDate: '2024-01-18', status: 'Completed', progress: 100 },
    { id: 3, title: 'Cloud Migration Plan', course: 'Cloud Architecture', dueDate: '2024-01-25', status: 'Not Started', progress: 0 }
  ];

  const handleDownloadMaterial = (material) => {
    // Handle download logic
    console.log('Downloading:', material.name);
  };

  const handleViewMaterial = (material) => {
    // Handle view logic
    console.log('Viewing:', material.name);
  };

  const handleJoinClass = (classItem) => {
    // Handle class joining logic
    console.log('Joining class:', classItem.title);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Track your learning progress and access course materials</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Materials</p>
              <p className="text-2xl font-bold text-gray-900">
                {enrolledCourses.reduce((sum, course) => sum + course.materials, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {enrolledCourses.reduce((sum, course) => sum + course.completed, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['enrolled', 'materials', 'classes', 'assignments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Enrolled Courses Tab */}
          {activeTab === 'enrolled' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Enrolled Courses</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h4>
                        <p className="text-sm text-gray-600">{course.department}</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
                          {course.stage}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                        <div className="text-sm text-gray-500">Progress</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mentor:</span>
                        <span className="font-medium">{course.mentor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Next Class:</span>
                        <span className="font-medium">{course.nextClass}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Materials:</span>
                        <span className="font-medium">{course.materials}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Assignments:</span>
                        <span className="font-medium">{course.assignments}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Continue Learning
                      </button>
                      <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Learning Materials</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search materials..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Size</div>
                    <div>Upload Date</div>
                    <div>Actions</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {courseMaterials.map((material) => (
                    <div key={material.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="font-medium text-gray-900">{material.name}</div>
                        <div className="text-gray-600">{material.type}</div>
                        <div className="text-gray-600">{material.size}</div>
                        <div className="text-gray-600">{material.uploadDate}</div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewMaterial(material)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadMaterial(material)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Classes</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search classes..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{classItem.title}</h4>
                          <p className="text-gray-600">{classItem.course}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {classItem.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.time}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                          classItem.type === 'Virtual' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {classItem.type}
                        </span>
                        <div className="mt-2">
                          <button
                            onClick={() => handleJoinClass(classItem)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            {classItem.type === 'Virtual' ? 'Join Meeting' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500">
                    <div>Title</div>
                    <div>Course</div>
                    <div>Due Date</div>
                    <div>Status</div>
                    <div>Progress</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentAssignments.map((assignment) => (
                    <div key={assignment.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="font-medium text-gray-900">{assignment.title}</div>
                        <div className="text-gray-600">{assignment.course}</div>
                        <div className="text-gray-600">{assignment.dueDate}</div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(assignment.progress)}`}
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{assignment.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeCourses;
