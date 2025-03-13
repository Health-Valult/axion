"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { reportTemplates } from "@/app/upload-report/data/reportTemplates";
import CBCFormFields, { CBCFormData } from "@/app/upload-report/templates/CBCReport";
import CommonReportFields, { CommonReportData } from "@/app/upload-report/templates/CommonReportFields";
import GenericReportFields from "@/app/upload-report/templates/GenericReportFields";
import ReportPreview from "@/app/upload-report/templates/ReportPreview";

interface ManualReportFormProps {
  patientId: string;
  onCancel: () => void;
}

export const ManualReportForm = ({ patientId, onCancel }: ManualReportFormProps) => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState("");
  const [reportData, setReportData] = useState<CommonReportData>({
    date: "",
    time: "",
    practitioner: "",
    clinic: "",
    recorder: "",
    attachPdf: false,
    pdfFile: null,
  });

  useEffect(() => {
    setReportData(prev => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5), 
    }));
  }, []);

  // For CBC specific fields
  const [cbcData, setCbcData] = useState<CBCFormData>({
    patientName: "",
    referredBy: "",
    ageSex: "",
    investigations: "CBC",
    hemoglobin: "",
    totalLeukocyteCount: "",
    neutrophils: "",
    lymphocytes: "",
    eosinophils: "",
    monocytes: "",
    basophils: "",
    plateletCount: "",
    totalRBCCount: "",
    hematocrit: "",
    meanCorpuscularVolume: "",
    meanCellHemoglobin: "",
    meanCellHemoglobinConcentration: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCBCInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCbcData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setReportData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportData((prev) => ({ ...prev, pdfFile: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReport) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a report type",
      });
      return;
    }

    if (!reportData.practitioner || !reportData.clinic || !reportData.recorder) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (reportData.attachPdf && !reportData.pdfFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a PDF file or disable the PDF attachment option",
      });
      return;
    }

    // For CBC report validation
    if (selectedReport === "cbc") {
      // Fix: Add date to the CBC data
      const fullDate = `${reportData.date} ${reportData.time}`;
      
      // Update CBC data with patient info and date
      const updatedCbcData = {
        ...cbcData,
        patientName: cbcData.patientName || "Patient Name",
        referredBy: reportData.practitioner,
        ageSex: cbcData.ageSex || "Not Specified",
        date: fullDate
      };
      
      setCbcData(updatedCbcData);
      
      if (showPreview) {
        // If already in preview, proceed to save
        proceedToSave();
      } else {
        // Show preview first
        setShowPreview(true);
        return;
      }
    } else {
      proceedToSave();
    }
  };

  const proceedToSave = () => {
    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Success",
        description: "Report created successfully",
      });
      navigate("/");
    }, 1500);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  if (showPreview && selectedReport === "cbc") {
    return (
      <ReportPreview
        reportType={selectedReport}
        reportData={{
          ...cbcData,
          date: `${reportData.date} ${reportData.time}`
        }}
        isSaving={isSaving}
        onBack={handleBackToForm}
        onSave={proceedToSave}
      />
    );
  }

  return (
    <Card className="glass-card fade-in delay-100 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Report Manually</CardTitle>
        <CardDescription>
          Select a report type and enter the details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Report Type <span className="text-red-500">*</span>
            </label>
            <select
              name="reportType"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="search-input"
              required
            >
              <option value="">Select a report type</option>
              {reportTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <CommonReportFields
            reportData={reportData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onFileChange={handleFileChange}
          />

          {selectedReport === "cbc" && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">
                Complete Blood Count (CBC) Details
              </h3>
              <CBCFormFields 
                cbcData={cbcData}
                onChange={handleCBCInputChange}
              />
            </div>
          )}

          {selectedReport && selectedReport !== "cbc" && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">
                {reportTemplates.find(t => t.id === selectedReport)?.name} Details
              </h3>
              <GenericReportFields 
                reportTemplate={reportTemplates.find(t => t.id === selectedReport)!} 
              />
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white/60 border-t-white rounded-full" />
              Saving...
            </>
          ) : selectedReport === "cbc" ? (
            <>
              <Check className="h-4 w-4" />
              Preview Report
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Report
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  );
};
