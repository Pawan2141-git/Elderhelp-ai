import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { User, Settings, Shield, Bell, Heart, Calendar, MapPin, Phone, Mail, Camera, Upload } from 'lucide-react';

const Profile = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user role - in real app this would come from auth context
  const userRole = 'admin'; // Change to 'user' for regular user
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Elder Care Street, Senior City, SC 12345',
    age: 72,
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    profilePicture: null,
    role: userRole,
    adminStats: {
      totalUsers: 1247,
      activeRequests: 23,
      pendingVolunteers: 8,
      systemUptime: '99.9%'
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsAlerts: false,
      accessibility: true
    }
  });

  const [editedData, setEditedData] = useState(userData);
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedData({
          ...editedData,
          profilePicture: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const tabs = userRole === 'admin' ? [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'admin', label: 'Admin Panel', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ] : [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDark ? 'from-gray-300 to-gray-100' : 'from-gray-700 to-gray-900'
            }`}>
              My Profile
            </span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-xl`}>
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-4">
                  <div className={`w-24 h-24 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                    {editedData.profilePicture ? (
                      <img 
                        src={editedData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-500" />
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <motion.button
                    onClick={handleUploadClick}
                    className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                  
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{userData.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{userData.email}</p>
                {userRole === 'admin' && (
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Shield className="w-3 h-3 mr-1" />
                    Administrator
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? `${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`
                          : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-xl`}>
              
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                          isDark 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <div className="space-x-2">
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            isDark 
                              ? 'bg-gray-700 text-white hover:bg-gray-600' 
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Profile Picture Section */}
                    <div className="md:col-span-2 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                            {editedData.profilePicture ? (
                              <img 
                                src={editedData.profilePicture} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-10 h-10 text-gray-500" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="space-y-2">
                            <button
                              onClick={handleUploadClick}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                isDark 
                                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                              }`}
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload Photo</span>
                            </button>
                            
                            {editedData.profilePicture && (
                              <button
                                onClick={() => setEditedData({...editedData, profilePicture: null})}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                  isDark 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                              >
                                <span>Remove Photo</span>
                              </button>
                            )}
                            
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Recommended: Square image, max 2MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.name}
                            onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' 
                                : 'bg-white border-gray-300 focus:border-gray-500'
                            }`}
                          />
                        ) : (
                          <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {userData.name}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedData.email}
                            onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' 
                                : 'bg-white border-gray-300 focus:border-gray-500'
                            }`}
                          />
                        ) : (
                          <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {userData.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedData.phone}
                            onChange={(e) => setEditedData({...editedData, phone: e.target.value})}
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' 
                                : 'bg-white border-gray-300 focus:border-gray-500'
                            }`}
                          />
                        ) : (
                          <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {userData.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Address & Emergency Contact */}
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            value={editedData.address}
                            onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                            rows={3}
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' 
                                : 'bg-white border-gray-300 focus:border-gray-500'
                            }`}
                          />
                        ) : (
                          <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {userData.address}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Emergency Contact
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.emergencyContact}
                            onChange={(e) => setEditedData({...editedData, emergencyContact: e.target.value})}
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                              isDark 
                                ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' 
                                : 'bg-white border-gray-300 focus:border-gray-500'
                            }`}
                          />
                        ) : (
                          <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            {userData.emergencyContact} - {userData.emergencyPhone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                  <div className="space-y-4">
                    {Object.entries(userData.preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {key === 'notifications' && 'Receive push notifications'}
                            {key === 'emailUpdates' && 'Get email updates about your requests'}
                            {key === 'smsAlerts' && 'Receive SMS alerts for urgent matters'}
                            {key === 'accessibility' && 'Enable accessibility features'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setUserData({
                              ...userData,
                              preferences: {
                                ...userData.preferences,
                                [key]: e.target.checked
                              }
                            })}
                            className="sr-only"
                          />
                          <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
                            value 
                              ? 'bg-gray-600' 
                              : isDark ? 'bg-gray-700' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 rounded-full transition-all duration-200 ${
                              value 
                                ? 'bg-white translate-x-5' 
                                : 'bg-white translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-2">Change Password</h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Update your password to keep your account secure
                      </p>
                      <button className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}>
                        Change Password
                      </button>
                    </div>

                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Add an extra layer of security to your account
                      </p>
                      <button className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}>
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Admin Panel Tab */}
              {activeTab === 'admin' && userRole === 'admin' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                  
                  {/* Admin Stats */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</p>
                          <p className="text-2xl font-bold">{userData.adminStats.totalUsers}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-100'}`}>
                          <User className="w-5 h-5 text-blue-600 dark:text-white" />
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Requests</p>
                          <p className="text-2xl font-bold">{userData.adminStats.activeRequests}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-green-600' : 'bg-green-100'}`}>
                          <svg className="w-5 h-5 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pending Volunteers</p>
                          <p className="text-2xl font-bold">{userData.adminStats.pendingVolunteers}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-yellow-600' : 'bg-yellow-100'}`}>
                          <svg className="w-5 h-5 text-yellow-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>System Uptime</p>
                          <p className="text-2xl font-bold">{userData.adminStats.systemUptime}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-green-600' : 'bg-green-100'}`}>
                          <svg className="w-5 h-5 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span>View All Requests</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        
                        <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span>Manage Volunteers</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        
                        <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span>System Settings</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'}`}></div>
                          <span className="text-sm">New help request received</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                          <span className="text-sm">Volunteer registration approved</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm">System maintenance completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && userRole === 'admin' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-4">User Growth</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">This Month</span>
                          <span className="font-semibold">+15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Month</span>
                          <span className="font-semibold">+8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Users</span>
                          <span className="font-semibold">1,247</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <h3 className="font-semibold mb-4">Request Statistics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Pending</span>
                          <span className="font-semibold text-yellow-600">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Completed</span>
                          <span className="font-semibold text-green-600">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">In Progress</span>
                          <span className="font-semibold text-blue-600">12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
                  <div className="space-y-4">
                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Request Updates</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Get notified when your help requests are updated
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-11 h-6 bg-gray-600 rounded-full">
                            <div className="w-5 h-5 bg-white rounded-full translate-x-5"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Volunteer Messages</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Receive messages from volunteers about your requests
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-11 h-6 bg-gray-600 rounded-full">
                            <div className="w-5 h-5 bg-white rounded-full translate-x-5"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Emergency Alerts</h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Critical alerts for emergency situations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only" />
                          <div className="w-11 h-6 bg-gray-600 rounded-full">
                            <div className="w-5 h-5 bg-white rounded-full translate-x-5"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {userRole === 'admin' && (
                      <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Admin Alerts</h3>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              System alerts and critical notifications for administrators
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only" />
                            <div className="w-11 h-6 bg-gray-600 rounded-full">
                              <div className="w-5 h-5 bg-white rounded-full translate-x-5"></div>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 