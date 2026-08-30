import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Matching() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/matching/mentors/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setMentors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const handleConnect = async (mentorId) => {
    await fetch('http://localhost:8080/api/connections/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { id: userId },
        receiver: { id: mentorId },
        type: 'MENTORSHIP',
      }),
    });
    alert('Connection request sent!');
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Find Mentors 🔍</h1>
        <p className="page-subtitle">Based on the skills you want to learn, here are people who can help.</p>

        {loading ? (
          <p className="empty-state">Finding mentors for you...</p>
        ) : mentors.length === 0 ? (
          <div className="card">
            <p className="empty-state">
              No mentors found yet. Add skills you want to learn on the Skills page, and we'll match you with mentors!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {mentors.map((mentor) => (
              <div className="stat-card" key={mentor.id}>
                <div className="stat-icon">👨‍🏫</div>
                <h3 style={{ marginBottom: '4px' }}>{mentor.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '16px' }}>{mentor.email}</p>
                <button onClick={() => handleConnect(mentor.id)} className="primary-btn" style={{ width: '100%' }}>
                  Send Connection Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matching;