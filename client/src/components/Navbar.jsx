import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-indigo-600 p-4 text-white flex justify-between">
    <Link to="/">
    <h1 className="text-xl font-bold">ElderHelp.ai</h1>
    </Link>
    <div className="space-x-4">
        <Link to="/help">
      <button className="rounded-xl px-4 py-2 bg-green-300 text-black shadow-inner transition-all duration-300 focus:bg-white  focus:scale-120 focus:shadow-[14px_20px_200px_#969696,-14px_-20px_200px_#ffffff] outline-none w-full">SOS</button>
        </Link>
    </div>
  </nav>
);

export default Navbar;
