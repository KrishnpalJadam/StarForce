import React, { useState, useEffect } from 'react';
import { fetchAllApplications } from '../Redux/Slices/jobApplicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchManpowerRequests
} from '../Redux/Slices/manpowerSlice';
import Dashboardinquiry from '../StarAdmin/Dashboardinquiry';
const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const userData = JSON.parse(localStorage.getItem("login_detail"));
  const dispatch = useDispatch();
  const applications = useSelector((state) => state?.jobApplications?.applications?.length) || 0;
  const manpowerRequests = useSelector((state) => state?.manpower?.requests?.length) || 0;

  useEffect(() => {
    dispatch(fetchAllApplications());
    dispatch(fetchManpowerRequests());
  }, [dispatch]);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div>
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {getGreeting()}, {userData?.name || 'Admin'}!
        </h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Employers", value: applications, icon: "fas fa-building", color: "indigo" },
            { label: "Total Job Seekers", value: manpowerRequests, icon: "fas fa-users", color: "blue" },

          ].map(({ label, value, icon, color }) => (
            <div className="bg-white rounded-lg shadow p-6" key={label}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
                  <i className={`${icon} text-xl`}></i>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-600">{label}</h2>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-medium text-gray-800">Recent Activities</h2>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">View All</a>
          </div>
          <Dashboardinquiry />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
