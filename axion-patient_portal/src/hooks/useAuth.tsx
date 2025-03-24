import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if both tokens are available in localStorage
        const sessionToken = sessionStorage.getItem("session_token");
        const refreshToken = sessionStorage.getItem("refresh_token");

        if (sessionToken && refreshToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking auth status
    }

    if (!isAuthenticated) {
        router.push("/auth"); // Redirect to login if not authenticated
        return null;
    }

    return isAuthenticated;
};

export default useAuth;
