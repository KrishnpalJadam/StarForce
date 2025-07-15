import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AddCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    email: '',
    phone: ''
  });

  const itemsPerPage = 5;

  useEffect(() => {
    const dummyData = [
      { id: 1, companyName: 'ABC Pvt Ltd', location: 'Mumbai', email: 'abc@gmail.com', phone: '9876543210' },
      { id: 2, companyName: 'XYZ Corp', location: 'Delhi', email: 'xyz@corp.com', phone: '9871234560' },
      { id: 3, companyName: 'PackIt', location: 'Indore', email: 'packit@pack.com', phone: '9871112222' },
      { id: 4, companyName: 'Shiv Tech', location: 'Bhopal', email: 'shiv@tech.com', phone: '9998887770' },
      { id: 5, companyName: 'Electro Co.', location: 'Pune', email: 'electro@gmail.com', phone: '9822334455' }
    ];
    setCompanies(dummyData);
  }, []);

  const filteredCompanies = companies.filter(comp =>
    comp.companyName.toLowerCase().includes(search.toLowerCase()) ||
    comp.location.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handleAdd = (e) => {
    e.preventDefault();
    const newCompany = { id: Date.now(), ...formData };
    setCompanies([newCompany, ...companies]);
    setFormData({ companyName: '', location: '', email: '', phone: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter(comp => comp.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Companies</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          <FaPlus /> Add Company
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by company or location"
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {currentItems.map(comp => (
              <tr key={comp.id}>
                <td className="px-4 py-3 font-semibold text-indigo-600">{comp.companyName}</td>
                <td className="px-4 py-3">{comp.location}</td>
                <td className="px-4 py-3">{comp.email}</td>
                <td className="px-4 py-3">{comp.phone}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(comp.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
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

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Company</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="input" required />
              <input type="text" placeholder="Location" name="location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="input" required />
              <input type="email" placeholder="Email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" required />
              <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input" required />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCompanies;