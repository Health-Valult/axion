import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {

    try {
        const body = await request.json();
        const authorizationHeader = request.headers.get('Authorization') || '';

        const sessionToken = authorizationHeader.startsWith('Bearer ')
            ? authorizationHeader.slice(7)
            : '';

        if (!sessionToken) {
            return new Response(JSON.stringify({ error: 'Authorization token is missing or invalid' }), { status: 400 });
        }
        console.log("Request body:", body);

        const response = await fetch("https://axiontestgateway.azure-api.net/records/records/get-patient-details", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${sessionToken}',
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

// import { NextRequest } from "next/server";

// export async function GET(request:NextRequest) {
//     try {
//         const authorizationHeader = request.headers.get('Authorization') || '';

//         const sessionToken = authorizationHeader.startsWith('Bearer ')
//             ? authorizationHeader.slice(7)
//             : '';

//         if (!sessionToken) {
//             return new Response(JSON.stringify({ error: 'Authorization token is missing or invalid' }), { status: 400 });
//         }


//         const response = await fetch("https://axiontestgateway.azure-api.net/records/records/get-patient-details", {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${sessionToken}`,
//             },
            
//         });

//         console.log("Response status:", response.status);
        
//         const data = await response.json();
//         console.log("Response data:", data);
        
//         return new Response(JSON.stringify(data), {
//             status: response.status,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error:any) {
//         console.error('Error in registration:', error);
//         return new Response(JSON.stringify({ 
//             error: 'Server error', 
//             message: error.message || 'An unexpected error occurred'
//         }), { 
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }