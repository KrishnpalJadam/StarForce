 import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobApplication } from "../../Redux/Slices/jobApplicationSlice";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("❌ Resume is required!");
      return;
    }

    const data = new FormData();
    data.append("user_id", user_id); // ✅ Always append user_id

    // Append all other fields except resume
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "resume") {
        data.append(key, value);
      }
    });

    // Append resume explicitly
    data.append("resume", formData.resume);

    try {
      const resultAction = await dispatch(createJobApplication(data));
      if (createJobApplication.fulfilled.match(resultAction)) {
        alert("✅ Application Submitted Successfully!");
        setFormData({
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
      } else {
        alert("❌ Submission Failed: " + resultAction.payload.message);
      }
    } catch (error) {
      alert("❌ Something went wrong.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Employee Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="input" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="input" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" required />
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="input" required />
        <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number (optional)" className="input" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID (optional)" className="input" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" required />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="District / City" className="input" required />
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="input" required />
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" className="input" required />
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="input" required />
        <select name="jobType" value={formData.jobType} onChange={handleChange} className="input" required>
          <option value="">Preferred Job Type</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
        </select>
        <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} placeholder="Preferred Work Location" className="input" required />
        <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience (e.g., 2 years)" className="input" required />
        <input type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages Known" className="input" required />
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Resume <span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required // ✅ HTML5 validation
            className="block w-full text-sm text-gray-700"
          />
        </div>
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AppliedJobs;
