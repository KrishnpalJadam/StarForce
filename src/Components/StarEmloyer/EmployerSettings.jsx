 import React, { useState } from "react";
import api from "../../interceptors/axiosInterceptor";

const EmployerSettings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const email = localStorage.getItem("user_email");        
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/reset-password", {
         email, 
        password,
      });

      if (response?.data?.status === "true") {
        setMessage("Password updated successfully!");
      } else {
        setMessage("Something went wrong. Please try again.");
      }

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Account Settings</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerSettings;
