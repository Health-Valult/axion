// File: app/api/proxy-report-upload/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reportType, sessionToken, reportData } = body;
    
    if (!reportType || !sessionToken || !reportData) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Make the actual request to the API
    const response = await fetch(
      `https://axiontestgateway.azure-api.net/records/records/upload/${reportType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(reportData),
      }
    );
    
    // Get the response data
    const responseData = await response.json().catch(() => ({}));
    
    // Return the original response status and data
    return NextResponse.json(
      responseData,
      { status: response.status }
    );
  } catch (error) {
    console.error('Proxy report upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}