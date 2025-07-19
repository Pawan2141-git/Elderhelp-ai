import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import HelpRequestForm from './pages/HelpRequestForm';
import VolunteerForm from './pages/VolunteerForm';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import MedicineForm from './pages/MedicineForm';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<HelpRequestForm />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/medicine" element={<MedicineForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Chatbot />
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
