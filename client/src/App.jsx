import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HelpRequestForm from './pages/HelpRequestForm';
import VolunteerForm from './pages/VolunteerForm';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import MedicineForm from './pages/MedicineForm'; // ✅ Imported
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<HelpRequestForm />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/medicine" element={<MedicineForm />} /> {/* ✅ Added */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
