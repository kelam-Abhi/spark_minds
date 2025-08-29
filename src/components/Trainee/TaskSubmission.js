import React, { useState } from 'react';
import { FileText, Code, CheckCircle, Clock, AlertCircle, Download, Upload, Send, Eye, Star, Trophy, X, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskSubmission = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    answer: '',
    code: '',
    file: null,
    notes: ''
  });

  // Mock data for tasks
  const [tasks] = useState([
    {
      id: 1,
      title: 'React Hooks Implementation',
      type: 'coding',
      course: 'React',
      stage: 'Intermediate',
      dueDate: '2024-01-20',
      status: 'pending',
      description: 'Create a custom React hook that manages form state with validation.',
      maxScore: 100,
      timeLimit: 120,
      mentor: 'John Smith'
    },
    {
      id: 2,
      title: 'Testing Fundamentals Quiz',
      type: 'test',
      course: 'Testing',
      stage: 'Basics',
      dueDate: '2024-01-18',
      status: 'pending',
      description: 'Complete the quiz on software testing fundamentals.',
      maxScore: 100,
      timeLimit: 45,
      mentor: 'Sarah Johnson'
    },
    {
      id: 3,
      title: 'Cloud Architecture Design',
      type: 'assignment',
      course: 'Cloud',
      stage: 'Advanced',
      dueDate: '2024-01-25',
      status: 'completed',
      description: 'Design a scalable cloud architecture for an e-commerce application.',
      maxScore: 100,
      timeLimit: 180,
      mentor: 'Mike Wilson',
      score: 88,
      feedback: 'Excellent architecture design with comprehensive security considerations.',
      grade: 'A-'
    }
  ]);

  const [currentSubmission, setCurrentSubmission] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Play },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const statusConfig = config[status] || config.pending;
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const config = {
      coding: { color: 'bg-purple-100 text-purple-800', icon: Code },
      test: { color: 'bg-blue-100 text-blue-800', icon: FileText },
      assignment: { color: 'bg-green-100 text-green-800', icon: FileText }
    };
    
    const typeConfig = config[type] || config.assignment;
    const Icon = typeConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleStartTask = (task) => {
    setSelectedTask(task);
    setSubmissionForm({
      answer: '',
      code: '',
      file: null,
      notes: ''
    });
    setShowSubmissionModal(true);
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    
    // Simulate instant evaluation
    const score = Math.floor(Math.random() * 30) + 70;
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
    
    const submission = {
      taskId: selectedTask.id,
      submittedAt: new Date().toISOString(),
      score,
      grade,
      feedback: generateFeedback(score)
    };
    
    setCurrentSubmission(submission);
    setShowSubmissionModal(false);
    setShowResultModal(true);
    
    toast.success('Task submitted successfully!');
  };

  const generateFeedback = (score) => {
    if (score >= 90) return 'Outstanding work! Excellent understanding and implementation.';
    if (score >= 80) return 'Great job! Good understanding with minor areas for improvement.';
    if (score >= 70) return 'Good work! Understanding demonstrated with some areas needing attention.';
    return 'Work needs improvement. Please review the concepts and try again.';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks & Tests</h1>
          <p className="text-gray-600">Complete assignments, take tests, and submit coding challenges</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.score, 0) / Math.max(tasks.filter(t => t.status === 'completed').length, 1))}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['pending', 'completed', 'all'].map((tab) => (
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
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(task.status)}
                        {getTypeBadge(task.type)}
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2" />
                        Max Score: {task.maxScore}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Time: {task.timeLimit} min
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        Mentor: {task.mentor}
                      </div>
                    </div>

                    {/* Score and Feedback for Completed Tasks */}
                    {task.status === 'completed' && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              Score: <span className={`font-bold ${getScoreColor(task.score)}`}>{task.score}%</span>
                            </p>
                            <p className="text-sm text-green-700">Grade: {task.grade}</p>
                            {task.feedback && (
                              <p className="text-sm text-green-700 mt-1">{task.feedback}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Completed</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col sm:flex-row gap-2">
                    {task.status === 'pending' && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Task
                      </button>
                    )}
                    {task.status === 'completed' && (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Submit: {selectedTask.title}</h3>
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                <textarea
                  value={submissionForm.answer}
                  onChange={(e) => setSubmissionForm(prev => ({ ...prev, answer: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Write your answer here..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSubmissionModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && currentSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Submitted Successfully!</h3>
              
              {/* Score Display */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Your Score</p>
                  <p className={`text-4xl font-bold ${getScoreColor(currentSubmission.score)}`}>
                    {currentSubmission.score}%
                  </p>
                  <p className="text-lg font-medium text-gray-700 mt-1">
                    Grade: {currentSubmission.grade}
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Feedback</h4>
                <p className="text-blue-800 text-sm">{currentSubmission.feedback}</p>
              </div>

              <button
                onClick={() => setShowResultModal(false)}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSubmission;
