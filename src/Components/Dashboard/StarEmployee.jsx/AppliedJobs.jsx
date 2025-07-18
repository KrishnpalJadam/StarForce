import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobApplication } from "../../Redux/Slices/jobApplicationSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * AppliedJobs (Employee Registration / Job Application)
 * ------------------------------------------------------------
 * Upgrades vs original:
 * 1. Replaced `alert()` calls with toast notifications (success + error).
 * 2. Added `submitting` state → disables form + shows overlay spinner + button spinner.
 * 3. Always appends `user_id` from localStorage.
 * 4. Uses `.unwrap()` so we can reliably detect success/error from the thunk.
 * 5. Resets form after success; also clears file input via ref.
 * 6. Tailwind-friendly inputs + focus ring in brand color (#916fb5).
 * 7. Inline display of chosen resume file name.
 */

const BRAND_COLOR = "#916fb5";

const baseInputClasses =
  "w-full px-3 py-2 border rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const user_id = typeof window !== "undefined" ? localStorage.getItem("user_id") : "";

  const [submitting, setSubmitting] = useState(false);
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

  const fileInputRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // clears file input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      toast.error("Resume is required!");
      return;
    }

    const data = new FormData();
    data.append("user_id", user_id || "");

    // Append scalar fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "resume") {
        data.append(key, value);
      }
    });
    data.append("resume", formData.resume);

    setSubmitting(true);
    try {
      const res = await dispatch(createJobApplication(data)).unwrap();
      toast.success(res?.message || "Application Submitted Successfully!");
      resetForm();
    } catch (err) {
      const msg =
        err?.message ||
        err?.data?.message ||
        (typeof err === "string" ? err : "Submission failed.");
      toast.error(msg);
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      {/* Local Toast Container (remove if global) */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-6" style={{ color: BRAND_COLOR }}>
        Employee Registration Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ opacity: submitting ? 0.6 : 1 }}
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
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
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp Number (optional)"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID (optional)"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className={baseInputClasses + ' md:col-span-2'}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="District / City"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
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
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience (e.g., 2 years)"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          placeholder="Languages Known"
          className={baseInputClasses}
          style={{ '--tw-ring-color': BRAND_COLOR }}
          required
        />

        {/* Resume Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Resume <span className="text-red-600">*</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:text-white file:bg-[#916fb5] hover:file:opacity-90"
          />
          {formData.resume && (
            <p className="mt-1 text-xs text-gray-500">Selected: {formData.resume.name}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="col-span-2 text-white py-2 rounded transition disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {/* Overlay loader */}
      {submitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg z-10">
          <Spinner color={BRAND_COLOR} size={48} />
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Simple Spinner */
/* ------------------------------------------------------------------ */
const Spinner = ({ size = 32, color = "#916fb5" }) => (
  <div
    className="animate-spin rounded-full border-4 border-t-transparent"
    style={{ width: size, height: size, borderColor: color, borderTopColor: "transparent" }}
  />
);

export default AppliedJobs;
