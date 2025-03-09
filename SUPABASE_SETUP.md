# Migrating to Supabase Database

This guide will help you set up Supabase for your personal website, replacing the local file-based data store with a cloud database that works well with Vercel deployments.

## Why Supabase?

Vercel's serverless functions run in a read-only filesystem environment, which prevents writing to local files. Supabase offers a PostgreSQL database with a simple REST API that works perfectly with Vercel deployments.

## Setup Steps

### 1. Create a Supabase Account and Project

1. Go to [supabase.com](https://supabase.com/) and sign up for an account
2. Create a new project and note down the project URL and anon key
3. Set a secure database password

### 2. Create the Database Table

1. In your Supabase dashboard, go to the SQL Editor
2. Run the following SQL to create the website_content table:

```sql
CREATE TABLE website_content (
  id BIGINT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial empty structure
INSERT INTO website_content (id, content)
VALUES (
  1, 
  '{
    "projects": [],
    "academicAchievements": [],
    "extracurricularActivities": [],
    "files": [],
    "aboutMe": {
      "paragraphs": []
    }
  }'
);
```

### 3. Set Up Row-Level Security (Optional but Recommended)

For better security, you can set up row-level security policies:

```sql
-- Enable RLS
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read
CREATE POLICY "Allow public read access" 
  ON website_content 
  FOR SELECT 
  USING (true);

-- If you set up Supabase Auth later, you can restrict updates
-- to authenticated users with a specific role
```

### 4. Configure Environment Variables

1. In your local development environment, update your `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. In your Vercel dashboard, go to your project's settings, then to the "Environment Variables" section, and add the same variables.

### 5. Initialize Your Database

To initialize your database with your current content:

1. Start your development server locally
2. Log in to your admin panel
3. Make a small change and save to initialize the database with your content

## Importing Existing Data

If you have existing content in the `content/data.json` file, you can import it by:

1. Run your site locally
2. Log in to the admin panel
3. The system will automatically load data from the JSON file if the database is empty
4. Edit and save to ensure it's stored in Supabase

## Troubleshooting

If you encounter issues:

1. Check your browser console for errors
2. Verify your environment variables are correctly set
3. Check the Supabase dashboard for successful API calls
4. Ensure your database table is correctly set up

## Advanced Configuration

For more advanced setups (multiple admins, file uploads, etc.), consider:

1. Setting up Supabase Auth for proper authentication
2. Using Supabase Storage for file uploads
3. Creating more granular database tables for different content types 