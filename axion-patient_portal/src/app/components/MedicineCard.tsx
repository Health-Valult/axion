"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Medicine {
    name: string;
    form: string;
    dosage: string;
    directions: string;
    diagnosis: string;
    prescribedAt: string;
    treatmentDuration: string;
    doctorProfile: string;
}

const MedicineCard: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    const getImageForForm = (form: string) => {
        switch (form.toLowerCase()) {
            case "tablet":
                return "/images/medicine/pill.png";
            case "syrup":
                return "/images/medicine/syrup.png";
            case "injection":
                return "/images/medicine/injection.png";
            case "capsule":
                return "/images/medicine/capsule.png";
            case "drops":
                return "/images/medicine/drops.png";
            default:
                return "/images/medicine/medicine.png";
        }
    };

    return (
        <div>
            {/* Wrap the entire card in DialogTrigger */}
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4 border cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 mb-5"
                    >
                        <Image
                            src={getImageForForm(medicine.form)}
                            alt={medicine.form}
                            width={56}
                            height={56}
                            className="object-contain rounded-md"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                            <p className="text-sm text-gray-600">
                                <strong>Dosage:</strong> {medicine.dosage} mg
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Directions:</strong> {medicine.directions}
                            </p>
                        </div>
                    </div>
                </DialogTrigger>

                {/* DialogContent */}
                <DialogContent className="p-6 space-y-4 bg-white rounded-lg shadow-lg w-96">

                    {/* Title for Screen Readers */}
                    <DialogTitle className="sr-only">
                        {medicine.name} - Medicine Details
                    </DialogTitle>

                    <h3 className="text-xl font-semibold text-gray-800">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">
                        <strong>Form:</strong> {medicine.form}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Dosage:</strong> {medicine.dosage} mg
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Directions:</strong> {medicine.directions}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Diagnosis:</strong> {medicine.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Prescribed At:</strong> {medicine.prescribedAt}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Treatment Duration:</strong> {medicine.treatmentDuration}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Doctor:</strong> {medicine.doctorProfile}
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MedicineCard;
