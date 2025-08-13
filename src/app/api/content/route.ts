import { NextRequest, NextResponse } from 'next/server';
import { WebsiteContent } from '@/lib/supabase';
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server';

// GET: Fetch content
export async function GET() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching content:', error)
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      )
    }
    
    const content = data?.content as WebsiteContent | null

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
    // Validate user via Supabase session (cookies)
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

  // Check role placed in app_metadata (immutable by users) instead of user_metadata
  const isAdmin = (user.app_metadata?.role === 'admin') || false
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updatedContent = await request.json() as WebsiteContent

    if (!updatedContent || typeof updatedContent !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('website_content')
      .upsert({
        id: 1,
        content: updatedContent,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    )
  }
}