import fetch from 'node-fetch';

export async function POST(request: Request) {
    const apiUrl = "https://axiontestgateway.azure-api.net/axion/auth/logout";

    try {
        const authorizationHeader = request.headers.get('Authorization') || '';

        const sessionToken = authorizationHeader.startsWith('Bearer ')
            ? authorizationHeader.slice(7)
            : '';

        if (!sessionToken) {
            return new Response(JSON.stringify({ error: 'Authorization token is missing or invalid' }), { status: 400 });
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in logout-proxy:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
