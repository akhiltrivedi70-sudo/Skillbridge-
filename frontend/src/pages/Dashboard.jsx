import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/dashboard/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, [userId]);

  const stats = [
    { label: 'Unread Messages', value: dashboardData?.unreadMessages, icon: '💬' },
    { label: 'Received Requests', value: dashboardData?.receivedRequests, icon: '📥' },
    { label: 'Sent Requests', value: dashboardData?.sentRequests, icon: '📤' },
    { label: 'Assessments Taken', value: dashboardData?.assessmentsTaken, icon: '📝' },
  ];

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Welcome back! 👋</h1>
        <p className="page-subtitle">Here's what's happening with your SkillBridge journey.</p>

        {dashboardData ? (
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">Loading dashboard...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;