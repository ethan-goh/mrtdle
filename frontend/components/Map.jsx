import React, { useEffect, useRef } from 'react'
import { IoMdClose } from "react-icons/io";

const Map = ({ onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  const regions = {
    North: [
      "Admiralty", "Ang Mo Kio", "Bright Hill", "Buangkok", "Canberra", "Choa Chu Kang",
      "Khatib", "Kranji", "Lentor", "Marsiling", "Mayflower", "Punggol", "Sembawang",
      "Sengkang", "Springleaf", "Woodlands", "Woodlands North", "Woodlands South",
      "Yew Tee", "Yio Chu Kang", "Yishun"
    ],
    South: [
      "Bayfront", "Gardens by the Bay", "HarbourFront", "Marina Bay", "Marina South Pier",
      "Outram Park", "Shenton Way", "Telok Blangah", "Tanjong Pagar"
    ],
    East: [
      "Aljunied", "Bayshore", "Bedok", "Bedok North", "Bedok Reservoir", "Changi Airport",
      "Eunos", "Expo", "Kaki Bukit", "Katong Park", "Kembangan", "MacPherson",
      "Marine Parade", "Marine Terrace", "Mattar", "Paya Lebar", "Pasir Ris", "Simei",
      "Siglap", "Tai Seng", "Tampines", "Tampines East", "Tampines West", "Tanah Merah",
      "Tanjong Katong", "Tanjong Rhu", "Ubi", "Upper Changi"
    ],
    West: [
      "Beauty World", "Boon Lay", "Bukit Batok", "Bukit Gombak", "Bukit Panjang",
      "Buona Vista", "Cashew", "Chinese Garden", "Clementi", "Commonwealth", "Dover",
      "Gul Circle", "Haw Par Villa", "Hillview", "Joo Koon", "Jurong East", "Kent Ridge",
      "Lakeside", "One-North", "Pasir Panjang", "Pioneer", "Queenstown", "Tuas Crescent",
      "Tuas Link", "Tuas West Road"
    ],
    Central: [
      "Ang Mo Kio", "Bartley", "Bayfront", "Bencoolen", "Bendemeer", "Bishan", "Boon Keng",
      "Bras Basah", "Bugis", "Caldecott", "Chinatown", "City Hall", "Clarke Quay",
      "Dhoby Ghaut", "Downtown", "Esplanade", "Farrer Park", "Farrer Road",
      "Fort Canning", "Great World", "Havelock", "Holland Village", "Jalan Besar",
      "Kallang", "Lavender", "Little India", "Lorong Chuan", "Marymount", "Maxwell",
      "Napier", "Newton", "Novena", "Orchard", "Orchard Boulevard", "Potong Pasir",
      "Promenade", "Raffles Place", "Redhill", "Rochor", "Serangoon", "Sixth Avenue",
      "Somerset", "Stevens", "Tan Kah Kee", "Telok Ayer", "Tiong Bahru", "Toa Payoh",
      "Upper Thomson"
    ]
  };
  
  

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/10 flex justify-center items-center z-50">
      <div ref={ modalRef } className="bg-white rounded-2xl p-8 max-w-6xl w-full h-[80vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <IoMdClose size={26} />
        </button>
        <h2 className="text-3xl font-bold text-center mb-8">MRT Stations by Region</h2>
        <div className="grid grid-cols-5 gap-6">
          {Object.entries(regions).map(([region, stations]) => (
            <div key={region} className="border p-4 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4 text-center">{region}</h3>
              <ul className="space-y-2">
                {stations.map((station) => (
                  <li key={station} className="text-center text-gray-700">
                    {station}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map