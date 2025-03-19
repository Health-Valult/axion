"use client"

import { useRouter } from "next/navigation";
import { FileUp, FileText, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ReportUploadMethod() {
  const router = useRouter(); // Initialize Next.js router

  const onSelectMethod = (method: "file" | "manual") => {
    if (method === "file") {
      router.push("/upload-report/FileUpload"); // Navigate to FileUpload.tsx
    } else {
      router.push("/upload-report/ManualReportForm"); // Navigate to ManualReportForm.tsx
    }
  };


  return (
    <div className="min-h-screen p-6 md:p-12 space-y-8 max-w-7xl mx-auto bg-white text-black dark:bg-black dark:text-white">
      <header className="text-center space-y-2 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Upload Report
          </h1>
          <p className="text-muted-foreground text-lg">
            Fill the Report either by Uploading .ndjson file or Type Manually
          </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6 fade-in delay-100">
        <Card className="glass-card hover-lift cursor-pointer bg-white text-black dark:bg-black dark:text-white" onClick={() => onSelectMethod("file")}>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full">
              <FileUp className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mt-4">Upload NDJSON</CardTitle>
            <CardDescription>Import a NDJSON file to extract report details automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Faster data entry</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Automatic formatting</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Multiple reports at once</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift cursor-pointer bg-white text-black dark:bg-black dark:text-white" onClick={() => onSelectMethod("manual")}>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mt-4">Create Manually</CardTitle>
            <CardDescription>Enter report details manually using our templates</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Guided input with templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Add specific details</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Optional PDF attachment</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
