import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const AdminPanel = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [medicineRequests, setMedicineRequests] = useState([]);
  const [helpTypeFilter, setHelpTypeFilter] = useState("");
  const [helpDateFilter, setHelpDateFilter] = useState("");
  const [medicineDateFilter, setMedicineDateFilter] = useState("");
  const [showAllHelp, setShowAllHelp] = useState(false);
  const [showAllMedicine, setShowAllMedicine] = useState(false);

  useEffect(() => {
    fetchHelpRequests();
    fetchMedicineRequests();
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

  // For recent requests
  const recentHelp = showAllHelp
    ? filteredHelpRequests
    : filteredHelpRequests.slice(0, 5);
  const recentMedicine = showAllMedicine
    ? filteredMedicineRequests
    : filteredMedicineRequests.slice(0, 5);

  // Unique help types for filter dropdown
  const helpTypes = Array.from(new Set(helpRequests.map((r) => r.type))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Admin Dashboard</h1>

      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-400 mb-2">{helpRequests.length}</span>
          <span className="text-gray-200">Total Help Requests</span>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-400 mb-2">{medicineRequests.length}</span>
          <span className="text-gray-200">Total Medicine Requests</span>
        </div>
      </div>

      {/* ✅ HELP REQUEST SECTION */}
      <section className="mb-12 bg-gray-950 rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-green-400">Help Requests</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              className="bg-gray-800 text-white rounded px-3 py-1 border border-gray-700 focus:outline-none"
              value={helpTypeFilter}
              onChange={(e) => setHelpTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {helpTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="date"
              className="bg-gray-800 text-white rounded px-3 py-1 border border-gray-700 focus:outline-none"
              value={helpDateFilter}
              onChange={(e) => setHelpDateFilter(e.target.value)}
            />
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
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>

        <div className="overflow-x-auto rounded border border-gray-700">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-800 text-indigo-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentHelp.map((req) => (
                <tr key={req._id} className="border-t border-gray-700">
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">{req.phone}</td>
                  <td className="p-3">{req.type}</td>
                  <td className="p-3">{req.message}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteHelp(req._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {recentHelp.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    No help requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredHelpRequests.length > 5 && (
          <div className="flex justify-end mt-2">
            <button
              className="text-indigo-300 hover:underline text-sm"
              onClick={() => setShowAllHelp((v) => !v)}
            >
              {showAllHelp ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </section>

      {/* 💊 MEDICINE REQUEST SECTION */}
      <section className="bg-gray-950 rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-purple-400">Medicine Requests</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="date"
              className="bg-gray-800 text-white rounded px-3 py-1 border border-gray-700 focus:outline-none"
              value={medicineDateFilter}
              onChange={(e) => setMedicineDateFilter(e.target.value)}
            />
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
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>

        <div className="overflow-x-auto rounded border border-gray-700">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-800 text-indigo-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Medicines</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentMedicine.map((req) => (
                <tr key={req._id} className="border-t border-gray-700">
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">{req.phone}</td>
                  <td className="p-3">{req.address}</td>
                  <td className="p-3">{req.medicines}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteMedicine(req._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {recentMedicine.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    No medicine requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredMedicineRequests.length > 5 && (
          <div className="flex justify-end mt-2">
            <button
              className="text-indigo-300 hover:underline text-sm"
              onClick={() => setShowAllMedicine((v) => !v)}
            >
              {showAllMedicine ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
