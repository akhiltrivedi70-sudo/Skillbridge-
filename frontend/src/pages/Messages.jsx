import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Messages() {
  const [otherUserId, setOtherUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connections, setConnections] = useState([]);
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/connections/received/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const accepted = data.filter((r) => r.status === 'ACCEPTED').map((r) => r.sender);
        fetch(`http://localhost:8080/api/connections/sent/${userId}`)
          .then((res) => res.json())
          .then((sentData) => {
            const acceptedSent = sentData.filter((r) => r.status === 'ACCEPTED').map((r) => r.receiver);
            setConnections([...accepted, ...acceptedSent]);
          });
      });
  }, [userId]);

  const loadConversation = async (userIdToChat) => {
    setOtherUserId(userIdToChat);
    const res = await fetch(`http://localhost:8080/api/messages/conversation?user1Id=${userId}&user2Id=${userIdToChat}`);
    const data = await res.json();
    setMessages(data);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !otherUserId) return;
    await fetch('http://localhost:8080/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { id: userId },
        receiver: { id: otherUserId },
        content: newMessage,
      }),
    });
    setNewMessage('');
    loadConversation(otherUserId);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Messages 💬</h1>
        <p className="page-subtitle">Chat with your connections.</p>

        <div style={{ display: 'flex', gap: '24px', minHeight: '400px' }}>
          <div className="card" style={{ width: '260px', flexShrink: 0 }}>
            <h3 style={{ marginBottom: '16px', fontSize: '15px' }}>Your Connections</h3>
            {connections.length === 0 ? (
              <p className="empty-state">No accepted connections yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {connections.map((conn) => (
                  <button
                    key={conn.id}
                    onClick={() => loadConversation(conn.id)}
                    className="select-field"
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: otherUserId == conn.id ? '#ede9fe' : 'white',
                    }}
                  >
                    {conn.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {!otherUserId ? (
              <p className="empty-state">Select a connection to start chatting.</p>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', maxHeight: '350px' }}>
                  {messages.length === 0 ? (
                    <p className="empty-state">No messages yet. Say hi!</p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          display: 'flex',
                          justifyContent: msg.sender.id == userId ? 'flex-end' : 'flex-start',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            background: msg.sender.id == userId ? '#7c3aed' : '#f3f4f6',
                            color: msg.sender.id == userId ? 'white' : '#1f2937',
                            padding: '10px 16px',
                            borderRadius: '14px',
                            maxWidth: '70%',
                            fontSize: '14px',
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                  <button onClick={handleSend} className="primary-btn">Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;