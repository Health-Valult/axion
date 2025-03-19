export async function POST(request: Request) {
    try {
        const authorizationHeader = request.headers.get('Authorization') || '';
        const sessionToken = authorizationHeader.startsWith('Bearer ')
            ? authorizationHeader.slice(7)
            : '';

        if (!sessionToken) {
            return new Response(
                JSON.stringify({ error: 'Authorization token is missing or invalid' }),
                { status: 400 }
            );
        }

        const body = await request.json();
        const { query, variables } = body;

        if (!query) {
            return new Response(
                JSON.stringify({ error: 'GraphQL query is missing' }),
                { status: 400 }
            );
        }

        const response = await fetch('https://axiontestgateway.azure-api.net/records-patients', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            console.error('GraphQL API Error:', response.status, await response.text());
            return new Response(
                JSON.stringify({ error: 'Failed to fetch GraphQL data' }),
                { status: response.status }
            );
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in GraphQL proxy:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
