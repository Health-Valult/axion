"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Patient } from "@/app/types/patient";
import { ReportFieldUnits } from "@/app/upload-report/data/reportUnits";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface ReportPreviewProps {
  patient: Patient;
  reportType: string;
  reportData: Record<string, any>;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  patient,
  reportType,
  reportData,
  isSaving,
  onBack,
  onSave,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("session_token");
    setToken(sessionToken);
  }, []);

  if (!reportType) return null;

  // Function to format report data according to API models
  const formatReportData = () => {
    // Extract metadata fields
    const metaData = {
      patientNIC: reportData.patientNIC,
      date: reportData.date,
      time: reportData.time,
      practitioner: reportData.practitioner,
      clinic: reportData.clinic,
      recorder: reportData.recorder,
      instructions: reportData.instructions || "" // Default to empty string if not provided
    };

    // Filter out metadata fields to get only result fields
    const resultFields = Object.entries(reportData)
      .filter(([key]) => !["patientNIC", "date", "time", "practitioner", "clinic", "recorder", "instructions"].includes(key))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, any>);

    // Return formatted data according to BaseReportTemplate
    return {
      mata: metaData, // Following your model structure (note: this is "mata" as in your model, not "meta")
      results: resultFields
    };
  };

  const submitReport = async () => {
    try {
      const formattedData = formatReportData();
      // Normalize report type for API endpoint
      //const reportTypeForEndpoint = reportType.toLowerCase().replace(/\s+/g, '-');
      
      console.log("Request body:", JSON.stringify(formattedData));
      
      // Fix the typo in the formatted data
      const correctedData = {
        mata: formattedData.mata, // Fix the typo here
        results: formattedData.results
      };
      
      // Choose the appropriate option:
      const apiUrl = `https://axiontestgateway.azure-api.net/records/records/upload/${reportType}`;
      
      // Option 1: Use your local API (make sure the route exists)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(correctedData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const data = await response.json();
          errorMessage = data.message || `Something went wrong. Error: ${response.status}`;
        } catch (e) {
          errorMessage = `Something went wrong. Error: ${response.status}`;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
      
      const responseData = await response.json();
      
      if (response.ok) {
        toast({
          title: "Report Submitted",
          description: "The report was submitted successfully.",
        });
      
        // Call the onSave callback to update UI state
        navigate.push("/search_patient");
      }
    } catch (error) {
      console.error("Failed to submit report:", error);
      toast({
        title: "Error",
        description: "Failed to save report. Please try again.",
        variant: "destructive",
      });
      navigate.push("/search_patient");
    }
  };

  // Override the onSave function to call our submitReport function
  const handleSave = () => {
    submitReport();
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-300 dark:bg-black dark:text-white">
      {/* Report Header */}
      <div className="text-center border-b-2 pb-4">
        <h1 className="text-3xl font-bold uppercase">{reportType} Report</h1>
        <p className="text-gray-600 mt-1 dark:text-gray-300">
          <span className="font-semibold">Date:</span> {reportData?.date ?? "N/A"} | 
          <span className="font-semibold"> Time:</span> {reportData?.time ?? "N/A"}
        </p>
      </div>

      {/* Patient Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {["patientNIC"].map((key) => (
              <tr key={key} className="border border-gray-300">
                <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
                  {key.replace(/_/g, " ")}:
                </td>
                <td className="p-2 border border-gray-300">{reportData?.[key] ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clinic Details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Clinic & Practitioner Details</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {["practitioner", "clinic", "recorder"].map((key) => (
              <tr key={key} className="border border-gray-300">
                <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
                  {key.replace(/_/g, " ")}:
                </td>
                <td className="p-2 border border-gray-300">{reportData?.[key] ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions (if available) */}
      {reportData?.instructions && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <div className="p-3 border border-gray-300 rounded bg-gray-50 dark:bg-gray-800">
            {reportData.instructions}
          </div>
        </div>
      )}

      {/* Report Findings */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Report Findings</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {Object.entries(reportData)
              .filter(([key]) => !["date", "time", "practitioner", "clinic", "recorder", "patientNIC", "instructions"].includes(key))
              .map(([key, value]) => {
                // Get the report type (uppercase) to check against ReportFieldUnits
                const reportTypeUpper = reportType.toUpperCase();
                
                // Look up the unit for the field from ReportFieldUnits
                const unit = ReportFieldUnits[reportTypeUpper]?.[key];

                return (
                  <tr key={key} className="border border-gray-300">
                    <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
                      {key.replace(/_/g, " ")}:
                    </td>
                    <td className="p-2 border border-gray-300">
                      {value ?? "N/A"}
                      {unit && (
                        <span className="text-gray-500 ml-2 dark:text-gray-400">{unit}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Form
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 text-white rounded-lg flex items-center ${
            isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : <>
            <Check className="h-4 w-4 mr-2" /> Save Report
          </>}
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;


// "use client";

// import React from "react";
// import { ArrowLeft, Check } from "lucide-react";
// import { Patient } from "@/app/types/patient";
// import { ReportFieldUnits } from "@/app/upload-report/data/reportUnits";

// interface ReportPreviewProps {
//   patient: Patient;
//   reportType: string;
//   reportData: Record<string, any>;
//   isSaving: boolean;
//   onBack: () => void;
//   onSave: () => void;
// }

// const ReportPreview: React.FC<ReportPreviewProps> = ({
//   patient,
//   reportType,
//   reportData,
//   isSaving,
//   onBack,
//   onSave,
// }) => {
//   if (!reportType) return null;

//   return (
//     <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-300 dark:bg-black dark:text-white">
//       {/* Report Header */}
//       <div className="text-center border-b-2 pb-4">
//         <h1 className="text-3xl font-bold uppercase">{reportType} Report</h1>
//         <p className="text-gray-600 mt-1">
//           <span className="font-semibold">Date:</span> {reportData?.date ?? "N/A"} | 
//           <span className="font-semibold"> Time:</span> {reportData?.time ?? "N/A"}
//         </p>
//       </div>

//       {/* Patient Details */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
//         <table className="w-full border-collapse border border-gray-300 text-sm">
//         <tbody>
//             {["patientNIC"].map((key) => (
//               <tr key={key} className="border border-gray-300">
//                 <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
//                   {key.replace(/_/g, " ")}:
//                 </td>
//                 <td className="p-2 border border-gray-300">{reportData?.[key] ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Clinic Details */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Clinic & Practitioner Details</h2>
//         <table className="w-full border-collapse border border-gray-300 text-sm">
//           <tbody>
//             {["practitioner", "clinic", "recorder"].map((key) => (
//               <tr key={key} className="border border-gray-300">
//                 <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
//                   {key.replace(/_/g, " ")}:
//                 </td>
//                 <td className="p-2 border border-gray-300">{reportData?.[key] ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Report Findings */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-2">Report Findings</h2>
//         <table className="w-full border-collapse border border-gray-300 text-sm">
//           <tbody>
//             {Object.entries(reportData)
//               .filter(([key]) => !["date", "time", "practitioner", "clinic", "recorder","patientNIC"].includes(key))
//               .map(([key, value]) => (
//                 <tr key={key} className="border border-gray-300">
//                   <td className="p-2 font-medium bg-gray-100 border border-gray-300 capitalize dark:bg-black dark:text-white">
//                     {key.replace(/_/g, " ")}:
//                   </td>
//                   <td className="p-2 border border-gray-300">{value ?? "N/A"}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           type="button"
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> Back to Form
//         </button>
//         <button
//           type="button"
//           onClick={onSave}
//           disabled={isSaving}
//           className={`px-4 py-2 text-white rounded-lg flex items-center ${
//             isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-blue-700"
//           }`}
//         >
//           {isSaving ? "Saving..." : <>
//             <Check className="h-4 w-4 mr-2" /> Save Report
//           </>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportPreview;