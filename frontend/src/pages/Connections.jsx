import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Connections() {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetchReceived();
    fetchSent();
  }, []);

  const fetchReceived = () => {
    fetch(`http://localhost:8080/api/connections/received/${userId}`)
      .then((res) => res.json())
      .then((data) => setReceivedRequests(data));
  };

  const fetchSent = () => {
    fetch(`http://localhost:8080/api/connections/sent/${userId}`)
      .then((res) => res.json())
      .then((data) => setSentRequests(data));
  };

  const handleAccept = async (requestId) => {
    await fetch(`http://localhost:8080/api/connections/${requestId}/accept`, { method: 'PUT' });
    fetchReceived();
  };

  const handleReject = async (requestId) => {
    await fetch(`http://localhost:8080/api/connections/${requestId}/reject`, { method: 'PUT' });
    fetchReceived();
  };

  const statusColor = { PENDING: '#d97706', ACCEPTED: '#16a34a', REJECTED: '#dc2626' };
  const statusEmoji = { PENDING: '⏳', ACCEPTED: '✅', REJECTED: '❌' };

  const currentRequests = activeTab === 'received' ? receivedRequests : sentRequests;

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Connection Requests 🤝</h1>
        <p className="page-subtitle">Manage your mentorship and skill exchange requests.</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('received')}
            className={activeTab === 'received' ? 'primary-btn' : 'select-field'}
            style={{ cursor: 'pointer' }}
          >
            Received ({receivedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={activeTab === 'sent' ? 'primary-btn' : 'select-field'}
            style={{ cursor: 'pointer' }}
          >
            Sent ({sentRequests.length})
          </button>
        </div>

        {currentRequests.length === 0 ? (
          <div className="card"><p className="empty-state">No {activeTab} requests yet.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentRequests.map((req) => (
              <div className="card" key={req.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ marginBottom: '4px' }}>
                      {activeTab === 'received' ? req.sender.name : req.receiver.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>
                      Type: {req.type} • Status:{' '}
                      <span style={{ color: statusColor[req.status], fontWeight: '600' }}>
                        {statusEmoji[req.status]} {req.status}
                      </span>
                    </p>
                  </div>
                  {activeTab === 'received' && req.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleAccept(req.id)} className="primary-btn" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                        Accept
                      </button>
                      <button onClick={() => handleReject(req.id)} className="primary-btn" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Connections;