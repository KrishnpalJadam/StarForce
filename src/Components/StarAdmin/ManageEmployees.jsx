 import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllApplications, updateApplicationStatus } from '../Redux/Slices/jobApplicationSlice';

const ITEMS_PER_PAGE = 6;

const statusClasses = {
  New: 'bg-yellow-100 text-yellow-700',
  Verified: 'bg-blue-100 text-blue-700',
  Shortlisted: 'bg-purple-100 text-purple-700',
  Placed: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-200 text-gray-700',
};

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state?.jobApplications?.applications) || [];

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);

  const filtered = applications.filter((emp) => {
    const q = search.toLowerCase();
    return (
      emp.full_name?.toLowerCase().includes(q) ||
      emp.city?.toLowerCase().includes(q) ||
      emp.skills?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this record?')) {
      console.log('delete', id);
    }
  };

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setShowModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateApplicationStatus({ id, status: newStatus }));
  };

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const getEmployeeStatusClass = (status = '') => {
    switch (status) {
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Under Verification':
        return 'bg-blue-100 text-blue-700';
      case 'Shortlisted':
        return 'bg-green-100 text-green-700';
      case 'Hired':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="mt-3 max-w-8xl mx-auto">
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Employees (Job Seekers)
          </h2>
          <input
            type="text"
            placeholder="Search by name, city or skills"
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-72 focus:outline-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="bg-white table-responsive rounded-lg shadow">
        <table className="text-sm text-left w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Qualification</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {paginated.length ? (
              paginated.map((emp, i) => (
                <tr key={emp.id}>
                  <td className="px-4 py-3">{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td className="px-4 py-3 font-semibold text-indigo-600">{emp.full_name}</td>
                  <td className="px-4 py-3">{emp.gender}</td>
                  <td className="px-4 py-3">{emp.dob}</td>
                  <td className="px-4 py-3">{emp.contact_number}</td>
                  <td className="px-4 py-3">{emp.city}</td>
                  <td className="px-4 py-3">{emp.qualification}</td>
                  <td className="px-4 py-3 break-words max-w-[10rem]">{emp.skills}</td>
                  <td className="px-4 py-3">{emp.experience}</td>
                  <td className="px-4 py-3">
                    {emp.resume_url ? (
                      <a href={emp.resume_url} target="_blank" rel="noreferrer" className="text-indigo-600 underline">View</a>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className={`min-w-[160px] px-2 py-1 rounded text-sm font-semibold ${getEmployeeStatusClass(emp.status)}`}
                      value={emp.status || 'Pending Review'}
                      onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Under Verification">Under Verification</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Hired">Assigned to Company</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <button className="text-green-600 hover:text-green-800" onClick={() => handleView(emp)} title="View Details"><FaEye /></button>
                    <button className="text-blue-600 hover:text-blue-800" title="Edit"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(emp.id)} title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">No employee data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="text-gray-600 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="space-x-2">
            <button onClick={() => changePage(1)} className="px-2 py-1 border rounded text-sm" disabled={currentPage === 1}>First</button>
            <button onClick={() => changePage(currentPage - 1)} className="px-2 py-1 border rounded text-sm" disabled={currentPage === 1}>Prev</button>
            <button onClick={() => changePage(currentPage + 1)} className="px-2 py-1 border rounded text-sm" disabled={currentPage === totalPages}>Next</button>
            <button onClick={() => changePage(totalPages)} className="px-2 py-1 border rounded text-sm" disabled={currentPage === totalPages}>Last</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
