import React, { useState } from 'react';

const CompanyRequsting = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    typeOfWork: '',
    workersNeeded: '',
    skillRequired: '',
    workLocation: '',
    shiftTiming: '',
    salary: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Manpower Request Submitted Successfully!");
    // Here, you can send `formData` to backend or Firebase
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Request Manpower</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Company Name</label>
            <input type="text" name="companyName" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Contact Person Name</label>
            <input type="text" name="contactPerson" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Designation</label>
            <input type="text" name="designation" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Mobile Number</label>
            <input type="tel" name="mobile" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">WhatsApp Number (optional)</label>
            <input type="tel" name="whatsapp" onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="block font-medium">Email ID</label>
            <input type="email" name="email" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Company Address</label>
            <input type="text" name="address" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">City / District</label>
            <input type="text" name="city" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Pincode</label>
            <input type="text" name="pincode" onChange={handleChange} required className="input" />
          </div>
        </div>

        {/* Manpower Requirement */}
        <hr className="my-4" />
        <h2 className="text-lg font-semibold text-gray-700">Manpower Requirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Type of Work</label>
            <input type="text" name="typeOfWork" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Number of Workers Needed</label>
            <input type="number" name="workersNeeded" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Skill / Qualification Required</label>
            <input type="text" name="skillRequired" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Work Location / Site Address</label>
            <input type="text" name="workLocation" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Shift Timing</label>
            <input type="text" name="shiftTiming" onChange={handleChange} required className="input" />
          </div>
          <div>
            <label className="block font-medium">Salary Offered (per day/month)</label>
            <input type="text" name="salary" onChange={handleChange} required className="input" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Additional Notes (optional)</label>
            <textarea name="notes" rows="3" onChange={handleChange} className="input"></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRequsting;
