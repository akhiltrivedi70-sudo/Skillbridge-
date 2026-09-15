import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Assessment() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState([]);
  const [assessmentId, setAssessmentId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [myResults, setMyResults] = useState([]);
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch('http://localhost:8080/api/skills/all')
      .then((res) => res.json())
      .then((data) => setSkills(data));

    fetch(`http://localhost:8080/api/assessments/results/${userId}`)
      .then((res) => res.json())
      .then((data) => setMyResults(data));
  }, [userId]);

    const handleStartQuiz = async () => {
    if (!selectedSkill) return;
    const res = await fetch(`http://localhost:8080/api/assessments/for-skill/${selectedSkill}`);
    const data = await res.json();
    setAssessmentId(data.id);

    const qRes = await fetch(`http://localhost:8080/api/assessments/${data.id}/questions`);
    const qData = await qRes.json();
    setQuestions(qData);
    setAnswers({});
    setResult(null);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/api/assessments/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, assessmentId, answers }),
    });
    const data = await res.json();
    setResult(data);
    setQuestions([]);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Skill Assessment 📝</h1>
        <p className="page-subtitle">Test your knowledge and get a score for your skills.</p>

        {!questions.length && !result && (
          <div className="card" style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px' }}>Start a New Assessment</h3>
            <div className="form-row">
              <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="select-field" style={{ flex: 1, minWidth: '180px' }}>
                <option value="">Select a skill to test</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
              <button onClick={handleStartQuiz} className="primary-btn">Start Quiz</button>
            </div>
          </div>
        )}

        {questions.length > 0 && (
          <div className="card" style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '20px' }}>Answer the Questions</h3>
            {questions.map((q, i) => (
              <div key={q.id} style={{ marginBottom: '24px' }}>
                <p style={{ fontWeight: '600', marginBottom: '10px' }}>{i + 1}. {q.questionText}</p>
                {['optionA', 'optionB', 'optionC', 'optionD'].map((optKey) => (
                  <label key={optKey} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={q[optKey]}
                      onChange={() => handleAnswerChange(q.id, q[optKey])}
                      style={{ marginRight: '8px' }}
                    />
                    {q[optKey]}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={handleSubmit} className="primary-btn">Submit Assessment</button>
          </div>
        )}

        {result && (
          <div className="stat-card" style={{ marginBottom: '32px', maxWidth: '260px' }}>
            <div className="stat-icon">🎯</div>
            <div className="stat-label">Your Score</div>
            <div className="stat-value">{result.score}%</div>
          </div>
        )}

        <h3 style={{ marginBottom: '16px' }}>Past Assessments</h3>
        {myResults.length === 0 ? (
          <div className="card"><p className="empty-state">No assessments taken yet.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {myResults.map((r) => (
              <div className="card" key={r.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Assessment #{r.assessment.id}</span>
                <strong>{r.score}%</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assessment;