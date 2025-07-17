import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createManpowerRequest } from '../Redux/Slices/manpowerSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BRAND_COLOR = '#916fb5';

const baseInputClasses =
  'w-full px-3 py-2 border rounded-md text-sm text-gray-800 placeholder-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:border-transparent';

const CompanyRequsting = () => {
  const dispatch = useDispatch();
  const user_id = typeof window !== 'undefined' ? localStorage.getItem('user_id') : '';

  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    try {
      const result = await dispatch(createManpowerRequest(formData)).unwrap();
      toast.success('Manpower Request Submitted Successfully!');
      console.log('Submitted:', result);
      // Reset form
      setFormData((prev) => ({
        ...prev,
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
      }));
    } catch (err) {
      const msg =
        err?.message ||
        err?.data?.message ||
        (typeof err === 'string' ? err : 'Something went wrong while submitting.');
      toast.error(`Submission failed: ${msg}`);
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative p-6 max-w-4xl mx-auto">
      {/* Local ToastContainer fallback (remove if already added globally) */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick />

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Request Manpower</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow" style={{ opacity: submitting ? 0.6 : 1 }}>
        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person Name"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Company Address"
            required
            className={baseInputClasses + ' md:col-span-2'}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City / District"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
        </div>

        {/* Manpower Requirement */}
        <hr className="my-4" />
        <h2 className="text-lg font-semibold text-gray-700">Manpower Requirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={handleChange}
            placeholder="Type of Work"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="number"
            name="workersNeeded"
            value={formData.workersNeeded}
            onChange={handleChange}
            placeholder="Workers Needed"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="skillRequired"
            value={formData.skillRequired}
            onChange={handleChange}
            placeholder="Skill Required"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
            placeholder="Work Location"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="shiftTiming"
            value={formData.shiftTiming}
            onChange={handleChange}
            placeholder="Shift Timing"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary Offered"
            required
            className={baseInputClasses}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes (optional)"
            className={baseInputClasses + ' md:col-span-2 resize-y'}
            style={{ '--tw-ring-color': BRAND_COLOR }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 rounded shadow text-white transition-colors duration-150 ${
              submitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            style={{ backgroundColor: BRAND_COLOR }}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>

      {/* Full-screen (inside component) loader overlay */}
      {submitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg z-10">
          <Spinner color={BRAND_COLOR} size={48} />
        </div>
      )}
    </div>
  );
};

/** Simple CSS spinner */
const Spinner = ({ size = 32, color = '#916fb5' }) => (
  <div
    className="animate-spin rounded-full border-4 border-t-transparent"
    style={{ width: size, height: size, borderColor: color, borderTopColor: 'transparent' }}
  />
);

export default CompanyRequsting;
