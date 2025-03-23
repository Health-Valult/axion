"use client";

import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Patient } from "@/app/types/patient";
import { ReportFieldUnits } from "@/app/upload-report/data/reportUnits";

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
  if (!reportType) return null;

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-300 dark:bg-black dark:text-white">
      {/* Report Header */}
      <div className="text-center border-b-2 pb-4">
        <h1 className="text-3xl font-bold uppercase">{reportType} Report</h1>
        <p className="text-gray-600 mt-1">
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

      {/* Report Findings */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Report Findings</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            {Object.entries(reportData)
              .filter(([key]) => !["date", "time", "practitioner", "clinic", "recorder", "patientNIC"].includes(key))
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
                        <span className="text-gray-500 ml-2">{unit}</span> // Display the unit next to the value
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
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Form
        </button>
        <button
          type="button"
          onClick={onSave}
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