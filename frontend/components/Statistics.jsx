import React, { useRef, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";

const Statistics = ({ onClose }) => {
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
        <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-6xl w-1/4 h-[11vh] overflow-y-auto relative">
            <button onClick={onClose} className="absolute top-4 right-4">
                    <IoMdClose size={26} />
            </button>
            <div className="text-2xl font-bold pb-2 text-center">
                Coming soon....
            </div>
        </div>
    </div> 
  )
}

export default Statistics