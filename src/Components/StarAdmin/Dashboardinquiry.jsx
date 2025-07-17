import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchInquiries,
    deleteInquiry
} from '../Redux/Slices/inquirySlice';

const Dashboardinquiry = () => {
    const dispatch = useDispatch();
    const inquiries = useSelector((state) => state?.inquiries?.list || []);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Fetch all inquiries on mount
    useEffect(() => {
        dispatch(fetchInquiries());
    }, [dispatch]);

    // 🔍 Filtered inquiries
    const filteredInquiries = inquiries.filter((item) =>
        [item.name, item.subject, item.contact_information]
            .some(field =>
                field?.toLowerCase().includes(search.toLowerCase())
            )
    );

    // 📄 Pagination logic
    const totalPages = Math.ceil(filteredInquiries.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredInquiries.slice(indexOfFirstRow, indexOfLastRow);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            await dispatch(deleteInquiry(id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto ">
            {/* <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage Inquiries</h2>
            </div> */}

            {/* 🔍 Search */}
            {/* <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, subject, or contact"
                    className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // reset to page 1 on search
                    }}
                />
            </div> */}

            {/* 📋 Table */}
            <div className="bg-white  rounded-lg overflow-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th> {/* 👈 Index column */}
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Subject</th>
                            <th className="px-4 py-3">Message</th>
                            <th className="px-4 py-3">Contact Info</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                        {currentRows.length > 0 ? (
                            currentRows.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3">{indexOfFirstRow + index + 1}</td>
                                    <td className="px-4 py-3 font-semibold text-indigo-600">{item.name}</td>
                                    <td className="px-4 py-3">{item.subject}</td>
                                    <td className="px-4 py-3">{item.message}</td>
                                    <td className="px-4 py-3">{item.contact_information}</td>
                                    <td className="px-4 py-3 flex gap-3">
                                        {/* <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button> */}
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-6">No inquiries found.</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* 📄 Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboardinquiry;
