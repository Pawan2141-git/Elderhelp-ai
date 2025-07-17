import React, { useState } from "react";
import axios from "axios";

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    serviceTime: "",
    medicines: "",
    deliveryTime: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await axios.post("http://localhost:5000/api/medicine", formData);
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        address: "",
        serviceTime: "",
        medicines: "",
        deliveryTime: "",
      });
    } catch (err) {
      console.error("❌ Error submitting medicine request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Medicine Delivery Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Delivery Address"
            required
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          />
          <label className="block mb-1 text-gray-700 mt-2">Select Service Date & Time</label>
          <input
            type="datetime-local"
            name="serviceTime"
            value={formData.serviceTime}
            onChange={handleChange}
            required
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full mb-2"
          />

          <textarea
            name="medicines"
            value={formData.medicines}
            onChange={handleChange}
            placeholder="List of Medicines"
            required
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          ></textarea>

          <input
            type="text"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            placeholder="Preferred Delivery Time (optional)"
            className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-black -700 text-white py-2 rounded transition"
          >
            Submit Request
          </button>
        </form>

        {success && (
          <p className="text-green-400 text-center mt-4">✅ Request submitted!</p>
        )}
      </div>
    </div>
  );
};

export default MedicineForm;
