// Custom type declarations to patch Next.js types for compatibility

// Override Next.js page props to prevent type errors during build
declare namespace NextJS {
  interface PageProps {
    params?: any;
    searchParams?: any;
  }
} 