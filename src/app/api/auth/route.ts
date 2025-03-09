import { NextRequest, NextResponse } from 'next/server';
import { validateAdmin } from '@/lib/supabaseUtils';

// Get the admin token from environment or use a fallback
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    console.log('Validating password...');
    
    const token = await validateAdmin(password);
    
    if (token) {
      console.log('Password valid, returning token');
      
      // Return the token
      return NextResponse.json({
        success: true,
        token: token,
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