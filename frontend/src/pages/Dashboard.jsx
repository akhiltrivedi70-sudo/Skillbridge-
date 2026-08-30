import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/dashboard/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Welcome to SkillBridge 🌉</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

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
  );
}

export default Dashboard;