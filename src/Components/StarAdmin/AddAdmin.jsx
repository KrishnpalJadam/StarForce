import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BASE_URL from "../../../utils/Config";          // 🔁 path adjust if needed
import { useAuth } from "../Auth/AuthContext";      // 🔁 path adjust if needed

const AddAdmin = () => {
  const { user } = useAuth(); // {token,...} if logged in
  const authToken =
    user?.token ||
    JSON.parse(localStorage.getItem("login_detail") || "{}")?.token ||
    "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Name, email & password required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
     
        role: "admin", // fixed
      };

      const headers = authToken
        ? { Authorization: `Bearer ${authToken}` }
        : undefined;

      const res = await axios.post(`${BASE_URL}/user/signup`, payload, {
        headers,
      });

      toast.success(res.data?.message || "Admin created!");
      // clear form
      setFormData({
        name: "",
        email: "",
        mobile: "",
     
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create admin. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <ToastContainer position="top-right" autoClose={1500} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Admin
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-indigo-500"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-indigo-500"
            placeholder="admin@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

       
       

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-indigo-500"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-indigo-500"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-2 text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Admin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
