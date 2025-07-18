import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logo.png";

import axios from "axios";
import BASE_URL from "../../utils/Config";
import api from "../../utils/axiosInterceptor";
import { useAuth } from "../Components/Auth/AuthContext"; // adjust path
import { useCallback } from "react";
const Header = ({ onToggleSidebar }) => {
  const storedUser = JSON.parse(localStorage.getItem("login_detail"));
  const userId = storedUser ? storedUser.id : null;  // Safely access the ID
  const navigate = useNavigate();
  // const handelLogout = async () => {
  //   try {
  //     const responce = await api.post(`${BASE_URL}/logout`, {
  //       userId: userId,
  //     });
  //     navigate("/")
  //     localStorage.removeItem("login");
  //     localStorage.removeItem("role");
  //     localStorage.removeItem("authToken");
  //     localStorage.removeItem("login_detail");

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const { logout } = useAuth(); // removes "login_detail" from context/localStorage (per your impl)

  const handleLogout = useCallback(() => {
    // 1. Clear anything extra you stored
    localStorage.removeItem("login_details"); // API login object
    localStorage.removeItem("user_is");
    localStorage.removeItem("employee_profile");
    localStorage.removeItem("employer_profile");
    // localStorage.clear(); // <-- use this instead if you truly want *everything* gone

    // 2. Clear context state
    logout(); // sets user=null in AuthContext

    // 3. Hard reload to fully reset app state (Redux, caches, etc.)
    window.location.replace("/"); // goes to login + reloads page
  }, [logout]);
  const userData = JSON.parse(localStorage.getItem("login_detail"));
  // console.log("Email:", userData.email);

  return (
    <header className=" header position-relative headernwe">
      <div className="d-flex align-items-center justify-content-between">
        {/* Toggle button - visible on mobile and tablet */}
        <button
          className="btn d-lg-none"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars text-dark"></i>
        </button>

        {/* Welcome message - hidden on mobile, visible on tablet and up */}
        <div className="d-none d-md-block">
          <img
            src="https://i.ibb.co/YCGm5FK/logo.png"
            alt="Motorlogical Logo"
            className="img-fluid sidebar-logo"

          />

        </div>

        {/* Synced button */}
        <div>

        </div>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          {/* synced status  */}
          {/* <button className="synced-btn">
            <span className="synced-icon"></span>
            <span className="d-none d-sm-inline text-dark">Synced</span>
          </button> */}




          {/* User profile */}
          <div className="d-flex align-items-center me-3 ms-2">
            <div
              className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ width: "35px", height: "35px" }}
            >
              <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ms-2 d-none d-md-block">
              {/* <div className="fw-bold">{userData.name}</div> */}
              {/* <div className="text-light small">{userData.role}</div> */}
            </div>
          </div>

          {/* Chevron down - hidden on mobile */}
          {/* <button className="btn d-none d-md-inline-block">
            <i className="fas fa-chevron-down text-light"></i>
          </button> */}

          {/* Logout - icon only on mobile */}


          <Link
            to="#"
            onClick={handleLogout}
            className="btn btn-outline-dark me-4"
          >
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
