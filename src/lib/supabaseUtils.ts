import { supabase, WebsiteContent } from './supabase';

/**
 * Fetch the entire website content from Supabase
 */
export async function getWebsiteContent(): Promise<WebsiteContent | null> {
  try {
    // Fetch the content record - we'll store the entire data object in a single record
    // with a known ID for simplicity
    const { data, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error) {
      console.error('Error fetching content:', error);
      return null;
    }
    
    return data?.content || null;
  } catch (error) {
    console.error('Error in getWebsiteContent:', error);
    return null;
  }
}

/**
 * Update the entire website content in Supabase
 */
export async function updateWebsiteContent(content: WebsiteContent): Promise<boolean> {
  try {
    // Update the content record with new data
    const { error } = await supabase
      .from('website_content')
      .upsert({ 
        id: 1, // Always use ID 1 for our content record
        content: content,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error updating content:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateWebsiteContent:', error);
    return false;
  }
}

// Legacy validateAdmin removed: use Supabase Auth instead.