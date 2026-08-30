import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Skills() {
  const [allSkills, setAllSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetchAllSkills();
    fetchMySkills();
  }, []);

  const fetchAllSkills = () => {
    fetch('http://localhost:8080/api/skills/all')
      .then((res) => res.json())
      .then((data) => setAllSkills(data));
  };

  const fetchMySkills = () => {
    fetch(`http://localhost:8080/api/user-skills/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setMySkills(data));
  };

  const handleAddSkill = async () => {
    if (!selectedSkill) return;
    await fetch('http://localhost:8080/api/user-skills/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: { id: userId },
        skill: { id: selectedSkill },
        level: level,
      }),
    });
    fetchMySkills();
  };

  const levelEmoji = { BEGINNER: '🌱', INTERMEDIATE: '🌿', ADVANCED: '🌳' };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">My Skills 🎯</h1>
        <p className="page-subtitle">Add the skills you know and track your proficiency level.</p>

        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Add a New Skill</h3>
          <div className="form-row">
            <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="select-field" style={{ flex: 1, minWidth: '180px' }}>
              <option value="">Select a skill</option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="select-field">
              <option value="BEGINNER">🌱 Beginner</option>
              <option value="INTERMEDIATE">🌿 Intermediate</option>
              <option value="ADVANCED">🌳 Advanced</option>
            </select>
            <button onClick={handleAddSkill} className="primary-btn">+ Add Skill</button>
          </div>
        </div>

        <h3 style={{ marginBottom: '16px' }}>Your Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {mySkills.length === 0 && <p className="empty-state">No skills added yet. Add your first skill above!</p>}
          {mySkills.map((us) => (
            <div className="badge" key={us.id}>
              {levelEmoji[us.level]} {us.skill.name} — {us.level}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;