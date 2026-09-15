import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Matching from './pages/Matching';
import Jobs from './pages/Jobs';
import Connections from './pages/Connections';
import Messages from './pages/Messages';
import Reviews from './pages/Reviews';
import Assessment from './pages/Assessment';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/matching" element={<Matching />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;