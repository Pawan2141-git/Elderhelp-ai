import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VolunteerForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    skills: '',
    availability: '',     // 🔁 Kept as-is for text info
    availableTime: ''     // ✅ NEW datetime field
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/volunteer', form);
      toast.success("✅ Volunteer registered!");
      setForm({
        name: '',
        phone: '',
        city: '',
        skills: '',
        availability: '',
        availableTime: ''
      });
    } catch {
      toast.error("❌ Registration failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400 text-center">Join as a Volunteer</h2>
      <p className="text-sm text-gray-400 mb-6 text-center">Become a local hero. Fill out your details and start helping.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          required
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          required
        />
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (e.g., Medical Aid)"
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
        />
        <input
          name="availability"
          value={form.availability}
          onChange={handleChange}
          placeholder="Availability (days/times)"
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
        />

        {/* ✅ Available Time */}
        <label className="block text-sm text-gray-300">Available Time Slot</label>
        <input
          type="datetime-local"
          name="availableTime"
          value={form.availableTime}
          onChange={handleChange}
          className="rounded-xl px-4 py-3 bg-gray-300 text-black shadow-inner transition-all duration-300 focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] outline-none w-full"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
