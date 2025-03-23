import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const apiUrl =
		'https://axiontestgateway.azure-api.net/records/records/prescription/symptoms-signs';

	try {
		// Get the authorization header from the incoming request
		const authHeader = request.headers.get('Authorization');

		if (!authHeader) {
			return NextResponse.json(
				{ error: 'Authorization header is missing' },
				{ status: 401 }
			);
		}

		console.log('Proxying request to:', apiUrl);

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: authHeader,
			},
			// No body for GET request
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
