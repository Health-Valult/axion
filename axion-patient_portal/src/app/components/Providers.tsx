"use client"

import React, {useEffect} from "react";
import {LanguageProvider} from "@/app/components/LanguageContext";
import {DarkModeProvider} from "@/app/components/DarkModeContext";
import ApolloProviderWrapper from "@/lib/ApolloClient";
import {SessionProvider, useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

const publicRoutes = ['/auth', '/forgot-password'];

// Create an inner component that uses the useSession hook
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        // Check if there's a session error (like RefreshAccessTokenError)
        if (session?.error === 'RefreshAccessTokenError') {
            // Force sign in to resolve the refresh token issue
            router.push('/login?error=RefreshAccessTokenError');
        }
    }, [session, router]);

    useEffect(() => {
        // Adding a guard to prevent unnecessary redirects during initial loading
        if (status === 'loading') return;

        // Only perform redirects if the path has fully loaded
        if (!pathname) return;

        try {
            // Redirect to log in if unauthenticated and trying to access protected route
            if (status === 'unauthenticated' && !isPublicRoute) {
                router.push('/auth');
            }

            // Redirect to dashboard if authenticated and trying to access public route
            if (status === 'authenticated' && isPublicRoute) {
                router.push('/');
            }
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }, [status, router, isPublicRoute, pathname]);

    // Return children directly when the component renders
    return children;
};

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ApolloProviderWrapper>
                <DarkModeProvider>
                    <LanguageProvider>
                        <AuthWrapper>{children}</AuthWrapper>
                    </LanguageProvider>
                </DarkModeProvider>
            </ApolloProviderWrapper>
        </SessionProvider>
    );
}