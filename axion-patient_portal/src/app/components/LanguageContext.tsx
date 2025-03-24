"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

type Translations = {
    welcomeMessage: string;
    basicHealthInformation: string;
    name: string;
    age: string;
    gender: string;
    male: string;
    female: string;
    height: string;
    weight: string;
    bloodType: string;
    myMedications: string;
    medicalReports: string;
    criticalAlerts: string;
    emergencyInfo: string;
    emergencyFeatures: string;
    accessLogs: string;
    accessLogsMsg: string;
    accessLogsBtn: string;
    backupStatus: string;
    backupStatusMsg: string;
    backupStatusBtn: string;
    connectWithDoctor: string;
    connectWithDoctorMsg: string;
    newestFirst: string;
    oldestFirst: string;
    pickDate: string;
    removeDate: string;
    noReportsFound: string;
    prescribedMedicines: string;
    form: string;
    dosage: string;
    directions: string;
    diagnosis: string;
    prescribedAt: string;
    treatmentDuration: string;
    doctor: string;
    allergies: string,
    no_allergies_data: string,
    criticality: string,
    severity: string,
    category: string,
    source: string,
    verification_status: string,
    created: string,
    immunizations: string,
    no_immunizations_data: string,
    site: string,
    administered_on: string,
    no_medications_found: string,
    your_profile: string,
    reset_password: string,
    delete_account: string,
    confirm: string,
    cancel: string,
    enter_email_and_password: string,
    no_reports_found: string,
    download: string,
    no_data_available: string,
    data_not_found: string,
    something_went_wrong: string,
    email: string,
    password: string,
    old_password: string,
    new_password: string
};

const translations: Record<string, () => Promise<{ default: Translations }>> = {
    en: () => import("@/locales/en.json"),
    si: () => import("@/locales/si.json"),
    ta: () => import("@/locales/ta.json"),
};

type LanguageContextType = {
    language: string;
    changeLanguage: (lang: string) => void;
    t: Translations;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<string>("en"); // Default to "en"
    const [currentTranslations, setCurrentTranslations] = useState<Translations>({} as Translations);

    useEffect(() => {
        // Client-side code to access localStorage
        const storedLanguage = localStorage.getItem("appLanguage");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }

        const loadTranslations = async () => {
            const translationModule = await translations[language]();
            setCurrentTranslations(translationModule.default);
        };

        loadTranslations();
    }, [language]);

    const changeLanguage = (language: string) => {
        setLanguage(language);
        localStorage.setItem("appLanguage", language); // Store the language in localStorage
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t: currentTranslations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
