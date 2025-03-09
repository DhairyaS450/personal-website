import { createClient } from '@supabase/supabase-js';

// These values will be replaced with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definition for our website content
export type WebsiteContent = {
  projects: Project[];
  academicAchievements: Achievement[];
  extracurricularActivities: Activity[];
  files: File[];
  aboutMe: AboutMe;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
};

export type Achievement = {
  title: string;
  description: string;
  year: string;
};

export type Activity = {
  title: string;
  description: string;
  period: string;
};

export type File = {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
};

export type AboutMe = {
  paragraphs: string[];
}; 