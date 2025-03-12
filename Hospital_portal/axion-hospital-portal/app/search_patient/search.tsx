"use client"

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/app/types/patient";
import SearchForm from "@/app/components/SearchForm";
import PatientDetails from "@/app/components/patient-details";
import MedicalHistory from "@/app/components/MedicalHistory";
import LabReports from "@/app/components/LabReports";
import { useRouter } from "next/navigation";

const SearchPatient = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Mock patient data
  const mockPatientData: Patient[] = [
    {
      id: "p123456",
      nationalId: "1234567890",
      name: "Jane Smith",
      age: 29,
      gender: "Female",
      lastVisit: "30 April 2024",
      registrationDate: "24 April 2022.",
      birthdate: "08.04.1996.",
      email: "smithJane123@gmail.com",
      phone: "+94 77 490 3301",
      location: "Colombo, Srilanka",
      medicalHistory: {
        bloodGroup: "A+",
        condition: "Healthy",
        allergies: ["Penicillin", "Pollen"]
      },
      labReports: [
        {
          id: "lab001",
          name: "Complete Blood Count",
          date: "15 Apr 2024",
          type: "Hematology"
        },
        {
          id: "lab002",
          name: "Lipid Profile",
          date: "30 Mar 2024",
          type: "Biochemistry"
        },
        {
          id: "lab003",
          name: "Thyroid Function Test",
          date: "10 Feb 2024",
          type: "Endocrinology"
        }
      ]
    },
    {
      id: "p123457",
      nationalId: "1234567891",
      name: "Hema Zue",
      age: 20,
      gender: "Female",
      lastVisit: "10 Jan 2025",
      registrationDate: "04 January 2025.",
      birthdate: "08.04.2004.",
      email: "hemazue2004@gmail.com",
      phone: "+94 76 494 8021",
      location: "Anuradhapura, Srilanka",
      medicalHistory: {
        bloodGroup: "B-",
        condition: "Heart Patient",
        allergies: ["Sulfa drugs"]
      },
      labReports: [
        {
          id: "lab004",
          name: "Echocardiogram",
          date: "05 Jan 2025",
          type: "Cardiology"
        }
      ]
    },
    {
      id: "p123458",
      nationalId: "1234567892",
      name: "Katherin John",
      age: 60,
      gender: "Female",
      lastVisit: "21 February 2025",
      registrationDate: "04 January 2025.",
      birthdate: "10.09.1965.",
      email: "katherin609@gmail.com",
      phone: "+94 77 856 2698",
      location: "Colombo, Srilanka",
      medicalHistory: {
        bloodGroup: "O+",
        condition: "Diabetic",
        allergies: []
      },
      labReports: [
        {
          id: "lab005",
          name: "Blood Glucose",
          date: "21 Feb 2025",
          type: "Diabetology"
        }
      ]
    },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);

    if (!searchQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid National ID",
      });
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const foundPatient = mockPatientData.find((p) => p.nationalId === searchQuery);
      console.log("Patient found:", foundPatient);

      if (foundPatient) {
        setPatient(foundPatient);
        toast({
          title: "Success",
          description: `Found records for ${foundPatient.name}`,
        });
      } else {
        setPatient(null);
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "No patient found with that National ID",
        });
      }
      setIsSearching(false);
    }, 800);
  };

  const handleUploadReport = () => {
    toast({
      title: "Navigation",
      description: "Redirecting to upload page...",
    });
    router.push("/upload-report/FileUpload");
  };

  return (
    <div className="min-h-screen p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      <header className="text-center space-y-2 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Search Patient
        </h1>
        <p className="text-muted-foreground text-lg">
          Search for patients using their National ID
        </p>
      </header>

      <SearchForm 
        searchQuery={searchQuery}
        isSearching={isSearching}
        onSearchQueryChange={setSearchQuery}
        onSubmit={handleSearch}
      />

      {patient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
          <PatientDetails patient={patient} />
          <MedicalHistory patient={patient} />
          <LabReports patient={patient} onUploadReport={handleUploadReport} />
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
