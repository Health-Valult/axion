import fetch from 'node-fetch';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const authorizationHeader = request.headers.get('Authorization') || '';

        const sessionToken = authorizationHeader.startsWith('Bearer ')
            ? authorizationHeader.slice(7)
            : '';

        if (!sessionToken) {
            return new Response(JSON.stringify({ error: 'Authorization token is missing or invalid' }), { status: 400 });
        }

        const response = await fetch("https://axiontestgateway.azure-api.net/axion/user/reset-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in reset-password:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
