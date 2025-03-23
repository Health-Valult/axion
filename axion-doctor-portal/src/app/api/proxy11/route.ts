import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const apiUrl =
		'https://axiontestgateway.azure-api.net/records/records/add-prescription';

	try {
		const body = await request.json(); // Read the body from the incoming request

		// Extract token from the Authorization header
		const authHeader = request.headers.get('Authorization');

		if (!authHeader) {
			return NextResponse.json(
				{ error: 'Authorization header is required' },
				{ status: 400 }
			);
		}

		console.log('Proxying request to:', apiUrl);
		console.log('Using token for Bearer auth');

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: authHeader, // Use the full Authorization header as-is
			},
			body: JSON.stringify(body), // Forward the complete body
		});

		if (!response.ok) {
			console.error('API error:', response.status, response.statusText);
			const errorData = await response
				.json()
				.catch(() => ({ error: 'Unknown error' }));
			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error in proxy:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
