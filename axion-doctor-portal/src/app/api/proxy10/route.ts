// app/api/rxnav/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('name');

	if (!query) {
		return NextResponse.json(
			{ error: 'Drug name query parameter is required' },
			{ status: 400 }
		);
	}

	const apiUrl = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(
		query
	)}`;

	try {
		console.log('Proxying request to:', apiUrl);

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
			cache: 'no-store', // Don't cache the response
		});

		if (!response.ok) {
			console.error(
				'RxNav API error:',
				response.status,
				response.statusText
			);

			const errorData = await response
				.json()
				.catch(() => ({ error: 'Unknown error' }));

			return NextResponse.json(errorData, { status: response.status });
		}

		const data = await response.json();

		// You can process the data here if needed before returning
		// For example, extract only the medicine names and RxCUIs
		let processedData: any = [];

		if (data?.drugGroup?.conceptGroup) {
			data.drugGroup.conceptGroup.forEach((group: any) => {
				if (group.conceptProperties) {
					processedData = [
						...processedData,
						...group.conceptProperties.map((prop: any) => ({
							rxcui: prop.rxcui,
							name: prop.name,
							synonym: prop.synonym || '',
							tty: prop.tty || '',
						})),
					];
				}
			});
		}

		return NextResponse.json(processedData, { status: 200 });
	} catch (error) {
		console.error('Error in RxNav proxy:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
