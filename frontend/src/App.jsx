import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Matching from './pages/Matching';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/matching" element={<Matching />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;