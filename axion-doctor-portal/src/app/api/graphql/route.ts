import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This function handles both GET and POST requests to proxy GraphQL operations
export async function POST(request: NextRequest) {
	const apiUrl = 'https://axiontestgateway.azure-api.net/records-doctor';

	try {
		// Get the session token from cookies
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session')?.value;

		if (!sessionToken) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Read the body from the incoming request (GraphQL query/mutation)
		const body = await request.json();

		console.log('Proxying GraphQL request to:', apiUrl);
		console.log(
			'Request operation:',
			body.operationName || 'unnamed operation'
		);

		// Forward the request to the API with authorization
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${sessionToken}`,
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			console.error(
				'GraphQL API error:',
				response.status,
				response.statusText
			);

			// Try to parse the error response
			const errorData = await response.json().catch(() => ({
				errors: [{ message: 'Unknown GraphQL error' }],
			}));

			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error in GraphQL proxy:', error);
		return NextResponse.json(
			{
				errors: [{ message: 'Server error in GraphQL proxy' }],
			},
			{ status: 500 }
		);
	}
}

// Also allow GET requests for schema introspection
export async function GET() {
	const apiUrl = 'https://axiontestgateway.azure-api.net/records-doctor';

	try {
		// Get the session token from cookies
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get('session')?.value;

		if (!sessionToken) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Forward the GET request with authorization
		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${sessionToken}`,
			},
		});

		if (!response.ok) {
			console.error(
				'GraphQL API error:',
				response.status,
				response.statusText
			);
			return NextResponse.json(
				{ error: 'Error from GraphQL endpoint' },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error in GraphQL proxy:', error);
		return NextResponse.json(
			{ error: 'Server error in GraphQL proxy' },
			{ status: 500 }
		);
	}
}
