import { createClient } from '@supabase/supabase-js';

// These values will be replaced with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definition for blog posts
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  published: boolean;
};

// Type definition for home page content
export type HomeContent = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  featuredProjects: {
    heading: string;
    subheading: string;
    projectIds: number[];
  };
};

// Type definition for education
export type Education = {
  institution: string;
  degree: string;
  period: string;
  description?: string;
};

// Type definition for collaborations
export type Collaboration = {
  title: string;
  period: string;
  organization: string;
  description: string[];
};

// Type definition for volunteer experiences
export type VolunteerExperience = {
  title: string;
  period: string;
  description: string[];
};

// Type definition for our website content
export type WebsiteContent = {
  projects: Project[];
  academicAchievements: Achievement[];
  extracurricularActivities: Activity[];
  files: File[];
  aboutMe: AboutMe;
  // Add optional fields for the other content types
  blogPosts?: BlogPost[];
  home?: HomeContent;
  collaborations?: Collaboration[];
  volunteering?: VolunteerExperience[];
  education?: Education[];
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