import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  const linkContainerStyle = {
    display: 'flex',
    gap: '24px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#4b5563',
    fontWeight: '500',
    fontSize: '14px',
  };

  const logoStyle = {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'none',
  };

  return (
    <nav style={navStyle}>
      <Link to="/dashboard" style={logoStyle}>🌉 SkillBridge</Link>
      <div style={linkContainerStyle}>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/skills" style={linkStyle}>Skills</Link>
        <Link to="/matching" style={linkStyle}>Find Mentors</Link>
        <Link to="/jobs" style={linkStyle}>Jobs</Link>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;