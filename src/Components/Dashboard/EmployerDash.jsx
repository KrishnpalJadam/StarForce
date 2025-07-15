import React from 'react';

const EmployerDash = () => {
  // Dummy data
  const manpowerRequests = [
    {
      id: 1,
      companyName: 'ABC Constructions',
      contactPerson: 'Raj Mehra',
      typeOfWork: 'Construction',
      workersNeeded: 20,
      shiftTiming: 'Day Shift',
      salary: '₹500/day',
      status: 'Completed'
    },
   
  ];

  // Dashboard card stats (calculated from dummy data)
  const totalRequests = manpowerRequests.length;
  const completed = manpowerRequests.filter(r => r.status === 'Completed').length;
  const pending = manpowerRequests.filter(r => r.status === 'Pending').length;
  const assigned = 18; // dummy static

  return (
    <div className="p-6">
      {/* Dashboard Cards */}
    {/* Dashboard Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
        <i className="fas fa-file-alt text-xl"></i>
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-600">Total Requests</h2>
        <p className="text-2xl font-bold text-gray-800">12</p>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
        <i className="fas fa-clock text-xl"></i>
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-600">Pending</h2>
        <p className="text-2xl font-bold text-gray-800">5</p>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-green-100 text-green-600">
        <i className="fas fa-check-circle text-xl"></i>
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-600">Completed</h2>
        <p className="text-2xl font-bold text-gray-800">6</p>
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
        <i className="fas fa-users text-xl"></i>
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-600">Workers Assigned</h2>
        <p className="text-2xl font-bold text-gray-800">18</p>
      </div>
    </div>
  </div>
</div>


      {/* Table of Requests */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Manpower Requests</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Type of Work</th>
              <th className="px-4 py-3">Workers</th>
              <th className="px-4 py-3">Shift</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {manpowerRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{req.companyName}</td>
                <td className="px-4 py-3">{req.contactPerson}</td>
                <td className="px-4 py-3">{req.typeOfWork}</td>
                <td className="px-4 py-3">{req.workersNeeded}</td>
                <td className="px-4 py-3">{req.shiftTiming}</td>
                <td className="px-4 py-3">{req.salary}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${req.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${req.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
            {manpowerRequests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">No manpower requests submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerDash;
