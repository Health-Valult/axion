import fetch from 'node-fetch';

export async function POST(request: Request) {
    const apiUrl = `https://axiontestgateway.azure-api.net/axion/user/reset-password`;

    try {
        const body = await request.json(); // Read the body from the incoming request

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('session_token')}`,
            },
            body: JSON.stringify(body), // Forward the body as it is
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in proxy:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
