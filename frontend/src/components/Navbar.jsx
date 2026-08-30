import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">🌉 SkillBridge</Link>
      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/skills" className="navbar-link">Skills</Link>
        <Link to="/matching" className="navbar-link">Find Mentors</Link>
        <Link to="/jobs" className="navbar-link">Jobs</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;