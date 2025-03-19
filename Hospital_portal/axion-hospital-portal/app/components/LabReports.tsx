"use client"

import { FileUp, Eye, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Patient } from "@/app/types/patient";

interface LabReportsProps {
  patient: Patient;
  onUploadReport: () => void;
}

const LabReports = ({ patient, onUploadReport }: LabReportsProps) => {
  return (
    <Card className="glass-card hover-lift lg:col-span-3 bg-white text-black dark:bg-black dark:text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Laboratory Reports</CardTitle>
          <CardDescription>Recent medical test results and reports</CardDescription>
        </div>
        <button onClick={onUploadReport} className="btn-primary">
          <FileUp className="h-4 w-4" />
          Upload Report
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-muted-foreground">Report Name</th>
                <th className="text-left p-3 text-muted-foreground">Type</th>
                <th className="text-left p-3 text-muted-foreground">Date</th>
                <th className="text-left p-3 text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {patient.labReports && patient.labReports.length > 0 ? (
                patient.labReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{report.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{report.type}</td>
                    <td className="p-3 text-muted-foreground">{report.date}</td>
                    <td className="p-3">
                      <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    No laboratory reports available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabReports;