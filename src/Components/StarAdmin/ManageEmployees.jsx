 import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllApplications, updateApplicationStatus,deleteJobApplication } from '../Redux/Slices/jobApplicationSlice';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
const ITEMS_PER_PAGE = 6;

const statusClasses = {
  New: 'bg-yellow-100 text-yellow-700',
  Verified: 'bg-blue-100 text-blue-700',
  Shortlisted: 'bg-purple-100 text-purple-700',
  Placed: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-200 text-gray-700',
};

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const applications = useSelector(
    (state) => state?.jobApplications?.applications
  ) || [];

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // local UI status
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);

  // filter
  const filtered = applications.filter((emp) => {
    const q = search.toLowerCase();
    return (
      emp.full_name?.toLowerCase().includes(q) ||
      emp.city?.toLowerCase().includes(q) ||
      emp.skills?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const handleView = (emp) => {
    setSelectedEmp(emp);
    setShowModal(true);
  };

   const handleStatusChange = (id, newStatus) => {
    dispatch(updateApplicationStatus({ id, status: newStatus }));
  };
const formatDateWithAge = (dateStr) => {
  if (!dateStr) return '—';
  const dob = new Date(dateStr);
  const age = new Date().getFullYear() - dob.getFullYear();
  const formatted = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(dob);
  return `${formatted} (${age} yrs)`;
};

  const getStatus = (emp) => statusMap[emp.id] || emp.status || 'New';

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };
const getEmployeeStatusClass = (status = "") => {
  switch (status) {
    case "Pending Review":
      return "bg-yellow-100 text-yellow-700";
    case "Under Verification":
      return "bg-blue-100 text-blue-700";
    case "Shortlisted":
      return "bg-green-100 text-green-700";
    case "Shortlisted":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
  const handleDelete = async (id) => {
  if (window.confirm('Delete this record?')) {
    try {
      const res = await dispatch(deleteJobApplication(id)).unwrap();
      toast.success(res.message || "Deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete");
    }
  }
};

  return (
    <div className="mt-3 max-w-8xl mx-auto">
      {/* header */}
      <div className="mb-6 bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Employees (Job Seekers)
          </h2>
          <input
            type="text"
            placeholder="Search by name, city or skills"
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-72 focus:outline-indigo-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* table */}
      <div className="bg-white table-responsive rounded-lg shadow">
        <table className="  text-sm text-left">

          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Full Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Gender</th>
              <th className="px-4 py-3 whitespace-nowrap">DOB</th>
              <th className="px-4 py-3 whitespace-nowrap">Contact</th>
              <th className="px-4 py-3 whitespace-nowrap">City</th>
              <th className="px-4 py-3 whitespace-nowrap">Qualification</th>
              <th className="px-4 py-3 whitespace-nowrap">Skills</th>
              <th className="px-4 py-3 whitespace-nowrap">Experience</th>
              <th className="px-4 py-3 whitespace-nowrap">Resume</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {paginated.length ? (
              paginated.map((emp) => {
                const st = getStatus(emp);
                return (
                  <tr key={emp.id}>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {emp.full_name}
                    </td>
                    <td className="px-4 py-3">{emp.gender}</td>
                    <td className="px-4 py-3">{dayjs(emp.dob).format('DD MMM YYYY')}</td>
                    <td className="px-4 py-3">{emp.contact_number}</td>
                    <td className="px-4 py-3">{emp.city}</td>
                    <td className="px-4 py-3">{emp.qualification}</td>
                    <td className="px-4 py-3 break-words max-w-[10rem]">
                      {emp.skills}
                    </td>
                    <td className="px-4 py-3">{emp.experience}</td>
                    <td className="px-4 py-3">
                      {emp.resume_url ? (
                        <a
                          href={emp.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>

              <td className="px-4 py-3">
  <select
    className={`min-w-[160px] px-2 py-1 rounded text-sm font-semibold ${getEmployeeStatusClass(
      emp.status
    )}`}
    value={emp.status || "Pending Review"}
    onChange={(e) => handleStatusChange(emp.id, e.target.value)}

  >
    <option value="Pending Review">Pending Review</option>
    <option value="Under Verification">Under Verification</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Hired">Assigned to Company</option>
  
  </select>
</td>



                    <td className="px-4 py-3 flex gap-3 items-center">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleView(emp)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {/* <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button> */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(emp.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="text-center py-6 text-gray-500"
                >
                  No employee data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="text-gray-600 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => changePage(1)}
              className="px-2 py-1 border rounded text-sm"
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              onClick={() => changePage(currentPage - 1)}
              className="px-2 py-1 border rounded text-sm"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={() => changePage(currentPage + 1)}
              className="px-2 py-1 border rounded text-sm"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={() => changePage(totalPages)}
              className="px-2 py-1 border rounded text-sm"
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* details modal */}
      {showModal && selectedEmp && (
        <DetailsModal
          emp={selectedEmp}
          currentStatus={getStatus(selectedEmp)}
          onStatusChange={(st) => handleStatusChange(selectedEmp.id, st)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const DetailsModal = ({ emp, currentStatus, onStatusChange, onClose }) => (
  <div  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4 text-indigo-600">
        Job Seeker Details
      </h2>

      <Section title="Basic Details">
        <Detail label="Full Name" value={emp.full_name} />
        <Detail label="Gender" value={emp.gender} />
        <Detail label="DOB / Age" value={dayjs(emp.dob).format('DD MMM YYYY')} />
        <Detail label="Contact Number" value={emp.contact_number} />
        <Detail label="WhatsApp Number" value={emp.whatsapp} />
        <Detail label="Email" value={emp.email} />
        <Detail label="Address" value={emp.address} />
        <Detail label="City / District" value={emp.city} />
        <Detail label="Pincode" value={emp.pincode} />
      </Section>

      <Section title="Work Info">
        <Detail label="Qualification" value={emp.qualification} />
        <Detail label="Skills" value={emp.skills} />
        <Detail label="Preferred Job Type" value={emp.job_type} />
        <Detail label="Preferred Work Location" value={emp.work_location} />
        <Detail label="Experience" value={emp.experience} />
        <Detail label="Languages Known" value={emp.languages} />
      </Section>

      <Section title="Resume">
        {emp.resume_url ? (
          <a
            href={emp.resume_url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 underline"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-400 italic">Not Uploaded</p>
        )}
      </Section>

      {/* <Section title="Status">
        <select
          className={`px-3 py-2 rounded text-sm font-semibold ${statusClasses[currentStatus] || 'bg-white text-gray-800'
            }`}
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="New">New</option>
          <option value="Verified">Verified</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Placed">Placed</option>
          <option value="Inactive">Inactive</option>
        </select>
      </Section> */}

      <div className="text-right mt-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <section className="mb-5">
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
      {children}
    </div>
  </section>
);

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-800">{value || '—'}</p>
  </div>
);

export default ManageEmployees;
