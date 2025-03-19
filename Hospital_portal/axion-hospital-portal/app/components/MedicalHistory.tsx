"use client"

import { Heart, Droplet, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Patient } from "@/app/types/patient";

interface MedicalHistoryProps {
  patient: Patient;
}

const MedicalHistory = ({ patient }: MedicalHistoryProps) => {
  if (!patient.medicalHistory) return null;
  
  return (
    <Card className="glass-card hover-lift bg-white text-black dark:bg-black dark:text-white">
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-red-500" />
            <span className="text-sm text-muted-foreground">Blood Group:</span>
            <span className="font-medium">{patient.medicalHistory.bloodGroup}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Last Visit:</span>
            <span className="font-medium">{patient.lastVisit}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
            <span className="text-sm text-muted-foreground">Condition:</span>
            <span className="font-medium">{patient.medicalHistory.condition}</span>
          </div>
          
          {patient.medicalHistory.allergies && patient.medicalHistory.allergies.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Allergies:</p>
              <div className="flex flex-wrap gap-2">
                {patient.medicalHistory.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistory;
