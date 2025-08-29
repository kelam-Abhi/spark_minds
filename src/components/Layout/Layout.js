import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  console.log('🏗️ Layout component rendering, current path:', location.pathname);

  const toggleSidebar = () => {
    console.log('🔄 Toggling sidebar from:', sidebarOpen, 'to:', !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Full width across screen */}
      <Header onMenuToggle={toggleSidebar} />
      
      {/* Main Content Area - Below Header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Below Header, Left Side */}
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        {/* Page Content - Takes remaining space */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="debug-info" style={{display: 'none'}}>
            Current path: {location.pathname}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
