import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Clock, Users, Send, AlertCircle, FileText, Heart } from 'lucide-react';
import axios from "axios";
const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    experience: '',
    availability: '',
    skills: '',
    motivation: ''
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
      await axios.post(backendUrl+'/api/volunteer', formData);
      toast.success("✅ volunteer  request submitted!");
      setFormData({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    experience: '',
    availability: '',
    skills: '',
    motivation: ''
  });
    } catch {
      toast.error("❌ Submission failed.");
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-900 dark:via-emerald-900 dark:to-green-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-green-200/50 dark:border-green-500/30 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for your interest in volunteering! We'll review your application and contact you soon.
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-900 dark:via-emerald-900 dark:to-green-900 text-gray-900 dark:text-white p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_50%)]"></div>
      
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
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-green-900/50 to-emerald-800/50 rounded-3xl p-6 border border-green-500/30 backdrop-blur-sm">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Volunteer Application</h2>
                <p className="text-gray-300 text-lg">
                  Join our community of caring volunteers and make a difference in elders' lives
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
                    <User className="w-4 h-4 text-green-400" />
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
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
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
                    <Clock className="w-4 h-4 text-green-400" />
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
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-400" />
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
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-400" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                  </div>
                </motion.div>
              </div>

              {/* Address Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  Address
                </label>
                <div className="relative">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your complete address"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Experience and Availability */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-400" />
                    Previous Experience
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 appearance-none"
                    >
                      <option value="" className="bg-gray-800 text-white">Select experience level</option>
                      <option value="none" className="bg-gray-800 text-white">No experience (willing to learn)</option>
                      <option value="some" className="bg-gray-800 text-white">Some experience with elderly care</option>
                      <option value="experienced" className="bg-gray-800 text-white">Experienced in elderly care</option>
                      <option value="professional" className="bg-gray-800 text-white">Healthcare professional</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Availability Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="group"
                >
                  <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    Availability
                  </label>
                  <div className="relative">
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 appearance-none"
                    >
                      <option value="" className="bg-gray-800 text-white">Select availability</option>
                      <option value="weekdays" className="bg-gray-800 text-white">Weekdays only</option>
                      <option value="weekends" className="bg-gray-800 text-white">Weekends only</option>
                      <option value="flexible" className="bg-gray-800 text-white">Flexible schedule</option>
                      <option value="emergency" className="bg-gray-800 text-white">Emergency response only</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Skills Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-green-400" />
                  Skills & Specializations
                </label>
                <div className="relative">
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe your skills, certifications, or specializations (e.g., medical training, driving license, cooking skills)"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Motivation Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="group"
              >
                <label className="block mb-3 text-gray-200 text-sm font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-400" />
                  Why do you want to volunteer?
                </label>
                <div className="relative">
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about your motivation to help elderly people"
                    className="w-full px-6 py-4 bg-white/5 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-lg backdrop-blur-sm group-hover:bg-white/10 group-hover:border-green-400/50 resize-none"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-500 hover:via-emerald-500 hover:to-green-600 text-white rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 border border-green-400/30 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative flex items-center justify-center">
                  <Send className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Submit Application
                </div>
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <p className="text-gray-400 text-sm">
              We'll review your application and contact you within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerForm;
