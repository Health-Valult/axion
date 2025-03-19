"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const navigate = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12 bg-white text-black dark:bg-black dark:text-white">
      <div className="w-full max-w-3xl space-y-6">
        {/* Profile Card */}
        <Card className="dark:bg-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="px-6 py-4 space-y-6">
            {profileData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <Image 
                    src="https://assets.aceternity.com/manu.png" // Change this path to your actual image location
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full shadow-lg"
                  />
                  <p className="mt-3 text-lg font-semibold">{profileData.fullName}</p>
                  <p className="text-gray-500 dark:text-gray-400">{profileData.nationalId}</p>
                </div>

                {/* Personal Details */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Personal Details</h2>
                  <p><strong>Date of Birth:</strong> {profileData.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {profileData.gender}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
                </div>

                {/* Work Information */}
                <div className="space-y-3 col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Work Details</h2>
                  <p><strong>Hospital Name:</strong> {profileData.hospitalName}</p>
                  <p><strong>Working Address:</strong> {profileData.workLocation}</p>
                  <p><strong>Contact Number:</strong> {profileData.phoneNumber}</p>
                  <p><strong>Employee ID:</strong> {profileData.employeeId}</p>
                  <p><strong>Department:</strong> {profileData.department}</p>
                  <p><strong>Experience:</strong> {profileData.yearsOfExperience} years</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading profile...</p>
            )}
            <Link href="/edit_profile">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Edit Profile
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;



// // "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Edit } from "lucide-react";

// const Profile = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch user data from local storage (or API if available)
//     const storedData = localStorage.getItem("data");
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     }
//   }, []);

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-muted-foreground">No profile data found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
//       <div className="w-full max-w-3xl space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <p><strong>Full Name:</strong> {userData.fullName}</p>
//               <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
//               <p><strong>Gender:</strong> {userData.gender}</p>
//               <p><strong>National ID:</strong> {userData.nationalId}</p>
//               <p><strong>Contact Number:</strong> {userData.contactNumber}</p>
//               <p><strong>Email:</strong> {userData.email}</p>
//               <p><strong>Department:</strong> {userData.department}</p>
//               <p><strong>Employee ID:</strong> {userData.employeeId}</p>
//               <p><strong>Medical Registration No:</strong> {userData.medicalRegistrationNumber}</p>
//               <p><strong>Years of Experience:</strong> {userData.yearsOfExperience}</p>
//               <p><strong>Hospital Name:</strong> {userData.hospitalName}</p>
//               <p><strong>Work Location:</strong> {userData.workLocation}</p>
//               <p><strong>Shift Type:</strong> {userData.shiftType}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex justify-center">
//           <Link href="/edit_profile">
//             <button className="btn-primary flex items-center">
//               <Edit className="mr-2 h-4 w-4" />
//               Edit Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
