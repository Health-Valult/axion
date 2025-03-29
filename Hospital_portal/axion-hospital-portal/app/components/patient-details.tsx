"use client"

import {FileUp, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Patient } from "@/app/types/patient";

interface PatientDetailsProps {
  patient: Patient;
  onUploadReport: () => void;
}

const PatientDetails = ({ patient, onUploadReport }: PatientDetailsProps) => {
  return (
    <Card className="glass-card hover-lift lg:col-span-2 bg-white text-black dark:bg-black dark:text-white">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* <div className="p-6 md:w-1/3 flex justify-center items-start pt-8">
            <div className="rounded-full bg-primary/10 w-32 h-32 overflow-hidden flex items-center justify-center relative">
              <User className="h-16 w-16 text-primary" />
              {patient.id === "p123456" && (
                <Image 
                  src={patient.imageUrl ?? undefined} 
                  alt={patient.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div> */}
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <button className="text-primary hover:text-primary/80">
                <Edit className="h-5 w-5" />
              </button>
            </div>
            
            {/* <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground w-40">Gender:</p>
                <p className="text-sm">{patient.gender}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground w-40">Age:</p>
                <p className="text-sm">{patient.age} years</p>
              </div>
              
              {patient.birthdate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground w-40">Date of Birth:</p>
                  <p className="text-sm">{patient.birthdate}</p>
                </div>
              )}
              
              {patient.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground w-40">E-mail:</p>
                  <p className="text-sm">{patient.email}</p>
                </div>
              )}
              
              {patient.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground w-40">Telephone:</p>
                  <p className="text-sm">{patient.phone}</p>
                </div>
              )}
              
              {patient.location && (
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground w-40">Location:</p>
                  <p className="text-sm">{patient.location}</p>
                </div>
              )}
              
              {patient.registrationDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground w-40">Registered Date:</p>
                  <p className="text-sm">{patient.registrationDate}</p>
                </div>
              )}
            </div> */}
            <button onClick={onUploadReport} className="btn-primary">
               <FileUp className="h-4 w-4" />
              Upload Report
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
