import React, { useState, useEffect } from "react";

const SearchJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);

  // Dummy jobs data
  useEffect(() => {
    setJobs([
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechSoft Pvt Ltd",
        location: "Indore",
        type: "Full-Time",
        salary: "₹30,000 - ₹50,000",
      },
      {
        id: 2,
        title: "Graphic Designer",
        company: "Pixel House",
        location: "Bhopal",
        type: "Part-Time",
        salary: "₹15,000 - ₹25,000",
      },
      {
        id: 3,
        title: "Delivery Executive",
        company: "Zippy Logistics",
        location: "Indore",
        type: "Contract",
        salary: "₹12,000 - ₹20,000",
      },
    ]);
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔍 Search Jobs</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Job Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Search by Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Job Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow rounded-lg p-5 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              <p className="mt-2 text-green-600 font-medium">{job.salary}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchJob;
