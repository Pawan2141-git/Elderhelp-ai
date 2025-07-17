import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const HelpRequestForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', address: '', serviceTime: '', type: '' });

  // Dummy available slots (in real app, fetch from backend)
  const availableSlots = [
    "2024-06-10T10:00",
    "2024-06-10T12:00",
    "2024-06-10T15:00",
  ];

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/help', form);
      toast.success("✅ Help request submitted!");
      setForm({ name: '', phone: '', address: '', serviceTime: '', type: '' });
    } catch {
      toast.error("❌ Submission failed.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-950 p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-xl p-8 bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400 text-center">Help Request</h2>
        <p className="text-base text-gray-300 mb-8 text-center">
          Fill out the form below if you need assistance. Our volunteers are here to help!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-200 text-sm">Full Name</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="rounded-2xl px-5 py-4 bg-gray-800 text-white shadow-inner focus:bg-gray-700 focus:scale-105 focus:shadow-[13px_13px_40px_#222,-13px_-13px_40px_#444] outline-none w-full text-lg transition-all duration-300 border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 text-sm">Phone Number</label>
            <input
              type="text"
              autoComplete="off"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="rounded-2xl px-5 py-4 bg-gray-800 text-white shadow-inner focus:bg-gray-700 focus:scale-105 focus:shadow-[13px_13px_40px_#222,-13px_-13px_40px_#444] outline-none w-full text-lg transition-all duration-300 border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 text-sm">Location</label>
            <input
              type="text"
              autoComplete="off"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Your Address"
              required
              className="rounded-2xl px-5 py-4 bg-gray-800 text-white shadow-inner focus:bg-gray-700 focus:scale-105 focus:shadow-[13px_13px_40px_#222,-13px_-13px_40px_#444] outline-none w-full text-lg transition-all duration-300 border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-200 text-sm">Select Available Time Slot</label>
            <select
              name="serviceTime"
              value={form.serviceTime}
              onChange={handleChange}
              required
              className="rounded-2xl px-5 py-4 bg-gray-800 text-white shadow-inner focus:bg-gray-700 focus:scale-105 focus:shadow-[13px_13px_40px_#222,-13px_-13px_40px_#444] outline-none w-full text-lg transition-all duration-300 border border-gray-700"
            >
              <option value="" disabled className="bg-gray-900 text-gray-400">Select a time slot</option>
              {availableSlots.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                  className="bg-gray-900 text-white"
                >
                  {new Date(slot).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-200 text-sm">Type of Help</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="rounded-2xl px-5 py-4 bg-gray-800 text-white shadow-inner focus:bg-gray-700 focus:scale-105 focus:shadow-[13px_13px_40px_#222,-13px_-13px_40px_#444] outline-none w-full text-lg transition-all duration-300 border border-gray-700"
            >
              <option value="" disabled>Select type of help</option>
              <option value="Urgent">Urgent</option>
              <option value="Medicine">Medicine</option>
              <option value="Daily Tasks">Daily Tasks</option>
            </select>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200"
          >
            Submit Request
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default HelpRequestForm;
