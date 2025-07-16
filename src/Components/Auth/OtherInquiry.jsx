import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Inquires = () => {
  const [search, setSearch] = useState('');
  const [inquiries, setInquiries] = useState([
    { id: 1, name: 'John Doe', subject: 'Job Details', contact: 'john@example.com' },
    { id: 2, name: 'Jane Smith', subject: 'Company Info', contact: 'jane@example.com' },
    { id: 3, name: 'Michael Lee', subject: 'Other Inquiry', contact: 'michael@example.com' }
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this inquiry?');
    if (confirmDelete) {
      setInquiries(inquiries.filter(item => item.id !== id));
    }
  };

  const handleEdit = (id) => {
    alert(`Edit feature coming soon for ID: ${id}`);
  };

  // Filtered inquiries based on search
  const filteredInquiries = inquiries.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase()) ||
    item.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Manage Inquiries</h2>

      {/* Search Box */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.subject}</td>
                  <td>{item.contact}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted">No inquiries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inquires;
