import React, { useEffect, useState, useCallback } from "react";
import { FaEdit, FaTrash, FaPlus, FaUserShield } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

          // ✅ adjust path if needed
import { useAuth } from "../Auth/AuthContext";        // ✅ adjust path if needed

const ITEMS_PER_PAGE = 5;

const AddAdmin = () => {
  const { user } = useAuth(); // {id, role, token, email}
  const authToken =
    user?.token ||
    JSON.parse(localStorage.getItem("login_detail") || "{}")?.token ||
    "";

  /* ---------- State ---------- */
  const [admins, setAdmins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null); // null = add mode
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  /* ---------- Helpers ---------- */
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (adm) => {
    setFormData({
      name: adm.name || "",
      email: adm.email || "",
      mobile: adm.mobile || "",
      password: "",          // password change optional on edit
      confirmPassword: "",
    });
    setEditId(adm.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  /* ---------- Fetch admins ---------- */
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      // NOTE: API endpoint guess — adjust to your backend route.
      // Suppose backend: GET /user?role=admin
      const res = await axios.get(`${BASE_URL}/user`, {
        params: { role: "admin" },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Expect: res.data.data = array
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setAdmins(list);
      setFiltered(list);
    } catch (err) {
      console.warn("Admin fetch failed, using dummy data.", err);
      // Fallback dummy
      const dummy = [
        {
          id: 101,
          name: "Super Admin",
          email: "super@starforce.com",
          mobile: "9999999999",
          role: "admin",
          active: true,
        },
        {
          id: 102,
          name: "HR Admin",
          email: "hr@starforce.com",
          mobile: "8888888888",
          role: "admin",
          active: true,
        },
      ];
      setAdmins(dummy);
      setFiltered(dummy);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  /* ---------- Search filter ---------- */
  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setFiltered(admins);
      setCurrentPage(1);
      return;
    }
    const filt = admins.filter(
      (a) =>
        a.name?.toLowerCase().includes(term) ||
        a.email?.toLowerCase().includes(term) ||
        a.mobile?.toLowerCase().includes(term)
    );
    setFiltered(filt);
    setCurrentPage(1);
  }, [search, admins]);

  /* ---------- Pagination slice ---------- */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  /* ---------- Submit Add/Edit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      toast.error("Name & Email required.");
      return;
    }

    if (!editId) {
      // ADD requires password
      if (!formData.password) {
        toast.error("Password required.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    } else {
      // EDIT: if one password field filled, enforce both + match
      if (formData.password || formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
      }
    }

    setLoading(true);
    try {
      if (editId) {
        // EDIT ADMIN
        // guessed endpoint: PUT /user/:id
        await axios.put(
          `${BASE_URL}/user/${editId}`,
          {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            ...(formData.password ? { password: formData.password } : {}),
            role: "admin",
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.success("Admin updated!");
      } else {
        // ADD ADMIN -> use signup API
        // using /user/signup (as per your login/signup screen)
        await axios.post(
          `${BASE_URL}/user/signup`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            role: "admin",
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.success("Admin created!");
      }

      closeModal();
      fetchAdmins(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || (editId ? "Update failed" : "Create failed")
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admin?")) return;
    setLoading(true);
    try {
      // guessed endpoint: DELETE /user/:id
      await axios.delete(`${BASE_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success("Admin deleted.");
      fetchAdmins();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={1500} />

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserShield className="text-indigo-600" /> Manage Admin Users
        </h2>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search name/email/mobile"
            className="border border-gray-300 px-4 py-2 rounded w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
          >
            <FaPlus /> Add Admin
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {loading && admins.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : pageItems.length > 0 ? (
              pageItems.map((adm) => (
                <tr key={adm.id}>
                  <td className="px-4 py-3 font-semibold text-indigo-600">
                    {adm.name || "-"}
                  </td>
                  <td className="px-4 py-3">{adm.email || "-"}</td>
                  <td className="px-4 py-3">{adm.mobile || "-"}</td>
                  <td className="px-4 py-3">
                    {adm.active ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(adm)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(adm.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No admin records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-40"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-40"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Admin" : "Add New Admin"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
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
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>
              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, mobile: e.target.value }))
                  }
                />
              </div>
              {/* Passwords */}
              {!editId && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </>
              )}

              {editId && (
                <div className="text-sm text-gray-500 mt-2">
                  (Leave password fields blank to keep existing password.)
                </div>
              )}

              {editId && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password (optional)
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}

              {/* Fixed role = admin (hidden) */}
              <input type="hidden" name="role" value="admin" readOnly />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Saving..." : editId ? "Update Admin" : "Add Admin"}
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
