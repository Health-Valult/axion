"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/app/types/patient";
import SearchForm from "@/app/components/SearchForm";
import { useRouter } from "next/navigation";

// Constants for URLs (move these to env vars in production)
// const WEBSOCKET_URL = "wss://axiontestgateway.azure-api.net/patients-search"; // 🔸 WebSocket URL (Commented)
const PATIENT_DETAILS_URL = "https://axiontestgateway.azure-api.net/records/records/get-patient-details";

const SearchPatient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const getSessionToken = (): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("session_token");
    }
    return null;
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid National ID",
      });
      return;
    }

    setIsSearching(true);

    try {
      const session_token = getSessionToken();

      if (!session_token) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "You are not logged in. Please log in to search for patients.",
        });
        return;
      }

      try {
        // 🔸 WebSocket-related code commented out
        // const patientProfile = await searchPatientByNIC(searchQuery, session_token);
        const patientProfile = { NIC: searchQuery }; // Temporary mock for testing without WebSocket

        if (patientProfile) {
          const patientDetails = await fetchPatientDetails(patientProfile.NIC, session_token);

          if (patientDetails) {
            setPatient(patientDetails);
            toast({
              title: "Success",
              description: `Found records for ${patientDetails.name}`,
            });
          } else {
            handlePatientNotFound();
          }
        } else {
          handlePatientNotFound();
        }
      } catch (error) {
        console.error("WebSocket or API error:", error);
        toast({
          variant: "destructive",
          title: "Connection Timeout",
          description: "Server is not responding. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error searching for patient:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while searching for the patient",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // 🔸 Full WebSocket function commented out
  /*
  const searchPatientByNIC = async (nic: string, session_token: string): Promise<any | null> => {
    const socketUrl = `${WEBSOCKET_URL}?token=Bearer ${session_token}`;
    const socket = new WebSocket(socketUrl);

    return new Promise<any | null>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        socket.close();
        reject(new Error("WebSocket response timeout"));
      }, 15000);

      socket.onopen = () => {
        socket.send(JSON.stringify({ packet: nic }));
      };

      socket.onmessage = (event: MessageEvent<string>) => {
        clearTimeout(timeoutId);
        try {
          const data = JSON.parse(event.data);
          socket.close();

          const patients = data.packet;

          if (Array.isArray(patients) && patients.length > 0) {
            resolve(patients[0]);
          } else {
            resolve(null);
          }
        } catch (err) {
          socket.close();
          reject(err);
        }
      };

      socket.onerror = (error) => {
        clearTimeout(timeoutId);
        socket.close();
        reject(error);
      };
    });
  };
  */

  const fetchPatientDetails = async (nic: string, session_token: string): Promise<Patient | null> => {
    try {
      const response = await fetch(PATIENT_DETAILS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${session_token}`,
        },
        body: JSON.stringify({ NIC: nic }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }

      const data = await response.json();

      return transformApiResponseToPatient(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      return null;
    }
  };

  const transformApiResponseToPatient = (apiResponse: any): Patient => {
    return {
      nationalId: apiResponse.NIC || "",
      name: `${apiResponse.FirstName} ${apiResponse.LastName || ""}`,
    };
  };

  const handlePatientNotFound = (): void => {
    setPatient(null);
    toast({
      variant: "destructive",
      title: "Not Found",
      description: "No patient found with that National ID",
    });
  };

  const handleUploadReport = (): void => {
    if (!patient) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please search and select a patient before uploading",
      });
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentPatient", JSON.stringify(patient));
    }

    toast({
      title: "Navigation",
      description: "Redirecting to upload page...",
    });

    router.push("/upload-report/ReportUploadMethod");
  };

  return (
    <div className="min-h-screen p-6 md:p-12 space-y-8 max-w-7xl mx-auto bg-white text-black dark:bg-black dark:text-white">
      <header className="text-center space-y-2 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white">Search Patient</h1>
        <p className="text-muted-foreground text-lg dark:text-white">
          Search for patients using their National ID
        </p>
      </header>

      <SearchForm
        searchQuery={searchQuery}
        isSearching={isSearching}
        onSearchQueryChange={(value: string) => setSearchQuery(value)}
        onSubmit={handleSearch}
      />

      {patient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in bg-white text-black dark:bg-black dark:text-white">
          <div className="col-span-1 bg-slate-100 dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Patient Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">National ID</p>
                <p className="font-medium">{patient.nationalId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <button
                onClick={handleUploadReport}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upload Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
