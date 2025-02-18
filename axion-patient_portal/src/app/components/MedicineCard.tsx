"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/app/components/LanguageContext";

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
    const { t } = useLanguage();

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
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className="p-4 bg-white dark:bg-gray-950 shadow-md rounded-lg flex items-center space-x-4 border dark:border-gray-700 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 mb-5"
                    >
                        <Image
                            src={getImageForForm(medicine.form)}
                            alt={medicine.form}
                            width={56}
                            height={56}
                            className="object-contain rounded-md"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-orange-300">{medicine.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-white">
                                <strong>{t.dosage}:</strong> {medicine.dosage} mg
                            </p>
                            <p className="text-sm text-gray-600 dark:text-white">
                                <strong>{t.directions}:</strong> {medicine.directions}
                            </p>
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent className="p-6 space-y-4 bg-white dark:bg-gray-950 rounded-lg shadow-lg w-96">

                    <DialogTitle className="sr-only">
                        {medicine.name} - Medicine Details
                    </DialogTitle>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-orange-300">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.form}:</strong> {medicine.form}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.dosage}:</strong> {medicine.dosage} mg
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.directions}:</strong> {medicine.directions}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.diagnosis}:</strong> {medicine.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.prescribedAt}:</strong> {medicine.prescribedAt}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.treatmentDuration}:</strong> {medicine.treatmentDuration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.doctor}:</strong> {medicine.doctorProfile}
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MedicineCard;
