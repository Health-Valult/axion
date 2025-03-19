"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface FileUploadFormProps {
  patientId: string;
}

export default function FileUploadForm({ patientId }: FileUploadFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    router.back(); // Navigates to the previous page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a file to upload",
      });
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Success",
        description: "Report uploaded successfully",
      });
      router.push("/search_patient");
    }, 1500);
  };

  return (
    <Card className="glass-card fade-in delay-100 max-w-3xl mx-auto bg-white text-black dark:bg-black dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Upload NDJSON File</CardTitle>
        <CardDescription>
          Upload a NDJSON file containing lab report data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".ndjson,.json"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <FileUp className="h-12 w-12 text-muted-foreground" />
              <p className="text-xl font-medium">
                {selectedFile ? selectedFile.name : "Click to select a file"}
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {selectedFile
                  ? `File size: ${(selectedFile.size / 1024).toFixed(2)} KB`
                  : "Drag and drop a file here, or click to browse"}
              </p>
            </label>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Supported formats: NDJSON, JSON</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="btn-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedFile || isUploading}
          className="btn-primary"
        >
          {isUploading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white/60 border-t-white rounded-full" />
              Processing...
            </>
          ) : (
            <>
              <FileUp className="h-4 w-4" />
              Upload Report
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  );
}
