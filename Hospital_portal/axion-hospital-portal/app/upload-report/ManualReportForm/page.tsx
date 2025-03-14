"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { reportTemplates } from "@/app/upload-report/data/reportTemplates";
import CommonReportFields, { CommonReportData } from "@/app/upload-report/templates/CommonReportFields";
import ReportPreview from "@/app/upload-report/templates/ReportPreview";
//import all report fields
import CBCFormFields from "@/app/upload-report/templates/CBCReport";
import UFRFormFields from "@/app/upload-report/templates/UFRReport"; 
import CRPFormFields from "@/app/upload-report/templates/CPRReport";
import ESRFormFields from "../templates/ESRReport";
import FBSFormFields from "../templates/FBSReport";
// import GenericReportFields from "../templates/GenericReportFields";
import HbA1cFormFields from "../templates/HbA1cReport";
import LFTFormFields from "../templates/LFTReport";
import LipidProfileFormFields from "../templates/LipidProfileReport";
import SearumCFormFields from "../templates/SerumCReport";
import SerumElectroFormFields from "../templates/SerumElectroReport";
import TFTFormFields from "../templates/TFTReports";

// Import all report templates
import {
  CBCReportTemplate,
  UFRTemplate,
  CRPReportTemplate,
  LFTReportTemplate,
  FBSReportTemplate,
  SerumCreatinineReportTemplate,
  SerumElectrolytesReportTemplate,
  LipidProfileReportTemplate,
  HbA1cReportTemplate,
  ESRReportTemplate,
  TFTReportTemplate,
} from "@/app/upload-report/data/CBCFormData";

interface ManualReportFormProps {
  patientId: string;
  onCancel: () => void;
}

// Create a map for all report templates
const reportTemplatesMap: { [key: string]: any } = {
  cbc: CBCReportTemplate,
  ufr: UFRTemplate,
  crp: CRPReportTemplate,
  lft: LFTReportTemplate,
  fbs: FBSReportTemplate,
  serumCreatinine: SerumCreatinineReportTemplate,
  serumElectrolytes: SerumElectrolytesReportTemplate,
  lipidProfile: LipidProfileReportTemplate,
  hba1c: HbA1cReportTemplate,
  esr: ESRReportTemplate,
  tft: TFTReportTemplate,
};

const ManualReportForm = ({ patientId, onCancel }: ManualReportFormProps) => {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState("");
  const [reportData, setReportData] = useState<CommonReportData>({
    date: "",
    time: "",
    practitioner: "",
    clinic: "",
    recorder: "",
    instructions:"",
    attachPdf: false,
    pdfFile: null,
  });

  const [dynamicReportData, setDynamicReportData] = useState<any>({});

  useEffect(() => {
    setReportData(prev => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5),
    }));
  }, []);

  // Update report fields based on selectedReport
  useEffect(() => {
    if (selectedReport) {
      setDynamicReportData(reportTemplatesMap[selectedReport] || {});
    }
  }, [selectedReport]);

  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDynamicReportData((prev: any) => ({ ...prev, [name]: value }));
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
      toast({ variant: "destructive", title: "Error", description: "Please select a report type" });
      return;
    }

    if (!reportData.practitioner || !reportData.clinic || !reportData.recorder) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields" });
      return;
    }

    if (reportData.attachPdf && !reportData.pdfFile) {
      toast({ variant: "destructive", title: "Error", description: "Please upload a PDF file or disable the PDF attachment option" });
      return;
    }

    const fullDate = `${reportData.date} ${reportData.time}`;
    const updatedReportData = { ...dynamicReportData, date: fullDate };

    setDynamicReportData(updatedReportData);

    if (showPreview) {
      proceedToSave();
    } else {
      setShowPreview(true);
    }
  };

  const proceedToSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Success", description: "Report created successfully" });
      router.push("/search_patient");
    }, 1500);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <ReportPreview
        reportType={selectedReport}
        reportData={{ ...dynamicReportData, date: `${reportData.date} ${reportData.time}` }}
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
        <CardDescription>Select a report type and enter the details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium">Report Type <span className="text-red-500">*</span></label>
            <select
              name="reportType"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="search-input"
              required
            >
              <option value="">Select a report type</option>
              {reportTemplates.map((template) => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>

          <CommonReportFields
            reportData={reportData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onFileChange={handleFileChange}
          />

          {selectedReport === "cbc" && <CBCFormFields cbcData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "ufr" && <UFRFormFields ufrData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "crp" && <CRPFormFields cprData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "lft" && <LFTFormFields lftData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "fbs" && <FBSFormFields fbsData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "serumCreatinine" && <SearumCFormFields scData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "serumElectrolytes" && <SerumElectroFormFields serumelectroData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "lipidProfile" && <LipidProfileFormFields lipidprofileData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "hba1c" && <HbA1cFormFields hbA1cData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "esr" && <ESRFormFields esrData={dynamicReportData} onChange={handleDynamicInputChange} />}
          {selectedReport === "tft" && <TFTFormFields tftData={dynamicReportData} onChange={handleDynamicInputChange} />}
    
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button type="button" onClick={onCancel} className="btn-secondary"><ArrowLeft className="h-4 w-4" />Cancel</button>
        <button type="submit" onClick={handleSubmit} disabled={isSaving} className="btn-primary">
          {isSaving ? "Saving..." : "Preview Report"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ManualReportForm;
