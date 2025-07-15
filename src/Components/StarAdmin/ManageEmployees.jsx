import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        fullName: 'Rahul Sharma',
        gender: 'Male',
        dob: '1995-03-10',
        contactNumber: '9876543210',
        whatsapp: '9876543210',
        email: 'rahul@example.com',
        address: 'MG Road',
        city: 'Indore',
        pincode: '452001',
        qualification: 'B.Tech',
        skills: 'React, Node.js',
        jobType: 'Full-time',
        workLocation: 'Indore',
        experience: '2 Years',
        languages: 'Hindi, English',
        resume: '#'
      },
      {
        id: 2,
        fullName: 'Neha Verma',
        gender: 'Female',
        dob: '1997-08-22',
        contactNumber: '9871234567',
        whatsapp: '9871234567',
        email: 'neha@example.com',
        address: 'Vijay Nagar',
        city: 'Bhopal',
        pincode: '462001',
        qualification: 'MBA',
        skills: 'HR, Excel',
        jobType: 'Part-time',
        workLocation: 'Bhopal',
        experience: '1 Year',
        languages: 'English',
        resume: '#'
      },
      // Add more dummy employees if needed
    ];
    setEmployees(dummyData);
  }, []);

  const handleDelete = (id) => {
    const filtered = employees.filter(emp => emp.id !== id);
    setEmployees(filtered);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
    emp.city.toLowerCase().includes(search.toLowerCase()) ||
    emp.skills.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="mt-3 max-w-8xl mx-auto">
      <div className="flex-col md:flex-row md:items-center mb-6 gap-4 bg-white shadow rounded-lg overflow-auto p-3 mt-5">
        <div className='d-flex md:justify-between'>
          <h2 className="text-2xl font-bold text-gray-800">Manage Employees (Job Seekers)</h2>
          <input
            type="text"
            placeholder="Search by name, city or skills"
            className="border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              {currentItems.length > 0 ? currentItems.map(emp => (
                <tr key={emp.id}>
                  <td className="px-4 py-3 font-semibold text-indigo-600">{emp.fullName}</td>
                  <td className="px-4 py-3">{emp.gender}</td>
                  <td className="px-4 py-3">{emp.dob}</td>
                  <td className="px-4 py-3">{emp.contactNumber}</td>
                  <td className="px-4 py-3">{emp.city}</td>
                  <td className="px-4 py-3">{emp.qualification}</td>
                  <td className="px-4 py-3">{emp.skills}</td>
                  <td className="px-4 py-3">{emp.experience}</td>
                  <td className="px-4 py-3">
                    {emp.resume ? (
                      <a href={emp.resume} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                        View
                      </a>
                    ) : <span className="text-gray-400 italic">N/A</span>}
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
              )) : (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">No employee data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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

export default ManageEmployees;