import React, { useState } from 'react';
import Map from './Map';
import Info from './Info';
import Statistics from './Statistics';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { FaChartBar } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";


const Navbar = () => {
  const [showMap, setShowMap] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  return (
    <>
      <nav className="flex justify-between items-center py-4 px-28 bg-white text-black shadow-md w-full fixed h-fit top-0 z-50">
        <div className="flex gap-4 text-sm">
          <button onClick={() => setShowInfo(true)} className="p-2 rounded-2xl hover:outline-2 hover:outline-black transition">
            <HiQuestionMarkCircle size={26}/>
          </button>
          <button onClick={() => setShowMap(true)} className="p-2 rounded-2xl hover:outline-2 hover:outline-black transition">
            <FaMapLocationDot size={26} />
          </button>
        </div>
        <div>
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-500 text-transparent bg-clip-text">Mrtdle</Link>
        </div>
        <div className="flex gap-4 text-sm">
          <button onClick={() => setShowStatistics(true)} className="p-2 rounded-2xl hover:outline-2 hover:outline-black transition">
            <FaChartBar size={26}/>
          </button>
          <button onClick={() => setShowProfile(true)} className="p-2 rounded-2xl hover:outline-2 hover:outline-black transition">
            <VscAccount size={26}/>
          </button>
        </div>
      </nav>
      {showMap && <Map onClose={() => setShowMap(false)} />}
      {showInfo && <Info onClose={() => setShowInfo(false)} />}
      {showStatistics && <Statistics onClose={() => setShowStatistics(false)} />}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}

export default Navbar;
