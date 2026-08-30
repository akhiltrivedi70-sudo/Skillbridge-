import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Matching() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allSkills, setAllSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/matching/mentors/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setMentors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('http://localhost:8080/api/skills/all')
      .then((res) => res.json())
      .then((data) => setAllSkills(data));
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

  const handleSearch = async () => {
    if (!searchSkill) return;
    setSearching(true);
    const res = await fetch(`http://localhost:8080/api/user-skills/skill/${searchSkill}`);
    const data = await res.json();
    const users = data
      .filter((us) => us.user.id != userId)
      .map((us) => ({ ...us.user, level: us.level }));
    setSearchResults(users);
    setSearching(false);
  };

  const MentorCard = ({ mentor }) => (
    <div className="stat-card">
      <div className="stat-icon">👨‍🏫</div>
      <h3 style={{ marginBottom: '4px' }}>{mentor.name}</h3>
      <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '16px' }}>{mentor.email}</p>
      <button onClick={() => handleConnect(mentor.id)} className="primary-btn" style={{ width: '100%' }}>
        Send Connection Request
      </button>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Find Mentors 🔍</h1>
        <p className="page-subtitle">Search for any skill, or check mentors we've suggested for you.</p>

        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Search by Skill</h3>
          <div className="form-row">
            <select value={searchSkill} onChange={(e) => setSearchSkill(e.target.value)} className="select-field" style={{ flex: 1, minWidth: '180px' }}>
              <option value="">Select a skill to search</option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
            <button onClick={handleSearch} className="primary-btn">🔍 Search</button>
          </div>
        </div>

        {searchResults !== null && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ marginBottom: '16px' }}>Search Results</h3>
            {searching ? (
              <p className="empty-state">Searching...</p>
            ) : searchResults.length === 0 ? (
              <div className="card"><p className="empty-state">No one with this skill found.</p></div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {searchResults.map((mentor) => <MentorCard mentor={mentor} key={mentor.id} />)}
              </div>
            )}
          </div>
        )}

        <h3 style={{ marginBottom: '16px' }}>Suggested For You</h3>
        {loading ? (
          <p className="empty-state">Finding mentors for you...</p>
        ) : mentors.length === 0 ? (
          <div className="card">
            <p className="empty-state">
              No suggestions yet. Add skills you want to learn on the Skills page!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {mentors.map((mentor) => <MentorCard mentor={mentor} key={mentor.id} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Matching;