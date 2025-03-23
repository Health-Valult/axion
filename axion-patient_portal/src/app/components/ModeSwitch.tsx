import React from 'react';
import { useDarkMode } from "@/app/components/DarkModeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
    expanded: boolean;
}

const DarkModeToggle = ({ expanded }: DarkModeToggleProps) => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <Button
            onClick={toggleDarkMode}
            variant="outline"
            className="p-2 rounded-lg transition bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
        >
            {darkMode ? (
                <>
                    <Sun className="mr-2" />
                    {expanded && "Light Mode"}
                </>
            ) : (
                <>
                    <Moon className="mr-2" />
                    {expanded && "Dark Mode"}
                </>
            )}
        </Button>
    );
};

export default DarkModeToggle;
