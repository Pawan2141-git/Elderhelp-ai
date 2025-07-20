import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, MapPin, Pill, Clock, Send, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
    medicineName: '',
    prescription: '',
    urgency: 'normal',
    additionalNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/medicine`, formData);
      toast.success("✅ Medicine request submitted successfully!");
      setFormData({
    name: '',
    age: '',
    phone: '',
    address: '',
    medicineName: '',
    prescription: '',
    urgency: 'normal',
    additionalNotes: ''
  })
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Error submitting request. Please try again.");
      
      
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-200/50 dark:border-blue-500/30 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Request Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your medicine delivery request has been received. A volunteer will contact you soon.
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-900 text-gray-900 dark:text-white p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_50%)]"></div>
      
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-blue-900/50 to-indigo-800/50 rounded-3xl p-6 border border-blue-500/30 backdrop-blur-sm">
                <Pill className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Medicine Delivery Request</h2>
                <p className="text-gray-300 text-lg">
                  Get your prescribed medicines delivered safely to your doorstep
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
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-400" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>

                {/* Age Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      placeholder="Your age"
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>
              </div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Address Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  Delivery Address
                </label>
                <div className="relative">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your complete delivery address"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Medicine Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Medicine Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Pill className="w-4 h-4 text-blue-400" />
                    Medicine Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={handleChange}
                      required
                      placeholder="Name of medicine"
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>

                {/* Urgency Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    Urgency Level
                  </label>
                  <div className="relative">
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 appearance-none"
                    >
                      <option value="normal" className="bg-gray-800 text-white">Normal (24-48 hours)</option>
                      <option value="urgent" className="bg-gray-800 text-white">Urgent (Same day)</option>
                      <option value="emergency" className="bg-gray-800 text-white">Emergency (2-4 hours)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Prescription Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Prescription Details
                </label>
                <div className="relative">
                  <textarea
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter prescription details, dosage, and instructions"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Additional Notes Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Additional Notes
                </label>
                <div className="relative">
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any additional information or special instructions"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-blue-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 border border-blue-400/30 overflow-hidden"
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
            transition={{ duration: 0.8, delay: 1.5 }}
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

export default MedicineForm;
