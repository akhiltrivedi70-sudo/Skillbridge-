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

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px' }}>My Skills</h1>

        <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '12px' }}>Add a Skill</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              style={{ flex: 1, padding: '10px' }}
            >
              <option value="">Select a skill</option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ padding: '10px' }}>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            <button onClick={handleAddSkill} style={{ padding: '10px 20px', cursor: 'pointer' }}>
              Add
            </button>
          </div>
        </div>

        <h3 style={{ marginBottom: '12px' }}>Your Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {mySkills.length === 0 && <p style={{ color: '#9ca3af' }}>No skills added yet.</p>}
          {mySkills.map((us) => (
            <div
              key={us.id}
              style={{
                background: '#ede9fe',
                color: '#5b21b6',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
              }}
            >
              {us.skill.name} — {us.level}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;