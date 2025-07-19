import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Clock, Heart, Send, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-3xl p-6 border border-red-500/30 backdrop-blur-sm">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Help Request</h2>
                <p className="text-gray-300 text-lg">
                  Fill out the form below if you need assistance. Our volunteers are here to help!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-indigo-400/50"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-indigo-400/50"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Address Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-indigo-400/50"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Time Slot Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Select Available Time Slot
                </label>
                <div className="relative">
                  <select
                    name="serviceTime"
                    value={form.serviceTime}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 appearance-none"
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">Select a time slot</option>
                    {availableSlots.map((slot) => (
                      <option
                        key={slot}
                        value={slot}
                        className="bg-gray-800 text-white"
                      >
                        {new Date(slot).toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Type Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400" />
                  Type of Help
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 appearance-none"
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">Select type of help</option>
                    <option value="Urgent" className="bg-gray-800 text-white">🆘 Urgent</option>
                    <option value="Medicine" className="bg-gray-800 text-white">💊 Medicine</option>
                    <option value="Daily Tasks" className="bg-gray-800 text-white">🏠 Daily Tasks</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 text-white rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 border border-purple-400/30 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative flex items-center justify-center">
                  <Send className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Submit Request
                </div>
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-gray-400 text-sm">
              Our volunteers will contact you within 30 minutes of submission
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpRequestForm;
