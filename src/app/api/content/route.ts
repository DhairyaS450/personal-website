import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteContent, updateWebsiteContent } from '@/lib/supabaseUtils';
import { WebsiteContent } from '@/lib/supabase';

// Get the admin token from environment or use a fallback
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'fallback-admin-token-12345';

// Simple token validation
function validateToken(token: string): boolean {
  // Simple direct comparison
  console.log('TOKEN DEBUG:');
  console.log(`- Expected token: "${ADMIN_TOKEN}"`);
  console.log(`- Received token: "${token}"`);
  console.log(`- Lengths: expected=${ADMIN_TOKEN.length}, received=${token.length}`);
  console.log(`- Are identical: ${ADMIN_TOKEN === token}`);
  
  const isValid = token === ADMIN_TOKEN;
  console.log(`Token validation result: ${isValid ? 'valid' : 'invalid'}`);
  return isValid;
}

// GET: Fetch content
export async function GET() {
  try {
    const content = await getWebsiteContent();
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT: Update content
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Received token for validation');
    
    // Use the token validation function
    if (!validateToken(token)) {
      console.log('Token validation failed');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    console.log('Token validated successfully, processing content update');
    const updatedContent = await request.json() as WebsiteContent;
    
    // Validate the content structure
    if (!updatedContent || typeof updatedContent !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }
    
    const success = await updateWebsiteContent(updatedContent);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      );
    }
    
    console.log('Content updated successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
} 