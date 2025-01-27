"use client";

import React, { useState } from "react";
import Image from "next/image";

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
    const [isModalOpen, setModalOpen] = useState(false);

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

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).dataset.overlay) {
            setModalOpen(false);
        }
    };

    return (
        <div>
            <div
                className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4 border border-gray-200 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 mb-5"
                onClick={() => setModalOpen(true)}
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

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleModalClick}
                    data-overlay="true"
                >
                    <div
                        className={`bg-white rounded-lg p-6 shadow-lg w-96 space-y-4 relative modal ${
                            isModalOpen ? "animate-fadeIn" : "animate-fadeOut"
                        }`}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setModalOpen(false)}
                        >
                            ✖
                        </button>

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
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicineCard;
