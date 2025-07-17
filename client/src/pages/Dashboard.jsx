import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  HandHeart,
  Pill,
  Phone,
  Calendar,
  User,
  Clock,
  ListChecks,
} from "lucide-react";

const dummyHelpRequests = [
  {
    name: "Abhishek raj patel",
    type: "Urgent",
    phone: "17221214",
    date: "2024-06-01",
  },
  {
    name: "Aneesh Viswakarama",
    type: "Medicine",
    phone: "555-5678",
    date: "2024-06-02",
  },
  {
    name: "Jigyasha soni",
    type: "Daily Tasks",
    phone: "555-8765",
    date: "2024-06-03",
  },
];

const dummyMedicineRequests = [
  {
    name: "Vinay singh Baghel",
    type: "Medicine",
    phone: "555-4321",
    date: "2024-06-04",
  },
];

const dummyVolunteers = [
  {
    name: "Arpit singh ",
    phone: "555-1111",
    availability: "Weekdays, 9am-5pm",
  },
  {
    name: "Frank Miller",
    phone: "555-2222",
    availability: "Weekends, 10am-2pm",
  },
];

const statCards = [
  {
    label: "Total Help Requests",
    value: dummyHelpRequests.length,
    icon: <HandHeart className="w-7 h-7 text-pink-400" />,
    color: "from-pink-500 to-pink-700",
  },
  {
    label: "Total Medicine Requests",
    value: dummyMedicineRequests.length,
    icon: <Pill className="w-7 h-7 text-purple-400" />,
    color: "from-purple-500 to-purple-700",
  },
  {
    label: "Total Volunteers",
    value: dummyVolunteers.length,
    icon: <Users className="w-7 h-7 text-green-400" />,
    color: "from-green-500 to-green-700",
  },
];

const tableMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Top Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-indigo-300 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        ElderHelp Dashboard
      </motion.h1>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.label}
            className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg bg-gradient-to-br ${card.color} bg-opacity-80`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <div className="bg-gray-900 bg-opacity-60 rounded-full p-3 flex items-center justify-center">
              {card.icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="text-sm text-gray-200">{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Help Requests Table */}
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-lg p-6"
          {...tableMotion}
        >
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-indigo-200">
              Help Requests
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-indigo-300">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyHelpRequests.map((req, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-700 hover:bg-gray-700/30 transition"
                  >
                    <td className="p-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-300" />
                      {req.name}
                    </td>
                    <td className="p-2">{req.type}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {req.phone}
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {req.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Volunteer Info Table */}
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-lg p-6"
          {...tableMotion}
          transition={{ ...tableMotion.transition, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-green-200">
              Volunteers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-green-300">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Availability</th>
                </tr>
              </thead>
              <tbody>
                {dummyVolunteers.map((v, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-700 hover:bg-gray-700/30 transition"
                  >
                    <td className="p-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-300" />
                      {v.name}
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {v.phone}
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {v.availability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;