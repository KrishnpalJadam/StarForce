import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageEmployer = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Dummy data
    const dummyRequests = [
      {
        id: 1,
        companyName: 'ABC Constructions',
        contactPerson: 'John Doe',
        mobile: '9876543210',
        email: 'abc@example.com',
        city: 'Mumbai',
        typeOfWork: 'Construction',
        workersNeeded: 20,
        shiftTiming: '9am - 6pm',
        salary: '₹600/day',
      },
      {
        id: 2,
        companyName: 'XYZ Logistics',
        contactPerson: 'Priya Singh',
        mobile: '9871234560',
        email: 'xyz@logistics.com',
        city: 'Delhi',
        typeOfWork: 'Delivery',
        workersNeeded: 15,
        shiftTiming: '10am - 8pm',
        salary: '₹700/day',
      },
      {
        id: 3,
        companyName: 'PackIt Industries',
        contactPerson: 'Aman Jain',
        mobile: '9811122233',
        email: 'hr@packit.com',
        city: 'Indore',
        typeOfWork: 'Packaging',
        workersNeeded: 25,
        shiftTiming: 'Day/Night',
        salary: '₹550/day',
      },
      {
        id: 4,
        companyName: 'Shiv Builders',
        contactPerson: 'Ravi Mehra',
        mobile: '9998887770',
        email: 'shiv@builders.com',
        city: 'Bhopal',
        typeOfWork: 'Labour Work',
        workersNeeded: 30,
        shiftTiming: '9am - 5pm',
        salary: '₹500/day',
      },
      {
        id: 5,
        companyName: 'Jain Electricals',
        contactPerson: 'Suresh Jain',
        mobile: '9822334455',
        email: 'suresh@electro.com',
        city: 'Pune',
        typeOfWork: 'Electric Work',
        workersNeeded: 10,
        shiftTiming: 'Shift Based',
        salary: '₹750/day',
      }
    ];
    setRequests(dummyRequests);
  }, []);

  const handleDelete = (id) => {
    const filtered = requests.filter(req => req.id !== id);
    setRequests(filtered);
  };

  const filteredRequests = requests.filter(req =>
    req.companyName.toLowerCase().includes(search.toLowerCase()) ||
    req.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    req.city.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="mt-3 max-w-8xl mx-auto">


      {/* Header Section with Title, Search and Filters */}
      <div className="flex-col md:flex-row md:items-center  mb-6 gap-4 bg-white shadow rounded-lg overflow-auto p-3 mt-5">
        <div className='d-flex md:justify-between'>
          <h2 className="text-2xl font-bold text-gray-800">Company Manpower Requests</h2>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search by company or person"
              className="border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />


          </div>
        </div>




        <div className="bg-white  rounded-lg overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
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
              {currentItems.map(req => (
                <tr key={req.id}>
                  <td className="px-4 py-3 font-semibold text-indigo-600">{req.companyName}</td>
                  <td className="px-4 py-3">{req.contactPerson}</td>
                  <td className="px-4 py-3">{req.city}</td>
                  <td className="px-4 py-3">{req.typeOfWork}</td>
                  <td className="px-4 py-3">{req.workersNeeded}</td>
                  <td className="px-4 py-3">{req.shiftTiming}</td>
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




    </div>
  );
};

export default ManageEmployer;
