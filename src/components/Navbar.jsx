// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <div className='flex flex-row gap-4 pt-4 place-content-evenly'>
//        <NavLink 
//        to="/"
//        >Home</NavLink>

//        <NavLink
//        to="/pastes"
//        >
//         Pastes
//        </NavLink>
//     </div>
//   )
// }

// export default Navbar



import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const base = "px-4 py-2 rounded-lg text-sm sm:text-base transition";
  const active = "bg-green-500 text-white shadow";
  const inactive = "text-gray-300 hover:text-white hover:bg-gray-800";

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-gray-900/70 border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        <div className="text-lg sm:text-xl font-semibold tracking-wide">
          Paste<span className="text-green-400">App</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Pastes
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Navbar;

