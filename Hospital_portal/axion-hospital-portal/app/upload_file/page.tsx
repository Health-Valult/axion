'use client'

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Search } from "lucide-react";

// Define report types
type ReportType = "observation" | "medication" | "condition" | "procedure" | "immunization";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [visitDate, setVisitDate] = useState<string>("");
  const [visitTime, setVisitTime] = useState<string>("");
  const [reportType, setReportType] = useState<ReportType | "">("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Check if file is JSON or NDJSON
      if (!file.name.endsWith('.json') && !file.name.endsWith('.ndjson')) {
        alert("Please upload a JSON or NDJSON file");
        return;
      }

      setSelectedFile(file);
      alert(`File Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }
    if (!visitDate) {
      alert("Please enter the visit date");
      return;
    }
    if (!visitTime) {
      alert("Please enter the visit time");
      return;
    }
    if (!reportType) {
      alert("Please select a report type");
      return;
    }

    // Simulate upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const displayDate = new Date(`${visitDate}T${visitTime}`);
      const formattedDate = format(displayDate, "PPpp");

      alert(`Upload Successful: ${reportType} report uploaded for visit on ${formattedDate}`);

      // Reset form
      setSelectedFile(null);
      setVisitDate("");
      setVisitTime("");
      setReportType("");

      // Reset file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }, 1500);
  };

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold text-blue-600">Patient Report Upload</h1>
        <p className="text-gray-600">Upload patient reports in NDJSON format</p>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Upload Report</h2>
        <p className="text-gray-500 mb-4">Upload patient health data reports in NDJSON format</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Select Report File (NDJSON)
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".json,.ndjson"
              onChange={handleFileChange}
              className="block w-full border border-gray-300 p-2 rounded-md"
            />
            {selectedFile && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="visit-date" className="block text-sm font-medium text-gray-700">
                Visit Date
              </label>
              <div className="relative">
                <input
                  id="visit-date"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="block w-full border border-gray-300 p-2 rounded-md"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="visit-time" className="block text-sm font-medium text-gray-700">
                Visit Time
              </label>
              <input
                id="visit-time"
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="block w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              id="report-type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className="block w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select report type</option>
              <option value="observation">Observation</option>
              <option value="medication">Medication</option>
              <option value="condition">Condition</option>
              <option value="procedure">Procedure</option>
              <option value="immunization">Immunization</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isUploading ? "Uploading..." : "Upload Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadFile;
