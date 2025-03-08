import { NextRequest, NextResponse } from 'next/server';

// Get the admin token from environment or use a fallback
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // In a real app, this would validate against a database
    // using proper password hashing
    const adminPassword = process.env.ADMIN_PASSWORD || 'dhairya2025';
    
    console.log('Validating password...');
    
    if (password === adminPassword) {
      console.log('Password valid, returning token');
      
      // Return the direct token value
      return NextResponse.json({
        success: true,
        token: ADMIN_TOKEN,
      });
    }
    
    console.log('Invalid password attempt');
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 