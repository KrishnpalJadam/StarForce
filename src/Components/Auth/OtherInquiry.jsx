 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createInquiry } from '../Redux/Slices/inquirySlice';

const OtherInquiry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    contact_information: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createInquiry(formData)).unwrap();
      // ✅ Redirect to home after success
      navigate('/');
    } catch (error) {
      alert("Error submitting inquiry: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 fs-4">Other Inquiries</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" id="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" id="subject" className="form-control" value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea id="message" className="form-control" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="contact_information" className="form-label">Contact Information</label>
            <input type="text" id="contact_information" className="form-control" value={formData.contact_information} onChange={handleChange} required />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherInquiry;
