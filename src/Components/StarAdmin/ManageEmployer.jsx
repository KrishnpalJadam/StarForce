 import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchManpowerRequests,
  deleteManpowerRequest
} from '../Redux/Slices/manpowerSlice';

const ITEMS_PER_PAGE = 10;

const ManageEmployer = () => {
  const dispatch = useDispatch();
  const manpowerRequests = useSelector((state) => state?.manpower?.requests) || [];

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchManpowerRequests());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteManpowerRequest(id));
    setTimeout(() => dispatch(fetchManpowerRequests()), 300); // Small delay to reflect changes
  };

  // 🔍 Search filter logic
  const filteredRequests = manpowerRequests?.filter((req) =>
    [req.company_name, req.contact_person, req.city, req.type_of_work]
      .some(field =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
  );

  // 📄 Pagination setup
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedData = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        className={`px-3 py-1 rounded ${
          page === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
        } mx-1`}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
        disabled={page === '...'}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="mt-3 max-w-8xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Company Manpower Requests</h2>
          <input
            type="text"
            placeholder="Search by company, person, city, or work"
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-72 mt-3 md:mt-0 focus:outline-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg overflow-auto shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Contact Person</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Type of Work</th>
              <th className="px-4 py-3">Workers</th>
              <th className="px-4 py-3">Shift</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((req, index) => (
                <tr key={req.id}>
                  <td className="px-4 py-3">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-indigo-600">{req.company_name}</td>
                  <td className="px-4 py-3">{req.contact_person}</td>
                  <td className="px-4 py-3">{req.city}</td>
                  <td className="px-4 py-3">{req.type_of_work}</td>
                  <td className="px-4 py-3">{req.workers_needed}</td>
                  <td className="px-4 py-3">{req.shift_timing}</td>
                  <td className="px-4 py-3">{req.salary}</td>
                  <td className="px-4 py-3 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(req.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">{renderPagination()}</div>
    </div>
  );
};

export default ManageEmployer;
