"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

type DarkModeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
    const getInitialMode = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ||
                (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        return false;
    };

    const [darkMode, setDarkMode] = useState<boolean>(getInitialMode);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((previous) => !previous);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) throw new Error("useDarkMode must be used within a DarkModeProvider");
    return context;
};
