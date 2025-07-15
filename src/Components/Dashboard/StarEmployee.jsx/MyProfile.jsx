import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);

  // 👉 Static mock data setup (runs once)
  useEffect(() => {
    const mockData = {
      fullName: "Ankit Kumar",
      gender: "Male",
      dob: "1996-08-15",
      contactNumber: "9876543210",
      whatsapp: "9876543210",
      email: "ankit@gmail.com",
      address: "MG Road, Indore",
      city: "Indore",
      pincode: "452001",
      qualification: "B.Tech",
      skills: "JavaScript, React",
      jobType: "Full-Time",
      workLocation: "Indore",
      experience: "2 years",
      languages: "Hindi, English",
      resume: "https://example.com/resume.pdf"
    };

    localStorage.setItem("employee_profile", JSON.stringify(mockData));
    setProfileData(mockData);
  }, []);

  if (!profileData) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No profile data found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        {[
          { label: "Full Name", value: profileData.fullName },
          { label: "Gender", value: profileData.gender },
          { label: "Date of Birth / Age", value: profileData.dob },
          { label: "Contact Number", value: profileData.contactNumber },
          { label: "WhatsApp Number", value: profileData.whatsapp || "N/A" },
          { label: "Email ID", value: profileData.email || "N/A" },
          { label: "Address", value: profileData.address },
          { label: "District / City", value: profileData.city },
          { label: "Pincode", value: profileData.pincode },
          { label: "Qualification", value: profileData.qualification },
          { label: "Skills", value: profileData.skills },
          { label: "Preferred Job Type", value: profileData.jobType },
          { label: "Preferred Work Location", value: profileData.workLocation },
          { label: "Experience", value: profileData.experience },
          { label: "Languages Known", value: profileData.languages },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="text-gray-600 text-sm">{label}</label>
            <p className="font-medium text-gray-800">{value}</p>
          </div>
        ))}

        {/* Resume row */}
        <div>
          <label className="text-gray-600 text-sm">Resume</label>
          <p className="font-medium text-blue-600">
            {profileData.resume ? (
              <a href={profileData.resume} target="_blank" rel="noreferrer">View Resume</a>
            ) : (
              "Not Uploaded"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
