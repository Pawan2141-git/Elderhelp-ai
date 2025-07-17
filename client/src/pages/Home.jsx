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
    }, 150); // wait for render before scrolling
  };

  return (
    <div className="bg-gray-900 text-white">

      {/* 🎯 HERO FULL SCREEN SECTION */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/011/429/632/original/elderly-people-activity-abstract-concept-illustration-communities-for-older-people-retirement-travel-elder-fitness-retirement-savings-medical-care-flat-modern-illustration-vector.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm bg-gradient-to-b from-black/80 via-black/60 to-black/70"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-black drop-shadow-md bg-white/80 px-4 py-2 rounded-xl">
            ElderHelp.ai
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed drop-shadow">
            A platform where compassion meets technology — connecting senior citizens with helpful, trusted volunteers near them.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 16px #6366f1' }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToServices}
              className="px-10 py-4 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 focus:outline-none text-white rounded-full shadow-xl transition-all duration-200 drop-shadow-lg animate-pulse border-2 border-indigo-400"
              style={{ boxShadow: '0 0 24px 4px #6366f1aa' }}
            >
              Explore Services
            </motion.button>
            <Link to="#mission" tabIndex={-1}>
              <button
                className="px-8 py-4 text-lg font-semibold border-2 border-indigo-400 text-indigo-100 bg-transparent hover:bg-indigo-900/60 rounded-full transition-all duration-200 shadow focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                onClick={() => {
                  const missionSection = document.querySelector('section[id="mission-section"]');
                  if (missionSection) missionSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 🌟 OUR MISSION SECTION */}
      <motion.section
        id="mission-section"
        className="flex flex-col items-center justify-center px-6 py-16 bg-gray-950 border-t border-gray-800 rounded-3xl mx-2 my-8 shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
          <motion.div
            className="flex-shrink-0 mb-6 md:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Mission Icon"
              className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg rounded-full bg-gray-900 border-4 border-indigo-600"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-200 mb-4 text-center md:text-left drop-shadow">Our Mission</h2>
            <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left drop-shadow">
              To empower elderly individuals by providing easy access to essential services and fostering a supportive community through technology and volunteerism. We believe every senior deserves dignity, independence, and a helping hand when needed.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 🎯 SERVICES SECTION */}
      {showServices && (
        <motion.section
          ref={servicesRef}
          className="px-6 py-16 bg-gray-800 rounded-t-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-300 text-center mb-12">Our Services</h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* 🆘 Urgent Help */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-indigo-200 mb-2 drop-shadow">🆘 Urgent Help</h3>
              <p className="text-gray-100 mb-4">
                Immediate support during medical or household emergencies — just a request away.
              </p>
              <Link to="/help">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full transition text-base font-semibold border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                  Request Now
                </button>
              </Link>
            </motion.div>

            {/* 💊 Medicine Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-purple-200 mb-2 drop-shadow">💊 Medicine Delivery</h3>
              <p className="text-gray-100 mb-4">
                Volunteers deliver prescribed medicines directly to your home with safety and care.
              </p>
              <Link to="/medicine">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full transition text-base font-semibold border-2 border-purple-400 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  Get Medicines
                </button>
              </Link>
            </motion.div>

            {/* 🤝 Volunteer Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-green-200 mb-2 drop-shadow">🤝 Volunteer Support</h3>
              <p className="text-gray-100 mb-4">
                Become part of a trusted volunteer network and support elders with daily or emergency tasks.
              </p>
              <Link to="/volunteer">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition text-base font-semibold border-2 border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none">
                  Join as Volunteer
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 📊 Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-200 text-base md:text-lg">Admins and managers can view requests and volunteers here:</p>
            <Link to="/dashboard">
              <button className="mt-3 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 rounded-full shadow transition text-base font-semibold border-2 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Home;
