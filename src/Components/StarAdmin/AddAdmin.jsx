 import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../../utils/Config";

const ITEMS_PER_PAGE = 8; // ⬅️ change this if needed

const AddAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get(`${BASE_URL}/user/getAllUsers`);
      const adminUsers = res.data?.data?.filter((u) => u.role === "admin") || [];
      setAdmins(adminUsers);
    } catch (err) {
      toast.error("Failed to fetch users.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required.");
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
        role: "admin",
      };

      const res = await api.post(`${BASE_URL}/user/signup`, payload);
      toast.success(res.data?.message || "Admin created successfully.");

      await fetchAdmins(); // Refresh list
      setPage(1);
      resetForm();
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this admin?")) return;

  try {
    await api.delete(`${BASE_URL}/user/deleteUserById/${id}`);
    toast.success("Admin deleted successfully.");
    fetchAdmins(); // refresh list
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete admin.");
  }
};

  const handleEdit = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
  };

 

  // 🔍 Filtered + Paginated Data
  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE) || 1;
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const pageData = filteredAdmins.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Admins</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
        >
          <FaPlus /> Add Admin
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm focus:outline-indigo-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset page
          }}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No admins found.
                  </td>
                </tr>
              ) : (
                pageData.map((adm) => (
                  <tr key={adm.id}>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {adm.name}
                    </td>
                    <td className="px-4 py-3">{adm.email}</td>
                    <td className="px-4 py-3 capitalize">{adm.role}</td>
                    <td className="px-4 py-3 text-center">
                      {/* <button
                        className="text-blue-600 hover:text-blue-800 me-3"
                        onClick={() => handleEdit(adm)}
                      >
                        <FaEdit />
                      </button> */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(adm.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredAdmins.length > 0 && (
          <div className="flex justify-center items-center gap-3 py-4">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="px-3 py-1 rounded bg-indigo-600 text-white">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white bg-opacity-40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10">
            <h3 className="text-xl font-semibold mb-4">
              {formData?.id ? "Edit Admin" : "Add New Admin"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
