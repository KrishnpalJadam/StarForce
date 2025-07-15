 import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createManpowerRequest } from '../Redux/Slices/jobApplicationSlice'; 
import { toast } from 'react-toastify';

const CompanyRequsting = () => {
  const dispatch = useDispatch();
   const user_id = localStorage.getItem("user_is");
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
    notes: '',
    user_id: user_id || '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createManpowerRequest(formData)).unwrap();
      toast.success("Manpower Request Submitted Successfully!");
      console.log("Submitted:", result);

      // Reset Form
      setFormData({
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
        notes: '',
        user_id: user_id || '',

      });
    } catch (error) {
      toast.error(`Submission failed: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Request Manpower</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required className="input" />
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Contact Person Name" required className="input" />
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required className="input" />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="input" />
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="input" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" required className="input" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Company Address" required className="input" />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City / District" required className="input" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="input" />
        </div>

        {/* Manpower Requirement */}
        <hr className="my-4" />
        <h2 className="text-lg font-semibold text-gray-700">Manpower Requirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="typeOfWork" value={formData.typeOfWork} onChange={handleChange} placeholder="Type of Work" required className="input" />
          <input type="number" name="workersNeeded" value={formData.workersNeeded} onChange={handleChange} placeholder="Workers Needed" required className="input" />
          <input type="text" name="skillRequired" value={formData.skillRequired} onChange={handleChange} placeholder="Skill Required" required className="input" />
          <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} placeholder="Work Location" required className="input" />
          <input type="text" name="shiftTiming" value={formData.shiftTiming} onChange={handleChange} placeholder="Shift Timing" required className="input" />
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary Offered" required className="input" />
          <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} placeholder="Additional Notes (optional)" className="input md:col-span-2" />
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
