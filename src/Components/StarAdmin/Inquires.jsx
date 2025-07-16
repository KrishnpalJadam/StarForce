import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Inquires = () => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
 

  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      { id: 1, name: 'John Doe', subject: 'Job Details', message: 'Need more info about the job.', contact: 'john@example.com' },
      { id: 2, name: 'Jane Smith', subject: 'Company Info', message: 'Can you share company profile?', contact: '9876543210' },
      { id: 3, name: 'Michael Lee', subject: 'Other Inquiry', message: 'Looking for collaboration.', contact: 'michael@example.com' }
    ];
    setInquiries(dummyData);
  }, []);

  const filteredInquiries = inquiries.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase()) ||
    item.contact.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

 

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setInquiries(inquiries.filter(item => item.id !== id));
    }
  };

  return (
    <div className=" max-w-7xl mx-auto mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Inquiries</h2>
      
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, subject, or contact"
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-semibold text-indigo-600">{item.name}</td>
                <td className="px-4 py-3">{item.subject}</td>
                <td className="px-4 py-3">{item.message}</td>
                <td className="px-4 py-3">{item.contact}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 border rounded hover:bg-gray-200"
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded hover:bg-gray-200"
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>

      
    </div>
  );
};

export default Inquires;
