/**
 * Simple Supabase connection test script
 * Run with: node scripts/test-supabase.js
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? '✅ Available' : '❌ Missing');
console.log('Supabase Key:', supabaseKey ? '✅ Available' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection by checking for our specific table
async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Try to directly check if our website_content table exists by querying it
    console.log('Checking for website_content table...');
    const { data, error } = await supabase
      .from('website_content')
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.error('❌ The website_content table does not exist! Please run the SQL setup script from SUPABASE_SETUP.md first.');
        console.error('Error details:', JSON.stringify(error, null, 2));
      } else {
        console.error('Error querying website_content table:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        console.log('This might be due to Row-Level Security settings.');
      }
      process.exit(1);
    }
    
    console.log('✅ Successfully connected to Supabase and found the website_content table!');
    console.log('Table data:', data);
    
    // Now try to perform a simple RLS test
    console.log('\nTesting write permissions (affected by Row-Level Security)...');
    const testObject = { 
      id: 999, 
      content: { test: 'This is a test' },
      updated_at: new Date().toISOString()
    };
    
    // We'll delete this test record after testing
    try {
      const { error: writeError } = await supabase
        .from('website_content')
        .upsert(testObject);
      
      if (writeError) {
        console.error('❌ Write test failed. This is likely due to Row-Level Security (RLS) settings.');
        console.error('Error details:', JSON.stringify(writeError, null, 2));
        console.log('\nYou need to add a Row-Level Security policy to allow writes. Add this SQL in Supabase:');
        console.log(`
CREATE POLICY "Allow inserts and updates with API key" 
  ON website_content 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
        `);
      } else {
        console.log('✅ Write test successful!');
        
        // Clean up our test record
        console.log('Cleaning up test data...');
        await supabase
          .from('website_content')
          .delete()
          .eq('id', 999);
        
        console.log('✅ Your Supabase setup appears to be working correctly!');
      }
    } catch (writeException) {
      console.error('Write test exception:', writeException);
    }
    
  } catch (e) {
    console.error('Test failed with exception:');
    console.error('Error name:', e.name);
    console.error('Error message:', e.message);
    console.error('Error stack:', e.stack);
    process.exit(1);
  }
}

testConnection(); 