import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import logo from "../../assets/logo.png"
import OtherInquiry from "./OtherInquiry";
import { Link } from "react-router-dom";
const HeaderNew = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="w-full bg-white shadow px-8 py-6 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img
                src={logo}
                alt="Star Force Logo"
                className="absolute top-0 left-0 object-contain"
                style={{ width: "130px" }}
              />
          {/* <h1 className="text-xl font-bold text-indigo-700">STAR FORCE</h1> */}
        </div>

        {/* Right: Contact & Inquiry */}
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-indigo-600" /> 
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-indigo-600" /> 
            <span>info@starforce.com</span>
          </div>
          <Link
           to="/OtherInquiry"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Inquiry
          </Link>
        </div>
      </header>

    

    
    </>
  );
};

export default HeaderNew;
