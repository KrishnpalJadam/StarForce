 import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, createCompany, deleteCompany, updateCompany } from '../Redux/Slices/companySlice';

const AddCompanies = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(8);  

  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    email: '',
    phone: ''
  });

  const dispatch = useDispatch();
  const companies = useSelector((state) => state?.companies?.companies);
const filteredCompanies = companies?.filter(
  (comp) =>
    comp.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    comp.location?.toLowerCase().includes(search.toLowerCase())
);
useEffect(() => {
  setCurrentPage(1);
}, [search]);
const totalPages = Math.ceil(filteredCompanies?.length / itemsPerPage);

const paginatedCompanies = filteredCompanies?.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      company_name: formData.companyName,
      location: formData.location,
      email: formData.email,
      phone: formData.phone,
    };
     console.log('Form Data:', payload);
    try {
      if (isEditMode) {
        await dispatch(updateCompany({ id: editId, updatedData: payload })).unwrap();
      } else {
        await dispatch(createCompany(payload)).unwrap();
      }

      setShowModal(false);
      setIsEditMode(false);
      setEditId(null);
      setFormData({
        companyName: '',
        location: '',
        email: '',
        phone: ''
      });
      dispatch(fetchCompanies());
    } catch (err) {
      console.error('Failed to submit company:', err);
      alert("Error submitting company");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await dispatch(deleteCompany(id)).unwrap();
        dispatch(fetchCompanies());
      } catch (err) {
        console.error("Failed to delete company:", err);
        alert("Error deleting company");
      }
    }
  };

  const handleEdit = (comp) => {
    setIsEditMode(true);
    setEditId(comp.id);
    setFormData({
      companyName: comp.company_name,
      location: comp.location,
      email: comp.email,
      phone: comp.phone
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      companyName: '',
      location: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Companies</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setFormData({ companyName: '', location: '', email: '', phone: '' });
          }}
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
            {paginatedCompanies?.map(comp => (
              <tr key={comp.id}>
                <td className="px-4 py-3 font-semibold text-indigo-600">{comp.company_name}</td>
                <td className="px-4 py-3">{comp.location}</td>
                <td className="px-4 py-3">{comp.email}</td>
                <td className="px-4 py-3">{comp.phone}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => handleEdit(comp)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(comp.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
  <button
    className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    ← Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => {
      if (totalPages <= 10) return true;
      if (page === 1 || page === totalPages) return true;
      if (Math.abs(page - currentPage) <= 2) return true;
      if (page === currentPage - 3 || page === currentPage + 3) return '...';
      return false;
    })
    .map((page, idx, arr) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
        >
          {page}
        </button>
      );
    })}

  <button
    className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next →
  </button>
</div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit Company' : 'Add New Company'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Company Name" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full border border-gray-300 px-4 py-2 rounded" required />
              <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full border border-gray-300 px-4 py-2 rounded" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 px-4 py-2 rounded" required />
              <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-300 px-4 py-2 rounded" required />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCompanies;
