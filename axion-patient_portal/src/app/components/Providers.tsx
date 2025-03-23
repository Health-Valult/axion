"use client"

import React from "react";
import {LanguageProvider} from "@/app/components/LanguageContext";
import {DarkModeProvider} from "@/app/components/DarkModeContext";
import ApolloProviderWrapper from "@/lib/ApolloClient";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProviderWrapper>
            <DarkModeProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </DarkModeProvider>
        </ApolloProviderWrapper>
    );
}