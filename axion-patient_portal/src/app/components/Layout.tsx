"use client";

import React, { ReactNode } from "react";
import Sidebar, {SidebarItem} from "./SideBar";
import { LayoutDashboard, FileText, Pill } from "lucide-react";

interface ClientSidebarLayoutProps {
    children: ReactNode;
}

export default function SidebarLayout({ children }: ClientSidebarLayoutProps) {
    return (
        <div className="flex h-screen">
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard />} text="Dashboard" href="/" />
                <SidebarItem icon={<FileText />} text="Reports" href="/reports" />
                <SidebarItem icon={<Pill />} text="Medicines" href="/medicine" />
            </Sidebar>

            <div className="flex-1 p-8 bg-white overflow-auto">{children}</div>
        </div>
    );
}
