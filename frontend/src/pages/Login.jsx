import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:8080/api/users/login'
      : 'http://localhost:8080/api/users/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (isLogin) {
        const text = await response.text();
        setMessage(text);
        if (text.includes('successful')) {
          localStorage.setItem('userEmail', formData.email);
          navigate('/dashboard');
        }
      } else {
        const data = await response.json();
        setMessage(`Registered successfully! Welcome ${data.name}`);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userEmail', data.email);
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage('Something went wrong. Is the backend running?');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">🌉</div>
      <h2 className="auth-title">SkillBridge</h2>
      <p className="auth-subtitle">
        {isLogin ? 'Welcome back! Login to continue' : 'Create your account to get started'}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        )}
        <div className="input-group">
          <span className="input-icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>

      {message && <div className="message-box">{JSON.stringify(message)}</div>}
    </div>
  );
}

export default Login;