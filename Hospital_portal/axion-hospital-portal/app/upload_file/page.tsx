'use client'

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/Select";
import  Switch  from "@/components/ui/Switch";
import { toast } from "sonner";
import { format } from "date-fns";
import { useDropzone } from "react-dropzone";
import { Calendar, Clock, UploadCloud, FileText, FileType2, User, UserCircle, Stethoscope, AlertCircle, FileCheck, Upload } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import  {AutocompletePatient}  from "@/app/components/AutoCompletePatient";

// // Define report types
type ReportType = "observation" | "medication" | "condition" | "procedure" | "immunization" | "lab" | "imaging" | "prescription";

// Patient interface
interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  nationalId?: string;
}

// Mock patient data for autocomplete
const mockPatients: Patient[] = [
  { id: "1", name: "John Doe", dateOfBirth: "1980-05-15", gender: "male", nationalId: "1234567890" },
  { id: "2", name: "Jane Smith", dateOfBirth: "1975-10-20", gender: "female", nationalId: "0987654321" },
  { id: "3", name: "Michael Johnson", dateOfBirth: "1990-02-28", gender: "male", nationalId: "5678901234" },
];

// Mock function to parse NDJSON 
const parseNDJSON = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        const content = event.target.result as string;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const objects = lines.map(line => JSON.parse(line));
        
        // For demo purposes, extract some sample data
        const extractedData = {
          patientName: objects[0]?.patient?.name || "Unknown Patient",
          patientId: objects[0]?.patient?.id || "Unknown ID",
          reportType: objects[0]?.resourceType?.toLowerCase() || "observation",
          reportDate: objects[0]?.date || new Date().toISOString().split('T')[0],
          reportTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
          practitioner: objects[0]?.practitioner?.name || "Unknown Practitioner",
          practitionerRole: objects[0]?.practitioner?.role || "Doctor",
          hospital: objects[0]?.location?.name || "Unknown Hospital",
          diagnosis: objects[0]?.code?.text || "",
          medications: objects[0]?.medicationCodeableConcept?.text || "",
          procedures: objects[0]?.procedureCodeableConcept?.text || "",
          notes: objects[0]?.note?.[0]?.text || "",
        };
        
        resolve(extractedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

const PatientReportUpload:React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("file-upload");
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  
  // Form data state
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [reportType, setReportType] = useState<ReportType | "">("");
  const [reportDate, setReportDate] = useState<string>("");
  const [reportTime, setReportTime] = useState<string>("");
  const [reportSummary, setReportSummary] = useState<string>("");
  const [practitionerName, setPractitionerName] = useState<string>("");
  const [practitionerRole, setPractitionerRole] = useState<string>("");
  const [hospitalName, setHospitalName] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [medications, setMedications] = useState<string>("");
  const [procedures, setProcedures] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [attachPdf, setAttachPdf] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
    // Dropzone for NDJSON files
    const onDrop = useCallback((acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(file =>
        file.name.endsWith(".ndjson") || file.name.endsWith(".json")
      );
  
      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Some files were rejected. Please upload only NDJSON or JSON files.");
      }
  
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        toast.success(`${validFiles.length} file(s) ready for upload`);
      }
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "application/x-ndjson": [".ndjson"],
        "application/json": [".json"],
      },
      multiple: true,
    });
    
    // Handle file upload with progress
    const handleUploadFiles = async () => {
      if (selectedFiles.length === 0) {
        toast.error("No Files Selected. Please select files to upload.");
        return;
      }
    
      setIsUploading(true);
      setUploadProgress(0);
    }
    //   // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
    
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
    
        setTimeout(() => {
          setIsUploading(false);
          setIsExtracting(true);
        
    //     // Process the first file for demo purposes
        parseNDJSON(selectedFiles[0])
        .then((extractedData) => {
    //       // Populate form with extracted data
          if (extractedData.patientName !== "Unknown Patient") {
            const patient =
              mockPatients.find((p) => p.name.includes(extractedData.patientName)) || {
                id: "new",
                name: extractedData.patientName,
              };
            setSelectedPatient(patient);
          }

          setReportType(extractedData.reportType as ReportType);
          setReportDate(extractedData.reportDate);
          setReportTime(extractedData.reportTime);
          setReportSummary(extractedData.diagnosis || extractedData.notes || "");
          setPractitionerName(extractedData.practitioner);
          setPractitionerRole(extractedData.practitionerRole);
          setHospitalName(extractedData.hospital);
          setDiagnosis(extractedData.diagnosis);
          setMedications(extractedData.medications);
          setProcedures(extractedData.procedures);
          setNotes(extractedData.notes);

          setIsExtracting(false);
          setActiveTab("manual-entry");

          toast.success("Data Extracted. File data has been populated in the form.");
        })
        .catch((error) => {
          setIsExtracting(false);
          toast.error("Extraction Failed. Check the file format or enter data manually.");
        });
      }, 500);
      }, 2000);

      // Handle PDF file selection
      const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (!file.name.endsWith(".pdf")) {
          toast.error("Invalid File Format. Please upload a PDF file.");
          return;
        }

        // setPdfFile(file);
        toast.info(`PDF Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      }
    };

    // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedPatient) {
      toast.error("Missing Information. Please select a patient.");
      return;
    }

    if (!reportType) {
      toast.error("Missing Information. Please select a report type.");
      return;
    }

    if (!reportDate) {
      toast.error("Missing Information. Please enter a report date.");
      return;
    }

    // Simulate form submission
    toast.info("Submitting Report. Please wait...");

    setTimeout(() => {
      // Show success message
      toast.success(
        `${reportType} report for ${selectedPatient.name} has been successfully uploaded.`
      );

      // Reset form
      setSelectedPatient(null);
      setReportType("");
      setReportDate("");
      setReportTime("");
      setReportSummary("");
      setPractitionerName("");
      setPractitionerRole("");
      setHospitalName("");
      setDiagnosis("");
      setMedications("");
      setProcedures("");
      setNotes("");
      setAttachPdf(false);
      setPdfFile(null);
      setSelectedFiles([]);
      setUploadProgress(0);
      setActiveTab("file-upload");
    }, 1500); 
  };
    
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Patient Report Upload</h1>
        <p className="text-secondary-foreground">Upload and manage patient medical reports</p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file-upload" className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            <span>Upload NDJSON</span>
          </TabsTrigger>
          <TabsTrigger value="manual-entry" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Manual Entry</span>
          </TabsTrigger>
        </TabsList>
        
        {/* File Upload Tab */}
        <TabsContent value="file-upload">
          <Card className="border-2 border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" />
                Upload NDJSON Files
              </CardTitle>
              <CardDescription>
                Upload patient health data files in NDJSON format for automatic extraction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">
                  {isDragActive ? "Drop the files here" : "Drag & drop NDJSON files here"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  or click to browse your computer
                </p>
                <button 
                  type="button" 
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Browse Files
                </button>

              </div>
              
              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-foreground">Selected Files:</h3>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div className="flex items-center gap-2">
                          <FileType2 className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-md text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
              
              {/* Extracting Data */}
              {isExtracting && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-md flex items-center gap-3">
                  <div className="animate-spin">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Extracting data from files...</span>
                </div>
              )}
              
              {/* Upload Button */}
              <button
                type="button"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedFiles.length === 0 || isUploading || isExtracting}
                onClick={handleUploadFiles}
              >
                {isUploading ? "Uploading..." : isExtracting ? "Extracting..." : "Process Files"}
              </button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Manual Entry Tab */}
        <TabsContent value="manual-entry">
          <Card className="border-2 border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Manual Report Entry
              </CardTitle>
              <CardDescription>
                Enter patient report details manually or review extracted data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Patient Details Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-md">
                    <User className="h-4 w-4 text-primary" />
                    Patient Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-search">Patient Name</Label>
                    <AutocompletePatient
                      patients={mockPatients}
                      selectedPatient={selectedPatient}
                      onSelect={setSelectedPatient}
                    />
                  </div>
                  
                  {selectedPatient && (
                    <div className="p-3 bg-accent/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium">{selectedPatient.name}</span>
                      </div>
                      {selectedPatient?.dateOfBirth && (
                        <div className="text-sm mt-1 text-muted-foreground">
                          DOB: {selectedPatient.dateOfBirth} | 
                          Gender: {selectedPatient?.gender ? selectedPatient.gender.charAt(0).toUpperCase() + selectedPatient.gender.slice(1) : "Unknown"} |
                          ID: {selectedPatient?.nationalId ?? "N/A"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Report Details Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-md">
                    <FileCheck className="h-4 w-4 text-primary" />
                    Report Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <select 
                        value={reportType} 
                        onChange={(event) => setReportType(event.target.value as ReportType)}
                      >
                        <option value="" disabled>Select report type</option>
                        <option value="observation">Observation</option>
                        <option value="medication">Medication</option>
                        <option value="condition">Condition</option>
                        <option value="procedure">Procedure</option>
                        <option value="immunization">Immunization</option>
                        <option value="lab">Lab Report</option>
                        <option value="imaging">Imaging</option>
                        <option value="prescription">Prescription</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="report-date">Report Date</Label>
                      <div className="relative">
                        <input
                          id="report-date"
                          type="date"
                          value={reportDate}
                          onChange={(e) => setReportDate(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-time">Report Time</Label>
                      <div className="relative">
                        <input
                          id="report-time"
                          type="time"
                          value={reportTime}
                          onChange={(e) => setReportTime(e.target.value)}
                        />
                        <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="report-summary">Report Summary</Label>
                      <input
                        id="report-summary"
                        value={reportSummary}
                        onChange={(e) => setReportSummary(e.target.value)}
                        placeholder="Brief summary of the report"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Practitioner Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-md">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    Doctor/Practitioner Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="practitioner-name">Practitioner Name</Label>
                      <input
                        id="practitioner-name"
                        value={practitionerName}
                        onChange={(e) => setPractitionerName(e.target.value)}
                        placeholder="Doctor/Practitioner name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="practitioner-role">Role</Label>
                      <input
                        id="practitioner-role"
                        value={practitionerRole}
                        onChange={(e) => setPractitionerRole(e.target.value)}
                        placeholder="e.g., Doctor, Nurse, Specialist"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hospital-name">Hospital/Clinic</Label>
                      <input
                        id="hospital-name"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder="Facility name"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Diagnosis & Treatment */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2 text-md">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Diagnosis & Treatment
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Condition/Diagnosis</Label>
                    <input
                      id="diagnosis"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Medical condition or diagnosis"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medications">Medications Prescribed</Label>
                      <input
                        id="medications"
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                        placeholder="List of medications"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="procedures">Procedures Performed</Label>
                      <input
                        id="procedures"
                        value={procedures}
                        onChange={(e) => setProcedures(e.target.value)}
                        placeholder="Medical procedures"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <input
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information"
                    />
                  </div>
                </div>
                
                {/* PDF Attachment */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={attachPdf} 
                      onCheckedChange={setAttachPdf} 
                    />
                    <Label className="cursor-pointer">
                      Attach PDF Report (Optional)
                    </Label>
                  </div>

                  {attachPdf && (
                    <div className="space-y-2">
                      <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                      />
                      {pdfFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected: {pdfFile.name} ({(pdfFile.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Report
                </button>

              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientReportUpload;
