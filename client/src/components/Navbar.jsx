import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logoImage from '../assets/225864081.png';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  // Check if we're on a form page
  const isFormPage = location.pathname.includes('/help') || 
                     location.pathname.includes('/medicine') || 
                     location.pathname.includes('/volunteer');

  return (
    <nav className={`p-4 flex justify-between items-center shadow-2xl border-b backdrop-blur-sm transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-white/10' 
        : 'bg-gradient-to-r from-white via-gray-50 to-white text-black border-black/10'
    }`}>
      <Link to="/" className="group">
        <motion.div 
          className="flex items-center space-x-3 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Logo with enhanced styling */}
          <motion.div
            className="relative"
            whileHover={{ rotate: 5, scale: 1.1 }}
            animate={{ 
              boxShadow: isDark 
                ? "0 0 20px rgba(255,255,255,0.3)" 
                : "0 0 20px rgba(0,0,0,0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Circle shape container */}
            <div className={`relative w-12 h-12 rounded-full overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-2 border-white/30' 
                : 'bg-gradient-to-br from-blue-400/10 to-purple-500/10 backdrop-blur-sm border-2 border-black/20'
            }`}>
              {/* Inner circle for image */}
              <div className="absolute inset-1 bg-white/90 dark:bg-gray-900/90 rounded-full">
                <img 
                  src={logoImage} 
                  alt="ElderHelp.ai Logo" 
                  className="w-full h-full object-cover rounded-full p-1"
                />
              </div>
            </div>
            
            {/* Outer glow effect */}
            <div className={`absolute inset-0 rounded-full blur-sm opacity-60 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400/40 via-purple-500/40 to-pink-400/40' 
                : 'bg-gradient-to-r from-blue-500/30 via-purple-600/30 to-pink-500/30'
            }`}></div>
            
            {/* Floating accent dots */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse ${
              isDark ? 'bg-blue-400' : 'bg-blue-500'
            }`}></div>
            <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse ${
              isDark ? 'bg-purple-400' : 'bg-purple-500'
            }`}></div>
          </motion.div>
          
          {/* Enhanced text styling */}
          <div className="relative">
            <h1 
              className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-white via-gray-200 to-white group-hover:from-gray-200 group-hover:via-white group-hover:to-gray-200' 
                  : 'bg-gradient-to-r from-black via-gray-700 to-black group-hover:from-gray-700 group-hover:via-black group-hover:to-gray-700'
              }`}
            >
              ElderHelp.ai
            </h1>
            {/* Text glow effect */}
            <div className={`absolute inset-0 blur-sm opacity-30 transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' 
                : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
            }`}></div>
          </div>
          
          {/* Floating particles effect */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className={`w-full h-full rounded-full ${
              isDark ? 'bg-blue-400' : 'bg-blue-500'
            }`}></div>
          </motion.div>
        </motion.div>
      </Link>
      
      <div className="space-x-4 flex items-center">
        {/* Only show profile and login buttons if not on form page */}
        {!isFormPage && (
          <>
            <Link to="/profile">
              <motion.button 
                className={`relative overflow-hidden px-2.5 py-1 rounded text-xs font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-sm border group ${
                  isDark 
                    ? 'bg-gradient-to-r from-white/20 via-white/10 to-white/20 text-white hover:from-white/30 hover:via-white/20 hover:to-white/30 hover:shadow-white/25 border-white/20 hover:border-white/30' 
                    : 'bg-gradient-to-r from-black/20 via-black/10 to-black/20 text-black hover:from-black/30 hover:via-black/20 hover:to-black/30 hover:shadow-black/25 border-black/20 hover:border-black/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <div className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-current/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
                
                {/* Button content */}
                <div className="relative flex items-center">
                  <svg className="w-3 h-3 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-normal tracking-wide text-xs">Profile</span>
                </div>
              </motion.button>
            </Link>

            <Link to="/admin">
              <motion.button 
                className={`relative overflow-hidden px-2.5 py-1 rounded text-xs font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-sm border group ${
                  isDark 
                    ? 'bg-gradient-to-r from-white/20 via-white/10 to-white/20 text-white hover:from-white/30 hover:via-white/20 hover:to-white/30 hover:shadow-white/25 border-white/20 hover:border-white/30' 
                    : 'bg-gradient-to-r from-black/20 via-black/10 to-black/20 text-black hover:from-black/30 hover:via-black/20 hover:to-black/30 hover:shadow-black/25 border-black/20 hover:border-black/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <div className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-current/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
                
                {/* Button content */}
                <div className="relative flex items-center">
                  <svg className="w-3 h-3 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-normal tracking-wide text-xs">Adminpanel</span>
                </div>
              </motion.button>
            </Link>
            
            <Link to="/login">
              <motion.button 
                className={`relative overflow-hidden px-2.5 py-1 rounded text-xs font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-sm border group ${
                  isDark 
                    ? 'bg-gradient-to-r from-white/20 via-white/10 to-white/20 text-white hover:from-white/30 hover:via-white/20 hover:to-white/30 hover:shadow-white/25 border-white/20 hover:border-white/30' 
                    : 'bg-gradient-to-r from-black/20 via-black/10 to-black/20 text-black hover:from-black/30 hover:via-black/20 hover:to-black/30 hover:shadow-black/25 border-black/20 hover:border-black/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <div className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-current/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
                
                {/* Button content */}
                <div className="relative flex items-center">
                  <svg className="w-3 h-3 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-normal tracking-wide text-xs">Login</span>
                </div>
              </motion.button>
            </Link>
          </>
        )}
        
        {/* Only show theme toggle if not on form page */}
        {!isFormPage && (
          <motion.button
            onClick={toggleTheme}
            className={`relative overflow-hidden px-2.5 py-1 rounded text-xs font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-sm border group backdrop-blur-sm ${
              isDark 
                ? 'bg-gradient-to-r from-white/20 via-white/10 to-white/20 text-white hover:from-white/30 hover:via-white/20 hover:to-white/30 hover:shadow-white/25 border-white/20 hover:border-white/30' 
                : 'bg-gradient-to-r from-black/20 via-black/10 to-black/20 text-black hover:from-black/30 hover:via-black/20 hover:to-black/30 hover:shadow-black/25 border-black/20 hover:border-black/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shine effect */}
            <div className={`absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-current/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
            
            {/* Button content */}
            <div className="relative flex items-center">
              {isDark ? (
                <Sun className="w-3 h-3 mr-1 group-hover:animate-pulse" />
              ) : (
                <Moon className="w-3 h-3 mr-1 group-hover:animate-pulse" />
              )}
              <span className="font-normal tracking-wide text-xs">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </div>
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
