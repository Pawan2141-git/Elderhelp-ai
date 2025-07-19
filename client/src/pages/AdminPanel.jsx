import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { motion } from "framer-motion";
import { 
  Users, 
  Pill, 
  Download, 
  Trash2, 
  Filter, 
  Calendar,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Heart,
  MapPin,
  Clock,
  User
} from "lucide-react";

const AdminPanel = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [medicineRequests, setMedicineRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [helpTypeFilter, setHelpTypeFilter] = useState("");
  const [helpDateFilter, setHelpDateFilter] = useState("");
  const [medicineDateFilter, setMedicineDateFilter] = useState("");
  const [volunteerCityFilter, setVolunteerCityFilter] = useState("");
  const [showAllHelp, setShowAllHelp] = useState(false);
  const [showAllMedicine, setShowAllMedicine] = useState(false);
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);

  useEffect(() => {
    fetchHelpRequests();
    fetchMedicineRequests();
    fetchVolunteers();
  }, []);

  const fetchHelpRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/help");
      setHelpRequests(res.data);
    } catch (err) {
      console.error("Error fetching help requests:", err);
    }
  };

  const fetchMedicineRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medicine");
      setMedicineRequests(res.data);
    } catch (err) {
      console.error("Error fetching medicine requests:", err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/volunteer");
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
    }
  };

  const handleDeleteHelp = async (id) => {
    if (!window.confirm("Delete this help request?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/help/${id}`);
      setHelpRequests(helpRequests.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine request?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/medicine/${id}`);
      setMedicineRequests(medicineRequests.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/volunteer/${id}`);
      setVolunteers(volunteers.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtering logic
  const filteredHelpRequests = helpRequests
    .filter((r) => (helpTypeFilter ? r.type === helpTypeFilter : true))
    .filter((r) =>
      helpDateFilter
        ? new Date(r.createdAt).toISOString().slice(0, 10) === helpDateFilter
        : true
    );
  const filteredMedicineRequests = medicineRequests.filter((r) =>
    medicineDateFilter
      ? new Date(r.createdAt).toISOString().slice(0, 10) === medicineDateFilter
      : true
    );
  const filteredVolunteers = volunteers.filter((v) =>
    volunteerCityFilter ? v.city === volunteerCityFilter : true
  );

  // For recent requests
  const recentHelp = showAllHelp
    ? filteredHelpRequests
    : filteredHelpRequests.slice(0, 5);
  const recentMedicine = showAllMedicine
    ? filteredMedicineRequests
    : filteredMedicineRequests.slice(0, 5);
  const recentVolunteers = showAllVolunteers
    ? filteredVolunteers
    : filteredVolunteers.slice(0, 5);

  // Unique help types and cities for filter dropdowns
  const helpTypes = Array.from(new Set(helpRequests.map((r) => r.type))).filter(Boolean);
  const volunteerCities = Array.from(new Set(volunteers.map((v) => v.city))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-3xl blur-xl opacity-50"></div>
            <h1 className="relative text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 bg-clip-text text-transparent px-8 py-4 rounded-3xl border border-blue-200/20 dark:border-blue-300/20 backdrop-blur-sm">
              Admin Panel
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Manage and monitor all help requests, medicine deliveries, and volunteer activities
          </p>
        </motion.div>

        {/* Enhanced Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="group relative p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50 border border-red-200/50 dark:border-red-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
            
            <div className="relative flex items-center gap-6">
              <div className="bg-red-500/20 dark:bg-red-500/10 rounded-2xl p-4 backdrop-blur-sm border border-red-300/30 dark:border-red-300/20">
                <Activity className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{helpRequests.length}</div>
                <div className="text-red-700 dark:text-red-200 font-medium">Total Help Requests</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
            
            <div className="relative flex items-center gap-6">
              <div className="bg-blue-500/20 dark:bg-blue-500/10 rounded-2xl p-4 backdrop-blur-sm border border-blue-300/30 dark:border-blue-300/20">
                <Pill className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{medicineRequests.length}</div>
                <div className="text-blue-700 dark:text-blue-200 font-medium">Total Medicine Requests</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="group relative p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border border-green-200/50 dark:border-green-500/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
            
            <div className="relative flex items-center gap-6">
              <div className="bg-green-500/20 dark:bg-green-500/10 rounded-2xl p-4 backdrop-blur-sm border border-green-300/30 dark:border-green-300/20">
                <Heart className="w-8 h-8 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">{volunteers.length}</div>
                <div className="text-green-700 dark:text-green-200 font-medium">Total Volunteers</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced HELP REQUEST SECTION */}
        <motion.section 
          className="mb-12 group relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-3xl shadow-2xl border border-red-200/50 dark:border-red-500/30 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/20 rounded-xl p-3">
                  <Activity className="w-6 h-6 text-red-500 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-red-700 dark:text-red-200">Help Requests</h2>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative group">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <select
                    className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-red-400/50"
                    value={helpTypeFilter}
                    onChange={(e) => setHelpTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {helpTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-red-400/50"
                    value={helpDateFilter}
                    onChange={(e) => setHelpDateFilter(e.target.value)}
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CSVLink
                    data={filteredHelpRequests}
                    headers={[
                      { label: "Name", key: "name" },
                      { label: "Phone", key: "phone" },
                      { label: "Type", key: "type" },
                      { label: "Message", key: "message" },
                      { label: "Created At", key: "createdAt" },
                    ]}
                    filename={"help_requests.csv"}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </CSVLink>
                </motion.div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-red-200/50 dark:border-red-500/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Phone</th>
                    <th className="p-4 text-left font-semibold">Type</th>
                    <th className="p-4 text-left font-semibold">Message</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHelp.map((req, i) => (
                    <motion.tr 
                      key={req._id} 
                      className="border-t border-red-200/30 dark:border-red-500/20 hover:bg-red-50/50 dark:hover:bg-red-500/10 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <td className="p-4 text-gray-800 dark:text-white">{req.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.phone}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.type}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.message}</td>
                      <td className="p-4">
                        <motion.button
                          onClick={() => handleDeleteHelp(req._id)}
                          className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                  {recentHelp.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No help requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredHelpRequests.length > 5 && (
              <div className="flex justify-end mt-4">
                <motion.button
                  className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
                  onClick={() => setShowAllHelp((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllHelp ? "Show Less" : "View All"}
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Enhanced MEDICINE REQUEST SECTION */}
        <motion.section 
          className="mb-12 group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 rounded-xl p-3">
                  <Pill className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200">Medicine Requests</h2>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-blue-400/50"
                    value={medicineDateFilter}
                    onChange={(e) => setMedicineDateFilter(e.target.value)}
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CSVLink
                    data={filteredMedicineRequests}
                    headers={[
                      { label: "Name", key: "name" },
                      { label: "Phone", key: "phone" },
                      { label: "Address", key: "address" },
                      { label: "Medicines", key: "medicines" },
                      { label: "Created At", key: "createdAt" },
                    ]}
                    filename={"medicine_requests.csv"}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </CSVLink>
                </motion.div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-blue-200/50 dark:border-blue-500/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Phone</th>
                    <th className="p-4 text-left font-semibold">Address</th>
                    <th className="p-4 text-left font-semibold">Medicines</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMedicine.map((req, i) => (
                    <motion.tr 
                      key={req._id} 
                      className="border-t border-blue-200/30 dark:border-blue-500/20 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 transition-all duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.01, x: -5 }}
                    >
                      <td className="p-4 text-gray-800 dark:text-white">{req.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.phone}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.address}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{req.medicines}</td>
                      <td className="p-4">
                        <motion.button
                          onClick={() => handleDeleteMedicine(req._id)}
                          className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                  {recentMedicine.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No medicine requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredMedicineRequests.length > 5 && (
              <div className="flex justify-end mt-4">
                <motion.button
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  onClick={() => setShowAllMedicine((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllMedicine ? "Show Less" : "View All"}
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Enhanced VOLUNTEER SECTION */}
        <motion.section 
          className="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-3xl shadow-2xl border border-green-200/50 dark:border-green-500/30 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 rounded-xl p-3">
                  <Heart className="w-6 h-6 text-green-500 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-200">Volunteers</h2>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <select
                    className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-green-400/50"
                    value={volunteerCityFilter}
                    onChange={(e) => setVolunteerCityFilter(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {volunteerCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CSVLink
                    data={filteredVolunteers}
                    headers={[
                      { label: "Name", key: "name" },
                      { label: "Phone", key: "phone" },
                      { label: "City", key: "city" },
                      { label: "Skills", key: "skills" },
                      { label: "Availability", key: "availability" },
                      { label: "Available Time", key: "availableTime" },
                    ]}
                    filename={"volunteers.csv"}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </CSVLink>
                </motion.div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-green-200/50 dark:border-green-500/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Phone</th>
                    <th className="p-4 text-left font-semibold">City</th>
                    <th className="p-4 text-left font-semibold">Skills</th>
                    <th className="p-4 text-left font-semibold">Availability</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVolunteers.map((volunteer, i) => (
                    <motion.tr 
                      key={volunteer._id} 
                      className="border-t border-green-200/30 dark:border-green-500/20 hover:bg-green-50/50 dark:hover:bg-green-500/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <td className="p-4 text-gray-800 dark:text-white">{volunteer.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{volunteer.phone}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{volunteer.city}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{volunteer.skills}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{volunteer.availability}</td>
                      <td className="p-4">
                        <motion.button
                          onClick={() => handleDeleteVolunteer(volunteer._id)}
                          className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                  {recentVolunteers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No volunteers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {filteredVolunteers.length > 5 && (
              <div className="flex justify-end mt-4">
                <motion.button
                  className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                  onClick={() => setShowAllVolunteers((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllVolunteers ? "Show Less" : "View All"}
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminPanel;
