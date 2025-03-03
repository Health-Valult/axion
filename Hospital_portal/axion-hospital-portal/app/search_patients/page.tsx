'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, FileUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";

// Define TypeScript Interface for Patient Data
interface Patient {
  id: string;
  nationalId: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
}

const PatientSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const router = useRouter();

  // Mock patient data - in a real app, replace this with an API call
  const mockPatientData: Patient[] = [
    {
      id: "p123456",
      nationalId: "1234567890",
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "30 Apr 2024",
    },
    {
      id: "p123457",
      nationalId: "1234567891",
      name: "Hema Zue",
      age: 20,
      gender: "Female",
      lastVisit: "10 Jan 2025",
    },
    {
      id: "p123458",
      nationalId: "1234567892",
      name: "Katherin John",
      age: 60,
      gender: "Female",
      lastVisit: "21 Feb 2025",
    },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setAlert({ type: "error", message: "Please enter a valid National ID" });
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const foundPatient = mockPatientData.find((p) => p.nationalId === searchQuery);

      if (foundPatient) {
        setPatient(foundPatient);
        setAlert({ type: "success", message: `Found records for ${foundPatient.name}` });
      } else {
        setPatient(null);
        setAlert({ type: "error", message: "No patient found with that National ID" });
      }
      setIsSearching(false);
    }, 800);
  };

  const handleViewDetails = () => {
    if (patient) {
      setAlert({ type: "success", message: `Viewing details for patient ${patient.name}` });
      router.push(`/patients/${patient.id}`);
    }
  };

  const handleUploadFile = () => {
    setAlert({ type: "success", message: `Preparing to upload file for patient ${patient?.name}` });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Patient Search</h1>
        <p className="text-secondary-foreground">Search for patients by National ID</p>
      </header>

      {/* Alert */}
      {alert && (
        <div
          className={`p-3 rounded-md ${
            alert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Search Form */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
          <CardDescription>Enter the National ID to find patient records</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter National ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <button type="submit" disabled={isSearching} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                {isSearching ? "Searching..." : "Search"}
                <Search className="ml-2 h-4 w-4 inline-block" />
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Patient Details (if found) */}
      {patient && (
        <Card className="glass-card hover-scale">
          <CardHeader>
            <CardTitle>Patient Found</CardTitle>
            <CardDescription>Patient details for National ID: {patient.nationalId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} years old • {patient.gender}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">National ID</p>
                  <p className="font-medium">{patient.nationalId}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="font-medium">{patient.lastVisit}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <button onClick={handleViewDetails} className="px-4 py-2 border rounded-md">
              View Details
              <Eye className="ml-2 h-4 w-4 inline-block" />
            </button>
            <button onClick={handleUploadFile} className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Upload File
              <FileUp className="ml-2 h-4 w-4 inline-block" />
            </button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PatientSearch;
