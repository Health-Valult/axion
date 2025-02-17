"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

type Translations = {
    welcomeMessage: string;
    basicHealthInformation: string;
    name: string;
    age: string;
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
    const getInitialLanguage = (): string => {
        return localStorage.getItem("appLanguage") || "en"; // Get stored language or default to English
    };
    const [language, setLanguage] = useState<string>(getInitialLanguage);
    const [currentTranslations, setCurrentTranslations] = useState<Translations>({} as Translations);

    useEffect(() => {
        const loadTranslations = async () => {
            const translationModule = await translations[language]();
            setCurrentTranslations(translationModule.default); // ✅ Fix: Access `.default`
        };

        loadTranslations();
    }, [language]);

    const changeLanguage = (language: string) => {
        setLanguage(language);
        localStorage.setItem("appLanguage", language);
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
