export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'trainee';
  avatar?: string;
  phone?: string;
  department?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  category: 'React' | 'Testing' | 'Cloud' | 'AIML' | 'DotNet';
  level: 'Basics' | 'Intermediate' | 'Advanced';
  mentorId?: string;
  mentor?: User;
  duration: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course?: Course;
  mentorId: string;
  mentor?: User;
  type: 'virtual' | 'manual';
  meetingLink?: string;
  location?: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course?: Course;
  mentorId: string;
  mentor?: User;
  traineeId: string;
  trainee?: User;
  type: 'assignment' | 'test' | 'coding';
  dueDate: string;
  status: 'assigned' | 'submitted' | 'reviewed';
  score?: number;
  maxScore: number;
  feedback?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  user?: User;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  relatedId?: string;
  relatedType?: 'class' | 'task' | 'course';
  createdAt: string;
}

export interface Performance {
  userId: string;
  courseId: string;
  course?: Course;
  totalTasks: number;
  completedTasks: number;
  averageScore: number;
  lastUpdated: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalClasses: number;
  totalTasks: number;
  activeUsers: number;
  pendingReviews: number;
  upcomingClasses: number;
}
