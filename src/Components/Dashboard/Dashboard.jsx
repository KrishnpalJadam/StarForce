import React, { useState,useEffect } from 'react';
import { fetchAllApplications } from '../Redux/Slices/jobApplicationSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchManpowerRequests
} from '../Redux/Slices/manpowerSlice';
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
            { label: "Total Employers", value:applications, icon: "fas fa-building", color: "indigo" },
            { label: "Total Job Seekers", value:manpowerRequests, icon: "fas fa-users", color: "blue" },
           
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
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Activity</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { activity: "Posted a Job", user: "EmployerX", role: "Employer", date: "Jul 13, 2025", status: "Success", color: "green" },
                  { activity: "Applied for Job", user: "Rahul S.", role: "Employee", date: "Jul 12, 2025", status: "Pending", color: "amber" },
                  { activity: "Approved Job", user: "Admin", role: "Admin", date: "Jul 12, 2025", status: "Approved", color: "blue" },
                  { activity: "Rejected Resume", user: "EmployerY", role: "Employer", date: "Jul 11, 2025", status: "Rejected", color: "red" }
                ].map(({ activity, user, role, date, status, color }, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-800">{activity}</td>
                    <td className="px-4 py-2 text-gray-600">{user}</td>
                    <td className="px-4 py-2 text-gray-600">{role}</td>
                    <td className="px-4 py-2 text-gray-600">{date}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
