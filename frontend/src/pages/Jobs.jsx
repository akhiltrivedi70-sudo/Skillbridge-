import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [expandedJob, setExpandedJob] = useState(null);
  const [mentorSuggestions, setMentorSuggestions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const userId = localStorage.getItem('userId') || 1;

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs/all')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        data.forEach((job) => fetchJobMatch(job.id));
      });
  }, []);

  const fetchJobMatch = async (jobId) => {
    const matchRes = await fetch(`http://localhost:8080/api/jobs/${jobId}/match/${userId}`);
    const match = await matchRes.json();

    const missingRes = await fetch(`http://localhost:8080/api/jobs/${jobId}/missing-skills/${userId}`);
    const missing = await missingRes.json();

    setJobDetails((prev) => ({ ...prev, [jobId]: { match, missing } }));
  };

  const handleShowMentors = async (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }
    setExpandedJob(jobId);
    if (!mentorSuggestions[jobId]) {
      const res = await fetch(`http://localhost:8080/api/jobs/${jobId}/mentors-for-missing-skills/${userId}`);
      const data = await res.json();
      setMentorSuggestions((prev) => ({ ...prev, [jobId]: data }));
    }
  };

  const getMatchColor = (match) => {
    if (match >= 80) return '#16a34a';
    if (match >= 50) return '#d97706';
    return '#dc2626';
  };

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      (job.location && job.location.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Job Opportunities 💼</h1>
        <p className="page-subtitle">Jobs matched to your skills, with mentor suggestions for anything you're missing.</p>

        <div className="card" style={{ marginBottom: '32px' }}>
          <div className="form-row">
            <input
              type="text"
              placeholder="🔍 Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ flex: 1, minWidth: '250px' }}
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="card"><p className="empty-state">
            {searchTerm ? 'No jobs match your search.' : 'No jobs posted yet.'}
          </p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredJobs.map((job) => {
              const details = jobDetails[job.id];
              const match = details?.match ?? 0;
              const missing = details?.missing ?? [];

              return (
                <div className="card" key={job.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ marginBottom: '4px' }}>{job.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '14px' }}>{job.company} • {job.location}</p>
                      {job.eligibility && (
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '6px' }}>Eligibility: {job.eligibility}</p>
                      )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: getMatchColor(match) }}>
                        {Math.round(match)}%
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>Match</div>
                    </div>
                  </div>

                  {missing.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ fontSize: '13px', color: '#dc2626', marginBottom: '8px' }}>
                        Missing skills: {missing.join(', ')}
                      </p>
                      <button onClick={() => handleShowMentors(job.id)} className="primary-btn" style={{ fontSize: '13px', padding: '8px 16px' }}>
                        {expandedJob === job.id ? 'Hide Mentors' : '🎓 Find Mentors for These Skills'}
                      </button>
                    </div>
                  )}

                  {expandedJob === job.id && mentorSuggestions[job.id] && (
                    <div style={{ marginTop: '16px', background: '#f9fafb', padding: '16px', borderRadius: '10px' }}>
                      {Object.entries(mentorSuggestions[job.id]).map(([skillName, mentorList]) => (
                        <div key={skillName} style={{ marginBottom: '12px' }}>
                          <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>{skillName}:</p>
                          {mentorList.length === 0 ? (
                            <p className="empty-state">No mentors available for this skill yet.</p>
                          ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {mentorList.map((mentor) => (
                                <span className="badge" key={mentor.id}>{mentor.name}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;