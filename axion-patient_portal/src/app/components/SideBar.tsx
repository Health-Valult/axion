"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import ModeSwitch from "@/app/components/ModeSwitch";

interface SidebarContextProps {
    expanded: boolean;
    activeItem: string;
    setActiveItem: (item: string) => void;
}

interface SidebarProps {
    children: ReactNode;
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    href: string;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

function Sidebar({ children }: SidebarProps) {
    const [expanded, setExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState<string>("");
    const path = usePathname();

    useEffect(() => {
        setExpanded(false);

        if (path === "/") setActiveItem("Dashboard");
        else if (path === "/reports") setActiveItem("Reports");
        else if (path === "/medicine") setActiveItem("Medicines");
        else setActiveItem("");
    }, [path]);

    return (
        <aside
            className={`h-screen max-h-full transition-all bg-white dark:bg-gray-950 dark:text-white border-r shadow-sm flex flex-col relative group ${expanded ? 'w-56' : 'w-20'}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className="p-4 flex justify-center items-center">
                <Image src="/logo.png" width={90} height={30} className="transition-all" alt="Logo" />
            </div>

            <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
                <ul className="flex-1 px-3 dark:text-white">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t flex p-3 items-center">
                <div/>
                <Image src="/user-icon.jpg" width={40} height={40} className="w-10 h-10 rounded-md" alt="User Avatar" />
                <div className="overflow-hidden transition-all w-0 group-hover:w-52 ml-3">
                    <h4 className="font-semibold text-black dark:text-white">John Doe</h4>
                    <span className="text-xs text-black dark:text-white">johndoe@gmail.com</span>
                </div>
                <Link href="/profile">
                    <MoreVertical size={20} className="ml-auto hidden group-hover:block dark:text-white" />
                </Link>
            </div>
            <ModeSwitch expanded={expanded}/>
        </aside>
    );
}

export default React.memo(Sidebar);

export function SidebarItem({ icon, text, href }: SidebarItemProps) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarItem must be used within a SidebarContext Provider");
    }

    const { activeItem, setActiveItem } = context;

    const handleClick = () => {
        setActiveItem(text);
    };

    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium dark:text-white rounded-md cursor-pointer transition-colors group ${
                activeItem === text
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-gray-600 dark:to-gray-500"
                    : "hover:bg-indigo-50 dark:hover:bg-gray-700 text-black"
            }`}
        >
            <Link href={href} onClick={handleClick} className="flex items-center w-full">
                {icon}
                <span className="overflow-hidden transition-all group-hover:w-52 w-0 ml-3">{text}</span>
            </Link>
        </li>
    );
}
