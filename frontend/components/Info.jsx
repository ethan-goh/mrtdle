import React, { useRef, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

const Info = ({ onClose }) => {
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
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/10 flex justify-center items-center z-50">
        <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-6xl w-1/3 h-[65vh] overflow-y-auto relative">
            <button onClick={onClose} className="absolute top-4 right-4">
                <IoMdClose size={26} />
            </button>
            <div className="text-2xl font-bold pb-2">
                How to Play
            </div>
            <div className="pt-2 text-xl">
                Welcome to the Wordle-inspired game, MRTdle! Everyday, a random MRT station is chosen for you to guess! 
            </div>
            <ul className="list-disc list-inside space-y-2 text-base pt-4">
                <li>You can guess as many times as you want.</li>
                <li>Each guess provides hints that are explained below</li>
                <li>Only MRT stations provided in the dropdown are valid guesses</li>
            </ul>
        <div className="font-bold mt-4 text-xl">
            Example 
        </div>
        <div className="flex flex-col items-center mt-3 gap-4">
            <div className="w-80 border p-2 rounded-md shadow-sm">
                <div className="text-lg text-center font-bold">Serangoon</div>
                    <div className="flex justify-around mt-2">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 border border-gray-500 rounded px-2">❔</span>
                            <div className="text-xs">Station</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 border border-gray-500 rounded px-2">❔</span>
                            <div className="text-xs">Line</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 border border-gray-500 rounded px-2">❔</span>
                            <div className="text-xs">Interchange</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-green-500">✔️</span>
                            <div className="text-xs">Region</div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-base mt-6">
                <li>The daily station is not Serangoon</li>
                <li>The daily station does not have any common lines with Serangoon</li>
                <li>The daily station does not have the same interchange status as Serangoon (since Serangoon is an interchange, the daily station is not)</li>
                <li>The daily station is in the same region as Serangoon</li>
            </ul>
            <div className="font-bold mt-7 text-center text-base">
                Click the map icon to see which MRT stations fall under which region!
            </div>
        </div>
    </div>
  )
}

export default Info