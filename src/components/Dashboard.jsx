import React from 'react';
import AdminDashboard from '../features/dashboard/AdminDashboard';
import LeaderDashboard from '../features/dashboard/LeaderDashboard';
import AgentDashboard from '../features/dashboard/AgentDashboard';

function Dashboard() {
  // Get role from localStorage, default to admin if not set
  const userRole = localStorage.getItem('userRole') || 'admin';

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'leader':
        return <LeaderDashboard />;
      case 'agent':
        return <AgentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="space-y-4">
      {renderDashboard()}
    </div>
  );
}

export default Dashboard;