// // AppliedJobs.jsx
// import React, { useEffect, useState } from 'react';

// const AppliedJobs = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);

//   useEffect(() => {
//     // Simulating fetching data from API/localStorage
//     const data = [
//       {
//         id: 1,
//         jobTitle: 'Delivery Executive',
//         company: 'Swiggy Pvt Ltd',
//         status: 'Pending',
//         date: '2025-07-12'
//       },
//       {
//         id: 2,
//         jobTitle: 'Warehouse Helper',
//         company: 'Amazon Logistics',
//         status: 'Shortlisted',
//         date: '2025-07-10'
//       },
//       {
//         id: 3,
//         jobTitle: 'Construction Labour',
//         company: 'L&T Infrastructure',
//         status: 'Rejected',
//         date: '2025-07-08'
//       }
//     ];
//     setAppliedJobs(data);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Applied Jobs</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Job Title</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Company</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Applied Date</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appliedJobs.map((job) => (
//               <tr key={job.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4 text-gray-800">{job.jobTitle}</td>
//                 <td className="px-6 py-4 text-gray-600">{job.company}</td>
//                 <td className="px-6 py-4 text-gray-600">{job.date}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 text-sm rounded-full 
//                     ${job.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                       job.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
//                       'bg-red-100 text-red-700'}`}>{job.status}</span>
//                 </td>
//               </tr>
//             ))}
//             {appliedJobs.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
//                   No applied jobs found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobs;


import React, { useState } from "react";

const AppliedJobs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    contactNumber: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    qualification: "",
    skills: "",
    jobType: "",
    workLocation: "",
    experience: "",
    languages: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Employee Registration Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Basic Details */}
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="input"
          required
        />
        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp Number (optional)"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID (optional)"
          className="input"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="District / City"
          className="input"
          required
        />
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="input"
          required
        />

        {/* Work Related Info */}
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          className="input"
          required
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="input"
          required
        />
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Preferred Job Type</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
        </select>
        <input
          type="text"
          name="workLocation"
          value={formData.workLocation}
          onChange={handleChange}
          placeholder="Preferred Work Location"
          className="input"
          required
        />
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience (e.g., 2 years)"
          className="input"
          required
        />
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          placeholder="Languages Known"
          className="input"
          required
        />
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Resume (optional)
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            className="block w-full text-sm text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AppliedJobs;
