"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/app/components/LanguageContext";
import {useDarkMode} from "@/app/components/DarkModeContext";

interface Meta {
    created: string;
    source: string;
}

interface Medicine {
    display: string;
    dosage: string;
    route: string;
    prescriber: string;
    meta: Meta;
}

const MedicineCard: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    const { t } = useLanguage();
    const { darkMode } = useDarkMode();

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div
                        className="p-4 bg-white dark:bg-gray-950 shadow-md rounded-lg flex items-center space-x-4 border dark:border-gray-700 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 mb-5"
                    >
                        <Image
                            src={darkMode ? "/images/medicine/medicine-black.jpg" : "/images/medicine/medicine.png"}
                            alt={medicine.display}
                            width={56}
                            height={56}
                            className="object-contain rounded-md"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-orange-300">{medicine.display}</h3>
                            <p className="text-sm text-gray-600 dark:text-white">
                                <strong>{t.dosage}:</strong> {medicine.dosage}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-white">
                                <strong>Route:</strong> {medicine.route}
                            </p>
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent className="p-6 space-y-4 bg-white dark:bg-gray-950 rounded-lg shadow-lg w-96">
                    <DialogTitle className="sr-only">
                        {medicine.display}
                    </DialogTitle>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-orange-300">{medicine.display}</h3>
                    
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.dosage}:</strong> {medicine.dosage}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>Route:</strong> {medicine.route}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>Prescriber:</strong> {medicine.prescriber}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>{t.prescribedAt}:</strong> {new Date(medicine.meta?.created).toLocaleString() || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                        <strong>Source:</strong> {medicine.meta?.source || "N/A"}
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MedicineCard;
