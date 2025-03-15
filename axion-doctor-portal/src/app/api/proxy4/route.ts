import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const apiUrl =
		'https://axiontestgateway.azure-api.net/axion/auth/login/doctor';

	try {
		const body = await request.json(); // Read the body from the incoming request

		console.log('Proxying request to:', apiUrl);
		console.log('Request body:', body);

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(body), // Forward the body as it is
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
