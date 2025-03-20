"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Profile Card - Left Column */}
        <Card className="md:col-span-1 shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-6 flex flex-col items-center">
          <Image
            src="https://assets.aceternity.com/manu.png" // Replace with actual profile picture URL
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
          <h2 className="mt-3 text-xl font-semibold">{profileData?.fullName || "John Doe"}</h2>
              <ProfileItem label="Date of Birth" value={profileData?.dateOfBirth || "N/A"} />
              <ProfileItem label="Gender" value={profileData?.gender || "N/A"} />
              <ProfileItem label="National ID" value={profileData?.nationalId || "N/A"} />
              <ProfileItem label="Contact Number" value={profileData?.contactNumber || "N/A"} />
              <ProfileItem label="Email" value={profileData?.email || "N/A"} />
              <ProfileItem label="Address" value={profileData?.address || "N/A"} />
            
          <Link href="/edit_profile">
            <button className="mt-4 px-4 py-2 text-sm bg-purple-600 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-grey-500 transition-all">
              Edit
            </button>
          </Link>
        </Card>

        {/* Right Column - Two Smaller Cards */}
        <div className="flex flex-col gap-6">
          {/* Work Details Card */}
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4">
            <CardHeader className="bg-gray-100 dark:bg-gray-700 px-6 py-3 flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Hospital Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-6 py-4">
              <ProfileItem label="Hospital Name" value={profileData?.hospitalName || "N/A"} />
              <ProfileItem label="Phone Number" value={profileData?.phoneNumber || "N/A"} />
              <ProfileItem label="Work Location" value={profileData?.workLocation || "N/A"} />
            </CardContent>
          </Card>

          {/* Work Details Card */}
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-4">
            <CardHeader className="bg-gray-100 dark:bg-gray-700 px-6 py-3 flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Work Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-6 py-4">
            <ProfileItem label="Department" value={profileData?.department || "N/A"} />
              <ProfileItem label="Employee ID" value={profileData?.employeeId || "N/A"} />
              <ProfileItem label="Medical Registration Number" value={profileData?.medicalRegistrationNumber || "N/A"} />
              <ProfileItem label="Years Of Experience" value={profileData?.yearsOfExperience || "N/A"} />
              <ProfileItem label="Shift Type" value={profileData?.shiftType || "N/A"} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable Component for Profile Items
const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

export default Profile;


// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import Link from "next/link";

// const Profile = () => {
//   const [profileData, setProfileData] = useState<any>(null);

//   useEffect(() => {
//     const savedData = localStorage.getItem("profileData");
//     if (savedData) {
//       setProfileData(JSON.parse(savedData));
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
//       <div className="w-full max-w-3xl space-y-8">
//         {/* Header */}
//         <header className="text-center">
//           <h1 className="text-3xl font-bold">Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400">View your account details</p>
//         </header>

//         {profileData ? (
//           <>
//             {/* Profile Picture Card */}
//             <Card className="shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
//               <CardHeader className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
//                 <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col items-center px-6 py-4">
//                 <Image
//                   src="https://assets.aceternity.com/manu.png" // Update with actual image URL
//                   alt="Profile Picture"
//                   width={120}
//                   height={120}
//                   className="rounded-full shadow-lg"
//                 />
//                 <p className="mt-3 text-lg font-semibold">{profileData.fullName}</p>
//                 <p className="text-gray-500 dark:text-gray-400">{profileData.nationalId}</p>
//               </CardContent>
//             </Card>

//             {/* Work Details Card */}
//             <Card className="shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
//               <CardHeader className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
//                 <CardTitle className="text-xl font-semibold">Work Details</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 px-6 py-4">
//                 <ProfileItem label="Hospital Name" value={profileData.hospitalName} />
//                 <ProfileItem label="Department" value={profileData.department} />
//                 <ProfileItem label="Work Location" value={profileData.workLocation} />
//                 <ProfileItem label="Employee ID" value={profileData.employeeId} />
//                 <ProfileItem label="Experience" value={`${profileData.yearsOfExperience} years`} />
//               </CardContent>
//             </Card>

//             {/* Contact Information Card */}
//             <Card className="shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
//               <CardHeader className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
//                 <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 px-6 py-4">
//                 <ProfileItem label="Email" value={profileData.email} />
//                 <ProfileItem label="Phone Number" value={profileData.phoneNumber} />
//                 <ProfileItem label="Date of Birth" value={profileData.dateOfBirth} />
//                 <ProfileItem label="Gender" value={profileData.gender} />
//               </CardContent>
//             </Card>

//             {/* Edit Profile Button */}
//             <div className="text-center">
//               <Link href="/edit_profile">
//                 <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
//                   Edit Profile
//                 </button>
//               </Link>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Loading profile...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Reusable Component for Profile Items
// const ProfileItem = ({ label, value }: { label: string; value: string }) => (
//   <p>
//     <strong>{label}:</strong> {value}
//   </p>
// );

// export default Profile;
