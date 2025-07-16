 import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllApplications } from '../Redux/Slices/jobApplicationSlice';

const ITEMS_PER_PAGE = 6;

const ManageEmployees = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);

  const applications = useSelector((state) => state?.jobApplications?.applications) || [];

  // Filtered results
  const filteredApplications = applications.filter((emp) => {
    const query = search.toLowerCase();
    return (
      emp.full_name?.toLowerCase().includes(query) ||
      emp.city?.toLowerCase().includes(query) ||
      emp.skills?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);

  // Paginated Data
  const paginatedData = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      console.log("Deleting employee ID:", id);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="mt-3 max-w-8xl mx-auto">
      <div className="flex-col md:flex-row md:items-center mb-6 gap-4 bg-white shadow rounded-lg overflow-auto p-3 mt-5">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
            Manage Employees (Job Seekers)
          </h2>
          <input
            type="text"
            placeholder="Search by name, city or skills"
            className="border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="bg-white rounded-lg overflow-auto mt-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Qualification</th>
                <th className="px-4 py-3">Skills</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((emp) => (
                  <tr key={emp.id}>
                    <td className="px-4 py-3 font-semibold text-indigo-600">{emp.full_name}</td>
                    <td className="px-4 py-3">{emp?.gender}</td>
                    <td className="px-4 py-3">{emp?.dob}</td>
                    <td className="px-4 py-3">{emp?.contact_number}</td>
                    <td className="px-4 py-3">{emp?.city}</td>
                    <td className="px-4 py-3">{emp?.qualification}</td>
                    <td className="px-4 py-3">{emp?.skills}</td>
                    <td className="px-4 py-3">{emp?.experience}</td>
                    <td className="px-4 py-3">
                      {emp.resume_url ? (
                        <a href={emp?.resume_url} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(emp.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No employee data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 px-2">
              <div className="text-gray-600 text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-2 py-1 border rounded text-sm"
                  disabled={currentPage === 1}
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-2 py-1 border rounded text-sm"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-2 py-1 border rounded text-sm"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-2 py-1 border rounded text-sm"
                  disabled={currentPage === totalPages}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
