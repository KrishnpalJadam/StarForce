import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ isMobile, onLinkClick }) => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);


    const [role, setRole] = useState("");
    const [email, setEmail] = useState('');
    useEffect(() => {
        const storedDetails = localStorage.getItem("login_details");
        if (storedDetails) {
            const parsed = JSON.parse(storedDetails);
            console.log("Login details:", parsed); // 👀 Check all available data
            setRole(parsed.role);
            setEmail(parsed.email);
        }
    }, []);




    const handleCloseSidebar = () => {
        const sidebar = document.getElementById('mobileSidebar');
        const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
        if (offcanvas) {
            offcanvas.hide();
        }
    };

    const handleMenuClick = (path) => {
        setActivePath(path);
        if (isMobile) {
            const offcanvasElement = document.getElementById('mobileSidebar');
            const offcanvasInstance = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();
        }

        if (onLinkClick) onLinkClick();
    };

    const navItem = (to, icon, label) => (
        <li className="nav-item" key={to}>
            <Link
                to={to}
                onClick={() => handleMenuClick(to)}
                className={`nav-link sidebar-link ${activePath === to ? "active-link" : ""}`}
            >
                <i className={icon}></i>
                <span>{label}</span>
            </Link>
        </li>

    );

    // 👇 Role-based menu setup
    const getMenuItems = () => {
        switch (role) {
            case "admin":
                return (
                    <>
                        {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
                        {navItem("/ManageEmployers", "fas fa-user-tie", "Manage Employers")}
                        {navItem("/ManageEmployees", "fas fa-users", "Manage Employees")}
                        {navItem("/AddComponies", "fas fa-briefcase", "Companies")}

                        {navItem("/Settings", "fas fa-cog", "Settings")}

                    </>
                );
            case "employer":
                return (
                    <>
                        {navItem("employer/employerDash", "fas fa-th-large", "Dashboard")}
                        {navItem("/employer/CompanyRequsting", "fas fa-file-alt", "Company Requesting")}
                        {navItem("/employer/EmployerProfile", "fas fa-user-check", "My Profile")}
                        {navItem("/employer/EmployerSettings", "fas fa-cog", "Settings")}

                    </>
                );
            case "employee":
                return (
                    <>
                        {navItem("/employee/employeDash", "fas fa-th-large", "Dashboard")}

                        {navItem("/employee/AppliedJobs", "fas fa-clipboard-check", "Add Details")}
                        {navItem("/employee/MyProfile", "fas fa-user", "My Profile")}
                        {navItem("/employee/EmployeeSettings", "fas fa-cog", "Settings")}

                    </>
                );
            default:
                return null;
        }
    };




    return (
        <div className="sidebar d-flex flex-column vh-100 position-fixed start-0">
            {/* Header Row */}
            <div className="d-flex justify-content-between align-items-center py-2">
                <button
                    type="button"
                    className="btn btn-outline-light ms-auto d-lg-none"
                    onClick={handleCloseSidebar}
                    style={{ padding: '4px 10px', borderRadius: '6px' }}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-grow-1 px-3 mt-4">
                <ul className="nav flex-column mb-4">{getMenuItems()}</ul>
            </div>

            {/* Footer */}
            <div className="sidebar-footer px-3 py-3 mt-auto border-top d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-2">
                    <img
                        src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                        alt="User"
                        className="rounded-circle"
                        width="40"
                        height="40"
                    />
                    <div className="small text-end">
                          {email && (
                            <div className=" fw-bold">{email}</div>
                        )}
                        {role && (
                            <div className="">{role}</div>
                        )}
                      
                    </div>

                </div>
                <button
                    className="btn btn-sm btn-outline-dark ms-2 text-dark"
                    onClick={() => {
                        localStorage.removeItem("login_details");
                        window.location.href = "/";
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    );

};

export default Sidebar;
