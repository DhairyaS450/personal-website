/**
 * Migrates existing data from content/data.json to Supabase
 * 
 * Run with: node scripts/migrate-to-supabase.js
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup environment variables
dotenv.config({ path: '.env.local' });

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL available:', !!supabaseUrl);
console.log('Supabase Key available:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// File path
const contentFilePath = path.join(process.cwd(), 'content', 'data.json');

// Function to test if the table exists and ensure it's set up correctly
async function ensureTableExists() {
  console.log('Checking if website_content table exists...');
  try {
    const { data, error } = await supabase
      .from('website_content')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116') {
        console.error('The website_content table does not exist. Attempting to create it...');
        
        // Try to create the table with RLS policy
        const { error: createError } = await supabase.rpc('create_website_content_table');
        
        if (createError) {
          console.error('Failed to create table via RPC. You need to manually create the table.');
          console.error('Please run this SQL in your Supabase SQL Editor:');
          console.log(`
CREATE TABLE IF NOT EXISTS website_content (
  id BIGINT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Create policy for all operations
CREATE POLICY "Allow all operations with anon key" 
  ON website_content 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
          `);
          return false;
        } else {
          console.log('Successfully created website_content table!');
          return true;
        }
      } else {
        console.error('Error checking table:', error);
        return false;
      }
    }
    
    console.log('website_content table exists!');
    return true;
  } catch (e) {
    console.error('Exception checking table:', e);
    return false;
  }
}

async function migrateData() {
  try {
    // Check if the file exists
    if (!fs.existsSync(contentFilePath)) {
      console.error('Content file not found. Please ensure content/data.json exists.');
      process.exit(1);
    }

    // Read the file
    console.log('Reading content file...');
    const contentJson = fs.readFileSync(contentFilePath, 'utf-8');
    const content = JSON.parse(contentJson);

    // Check if content is valid
    if (!content || typeof content !== 'object') {
      console.error('Invalid content format in JSON file.');
      process.exit(1);
    }

    // Ensure the table exists
    const tableReady = await ensureTableExists();
    if (!tableReady) {
      console.error('Cannot proceed without a properly configured table.');
      process.exit(1);
    }
    
    console.log('Uploading content to Supabase...');
    
    // Insert/update the content in Supabase
    const { data, error } = await supabase
      .from('website_content')
      .upsert({ 
        id: 1,
        content,
        updated_at: new Date().toISOString()
      });

    if (error) {
      if (error.code === '42501') {
        console.error('Permission denied. This is likely due to Row-Level Security (RLS) settings.');
        console.error('You need to add a Row-Level Security policy to allow writes. Add this SQL in Supabase:');
        console.log(`
CREATE POLICY "Allow inserts and updates with API key" 
  ON website_content 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
        `);
      } else {
        console.error('Error uploading content to Supabase:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Full error object:', JSON.stringify(error, null, 2));
      }
      process.exit(1);
    }

    console.log('Migration completed successfully! Your data is now in Supabase.');
    console.log('Data response:', data);
  } catch (error) {
    console.error('Migration failed with exception:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Run the migration
migrateData(); 