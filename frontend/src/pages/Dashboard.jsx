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

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Welcome to SkillBridge 🌉</h1>

        {dashboardData ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px' }}>
              <h3>Unread Messages</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{dashboardData.unreadMessages}</p>
            </div>
            <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px' }}>
              <h3>Received Requests</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{dashboardData.receivedRequests}</p>
            </div>
            <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px' }}>
              <h3>Sent Requests</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{dashboardData.sentRequests}</p>
            </div>
            <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px' }}>
              <h3>Assessments Taken</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{dashboardData.assessmentsTaken}</p>
            </div>
          </div>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;