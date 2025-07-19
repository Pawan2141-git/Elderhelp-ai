import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const servicesRef = useRef(null);
  const [showServices, setShowServices] = useState(false);

  const scrollToServices = () => {
    setShowServices(true);
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-white">

      {/* 🎯 HERO FULL SCREEN SECTION */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 via-gray-200/40 to-gray-100/30 dark:from-gray-800/20 dark:via-gray-700/30 dark:to-gray-800/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(75,85,99,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(156,163,175,0.2),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gray-400/30 dark:bg-gray-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Main Logo/Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 rounded-3xl blur-xl opacity-75"></div>
              <h1 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200 bg-clip-text text-transparent px-8 py-4 rounded-3xl border border-gray-200/20 dark:border-gray-300/20 backdrop-blur-sm">
                ElderHelp.ai
              </h1>
            </div>
          </motion.div>

          {/* Subtitle with enhanced styling */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-300 font-semibold">compassion</span> meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-400 font-semibold">technology</span> — connecting senior citizens with helpful, trusted volunteers near them.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
              className="group relative px-8 py-3 text-lg font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 text-white rounded-xl shadow-2xl transition-all duration-300 border border-gray-400/30 overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Explore Services
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold border-2 border-gray-400/50 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
              onClick={() => {
                const missionSection = document.querySelector('section[id="mission-section"]');
                if (missionSection) missionSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* 🌟 OUR MISSION SECTION */}
      <motion.section
        id="mission-section"
        className="relative py-20 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 via-gray-200/20 to-gray-100/20 dark:from-gray-800/20 dark:via-gray-700/20 dark:to-gray-800/20 rounded-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full blur-xl opacity-50"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Mission Icon"
                  className="relative w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl rounded-full bg-gradient-to-br from-gray-600 to-gray-700 p-4 border-4 border-white/20 dark:border-gray-300/20 backdrop-blur-sm"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-300">Our Mission</span>
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl">
                To empower elderly individuals by providing easy access to essential services and fostering a supportive community through technology and volunteerism. We believe every senior deserves <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-400 font-semibold">dignity</span>, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-300 font-semibold">independence</span>, and a helping hand when needed.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 🎯 SERVICES SECTION */}
      {showServices && (
        <motion.section
          ref={servicesRef}
          className="relative py-20 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 via-gray-200/30 to-gray-100/30 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-gray-800/30 rounded-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold text-center mb-16"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200">Our Services</span>
            </motion.h2>

            <motion.div
              className="grid lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              {/* 🆘 Urgent Help */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-500/30 backdrop-blur-sm hover:shadow-gray-500/25 transition-all duration-300"
              >
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">🆘</div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Urgent Help</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Immediate support during medical or household emergencies — just a request away.
                    </p>
                    <Link to="/help">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-gray-400/30 shadow-lg"
                      >
                        Request Now
                      </motion.button>
                    </Link>
                  </div>
              </motion.div>

              {/* 💊 Medicine Delivery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-500/30 backdrop-blur-sm hover:shadow-gray-500/25 transition-all duration-300"
              >
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">💊</div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Medicine Delivery</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Volunteers deliver prescribed medicines directly to your home with safety and care.
                    </p>
                    <Link to="/medicine">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-gray-400/30 shadow-lg"
                      >
                        Get Medicines
                      </motion.button>
                    </Link>
                  </div>
              </motion.div>

              {/* 🤝 Volunteer Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-500/30 backdrop-blur-sm hover:shadow-gray-500/25 transition-all duration-300"
              >
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Volunteer Support</h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Become part of a trusted volunteer network and support elders with daily or emergency tasks.
                    </p>
                    <Link to="/volunteer">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-gray-400/30 shadow-lg"
                      >
                        Join as Volunteer
                      </motion.button>
                    </Link>
                  </div>
              </motion.div>
            </motion.div>


          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Home;
