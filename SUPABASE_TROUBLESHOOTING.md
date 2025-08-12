# Supabase Migration Troubleshooting

If you're experiencing issues with the migration to Supabase, here are some common problems and solutions.

## Empty Error Object

If you see `Error uploading content to Supabase: {}` or an empty error object, this generally indicates one of these issues:

1. **Database Table Doesn't Exist**: The most common issue. Make sure you've created the `website_content` table in Supabase.

   ```sql
   CREATE TABLE website_content (
     id BIGINT PRIMARY KEY,
     content JSONB NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Row-Level Security (RLS) Blocking Access**: Supabase enables Row-Level Security by default, which might block your operations.

   - Check if RLS is enabled on your table: Go to your Supabase dashboard > Table Editor > website_content > RLS
   - If it's enabled, add a policy to allow inserts/updates:

   ```sql
   -- Enable RLS
   ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

   -- Allow inserts and updates using your API key
   CREATE POLICY "Allow all operations with API key"
     ON website_content
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

3. **Invalid Supabase Credentials**: Verify your `.env.local` file has the correct values:

   - Make sure there are no trailing spaces or quotes in your environment variables
   - The URL should look like: `https://[project-ref].supabase.co`
  - The publishable key should start with "eyJ..."

4. **Network Issues**: If you're behind a firewall or proxy, it might be blocking connections to Supabase.

## Testing Your Supabase Connection

You can run this small test script to verify your Supabase connection:

```javascript
// test-supabase.js
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('Supabase URL:', supabaseUrl ? '✅ Available' : '❌ Missing');
console.log('Supabase Key:', supabaseKey ? '✅ Available' : '❌ Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection by listing all tables
async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // This query lists information about all tables
    const { data, error } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (error) {
      console.error('Connection test failed:', error);
      return;
    }
    
    console.log('Connection successful!');
    console.log('Available tables:', data.map(row => row.tablename));
  } catch (e) {
    console.error('Test failed with exception:', e);
  }
}

testConnection();
```

Run this with `node test-supabase.js` to verify your connection.

## Website Content JSON Format

Make sure your content JSON has the expected structure:

```json
{
  "projects": [ /* project objects */ ],
  "academicAchievements": [ /* achievement objects */ ],
  "extracurricularActivities": [ /* activity objects */ ],
  "files": [ /* file objects */ ],
  "aboutMe": {
    "paragraphs": [ /* paragraph strings */ ]
  }
}
```

## Step-by-Step Verification

1. **Verify Supabase Project**: Make sure you've created a Supabase project
2. **Check SQL Setup**: Run the SQL commands from the SUPABASE_SETUP.md file
3. **Verify Environment Variables**: Double-check your `.env.local` file
4. **Check Permissions**: Make sure your API keys have the necessary permissions
5. **Try a Simple Operation**: Try a simple read operation first to verify connectivity

If you're still experiencing issues, please update the migration script to log more detailed error information, as shown in the improved script. 