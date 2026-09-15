import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Reviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetchReviews();
    fetchAvg();
    fetchConnections();
  }, []);

  const fetchReviews = () => {
    fetch(`http://localhost:8080/api/reviews/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setMyReviews(data));
  };

  const fetchAvg = () => {
    fetch(`http://localhost:8080/api/reviews/user/${userId}/average`)
      .then((res) => res.json())
      .then((data) => setAvgRating(data));
  };

  const fetchConnections = () => {
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
  };

  const handleSubmitReview = async () => {
    if (!selectedUser) return;
    await fetch('http://localhost:8080/api/reviews/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewer: { id: userId },
        reviewee: { id: selectedUser },
        rating: rating,
        comment: comment,
      }),
    });
    setComment('');
    setSelectedUser('');
    alert('Review submitted!');
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Reviews & Ratings ⭐</h1>
        <p className="page-subtitle">See what others say about you, and leave feedback for your connections.</p>

        <div className="stat-card" style={{ marginBottom: '32px', maxWidth: '260px' }}>
          <div className="stat-icon">⭐</div>
          <div className="stat-label">Your Average Rating</div>
          <div className="stat-value">{avgRating.toFixed(1)}</div>
        </div>

        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Leave a Review</h3>
          <div className="form-row" style={{ marginBottom: '12px' }}>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="select-field" style={{ flex: 1, minWidth: '180px' }}>
              <option value="">Select a connection</option>
              {connections.map((conn) => (
                <option key={conn.id} value={conn.id}>{conn.name}</option>
              ))}
            </select>
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="select-field">
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{'⭐'.repeat(r)}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-input"
            style={{ width: '100%', minHeight: '80px', marginBottom: '12px', fontFamily: 'inherit' }}
          />
          <button onClick={handleSubmitReview} className="primary-btn">Submit Review</button>
        </div>

        <h3 style={{ marginBottom: '16px' }}>Reviews About You</h3>
        {myReviews.length === 0 ? (
          <div className="card"><p className="empty-state">No reviews yet.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myReviews.map((review) => (
              <div className="card" key={review.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{review.reviewer.name}</strong>
                  <span>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;