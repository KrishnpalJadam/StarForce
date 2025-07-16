import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtherInquiry = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 fs-4">Other Inquiries</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your full name" />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Subject of your inquiry" />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Type your message..."></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="form-label">Contact Information</label>
            <input type="text" className="form-control" id="contact" placeholder="Phone or email" />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleBack}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherInquiry;
