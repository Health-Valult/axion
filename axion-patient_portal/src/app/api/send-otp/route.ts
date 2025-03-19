import fetch from 'node-fetch';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch("https://axiontestgateway.azure-api.net/axion/auth/send/otp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        console.error('Error in send-otp:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
