# Maganti Learning Management System (LMS)

A professional, modern Learning Management System built for Maganti Company with role-based access control, comprehensive dashboards, and interactive features.

## 🚀 Features

### 🔐 Authentication & Roles
- **3 User Roles**: Admin, Mentor, Trainee
- **Secure Login System** with role-based access control
- **Profile Management** with photo upload and personal details
- **Session Management** with persistent login state

### 👨‍💼 Admin Features
- **Complete User Management**: Create, edit, deactivate trainees & mentors
- **Course Management**: Full CRUD for React, Testing, Cloud, AIML, DotNet courses
- **3 Course Levels**: Basics → Intermediate → Advanced
- **Class Scheduling**: Virtual (meeting links) and Manual (location-based)
- **Notifications System**: Send notifications to mentors & trainees
- **Performance Tracking**: Interactive charts, graphs, and reports
- **Dashboard Analytics**: Real-time statistics and insights

### 👨‍🏫 Mentor Features
- **Course Assignment**: Specific course management (e.g., React mentor → React only)
- **Task Management**: Create and manage assignments, tests, coding tasks
- **Content Upload**: Class notes, documents, recordings for trainees
- **Trainee Progress**: Monitor assigned trainees and their performance
- **Review System**: Dashboard for pending task/test reviews
- **Communication**: Direct messaging with trainees

### 👨‍🎓 Trainee Features
- **Course Access**: View assigned courses, classes, tasks, and tests
- **Real-time Notifications**: Instant updates for new classes, tasks, messages
- **Task Submission**: Submit assignments, tests, and coding projects
- **Instant Feedback**: Immediate scores and feedback after submission
- **Learning Materials**: Access to notes, documents, and recordings
- **Performance Analytics**: Progress tracking with visual charts

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with hamburger sidebar
- **Modern Interface**: Clean, professional design using Tailwind CSS + Bootstrap
- **Interactive Charts**: Beautiful data visualization with Recharts
- **Role-based Navigation**: Dynamic sidebar based on user role
- **Toast Notifications**: User-friendly feedback system
- **Loading States**: Smooth user experience with loading indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Hamburger Menu**: Collapsible sidebar for mobile devices
- **Touch-Friendly**: Optimized for touch interactions
- **Cross-Platform**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd maganti-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Role-specific dashboards
│   └── Layout/         # Layout components (Sidebar, Header)
├── context/            # React Context providers
├── types/              # TypeScript type definitions
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Components

### Admin Dashboard
- **Statistics Cards**: User counts, course metrics, performance indicators
- **Interactive Charts**: Course distribution, performance trends
- **Quick Actions**: Add users, courses, schedule classes
- **Recent Activities**: Real-time system activity feed

### Mentor Dashboard
- **Assigned Courses**: Course overview with progress tracking
- **Pending Reviews**: Tasks and tests requiring review
- **Trainee Progress**: Individual trainee performance cards
- **Performance Analytics**: Weekly/monthly performance trends

### Trainee Dashboard
- **Enrolled Courses**: Course progress with visual indicators
- **Upcoming Classes**: Class schedule with join links
- **Task Management**: Pending and completed assignments
- **Performance Tracking**: Score analytics and progress charts

## 🔧 Customization

### Colors and Themes
The system uses a comprehensive color palette defined in `tailwind.config.js`:
- **Primary**: Blue shades for main actions
- **Success**: Green shades for positive states
- **Warning**: Yellow/Orange shades for alerts
- **Danger**: Red shades for errors/warnings

### Adding New Features
1. Create new components in appropriate directories
2. Add routes in `App.tsx`
3. Update sidebar navigation in `Sidebar.tsx`
4. Add TypeScript types in `types/index.ts`

## 📊 Performance Features

- **Lazy Loading**: Components load on demand
- **Optimized Charts**: Efficient data visualization
- **Responsive Images**: Optimized for different screen sizes
- **Smooth Animations**: CSS transitions for better UX

## 🔒 Security Features

- **Role-based Access Control**: Users only see authorized features
- **Protected Routes**: Authentication required for all dashboard access
- **Input Validation**: Form validation and sanitization
- **Session Management**: Secure login state handling

## 🌟 Future Enhancements

- **Real-time Chat**: In-app messaging system
- **File Management**: Advanced document handling
- **Video Integration**: Video conferencing capabilities
- **Mobile App**: React Native mobile application
- **API Integration**: Backend service integration
- **Advanced Analytics**: Machine learning insights

## 📞 Support

For technical support or feature requests, please contact the development team.

## 📄 License

This project is proprietary software developed for Maganti Company.

---

**Built with ❤️ for Maganti Company**
