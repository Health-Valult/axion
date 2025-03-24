import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        console.log("Request body:", body);

        const response = await fetch("https://axiontestgateway.azure-api.net/axion/auth/signup/hospital-staff", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log("Response status:", response.status);
        
        const data = await response.json();
        console.log("Response data:", data);
        
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error:any) {
        console.error('Error in registration:', error);
        return new Response(JSON.stringify({ 
            error: 'Server error', 
            message: error.message || 'An unexpected error occurred'
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}