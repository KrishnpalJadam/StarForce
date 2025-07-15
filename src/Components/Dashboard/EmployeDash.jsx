import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeDash = () => {
  const [userData, setUserData] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("login_detail"));
    setUserData(stored || {});
    const form = localStorage.getItem("employee_profile");
    setIsFormFilled(!!form);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";a
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div>
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {getGreeting()}, {userData?.name || "Job Seeker"}!
          </h1>
          <p className="text-gray-500 mt-1">Welcome to your dashboard panel</p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Form Status", value: isFormFilled ? "Submitted" : "Not Filled", icon: "fas fa-clipboard-check", color: isFormFilled ? "green" : "red" },
            { label: "Profile Status", value: userData?.name ? "Complete" : "Incomplete", icon: "fas fa-user", color: userData?.name ? "blue" : "gray" },
            { label: "Preferred Job Type", value: userData?.jobType || "Not Set", icon: "fas fa-briefcase", color: "indigo" },
            { label: "Location", value: userData?.city || "Unknown", icon: "fas fa-map-marker-alt", color: "amber" }
          ].map(({ label, value, icon, color }) => (
            <div className="bg-white rounded-lg shadow p-6" key={label}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
                  <i className={`${icon} text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">{label}</h2>
                  <p className="text-xl font-bold text-gray-800">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/employee/AppliedJobs"
              className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-md px-4 py-3 transition font-medium"
            >
              {isFormFilled ? "Edit Your Details" : "Add Your Details"}
            </Link>
            <Link
              to="/employee/MyProfile"
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md px-4 py-3 transition font-medium"
            >
              View My Profile
            </Link>
            <Link
              to="/employee/EmployeeSettings"
              className="block bg-gray-600 hover:bg-gray-700 text-white text-center rounded-md px-4 py-3 transition font-medium"
            >
              Settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeDash;
