import React from "react";

import MedicineCard from "../components/MedicineCard";

const PatientMedicineList: React.FC = () => {
    const medicines = [
        {
            name: "Paracetamol",
            form: "Tablet",
            dosage: "500",
            diagnosis: "Fever and mild pain",
            prescribedAt: "2025-01-25 10:00 AM",
            directions: "1 tablet every 6 hours, after meals",
            treatmentDuration: "5 days",
            doctorProfile: "Dr. John Smith, MD - General Practitioner",
        },
        {
            name: "Amoxicillin",
            form: "Capsule",
            dosage: "250",
            diagnosis: "Bacterial infection",
            prescribedAt: "2025-01-20 4:00 PM",
            directions: "1 capsule every 8 hours, before meals",
            treatmentDuration: "7 days",
            doctorProfile: "Dr. Jane Doe, MD - Internal Medicine",
        },
    ];

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl text-purple-900 font-bold mb-4">Prescribed Medicines</h1>
            {medicines.map((medicine, index) => (
                <MedicineCard key={index} medicine={medicine} />
            ))}
        </div>
    );
};

export default PatientMedicineList;
