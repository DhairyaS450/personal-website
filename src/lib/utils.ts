/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generates a slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start
    .replace(/-+$/, ''); // Trim hyphens from end
}

/**
 * Formats a string to title case
 * @param text - The text to convert to title case
 * @returns Title cased text
 */
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - The maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Calculates estimated reading time for text
 * @param text - The text content
 * @param wordsPerMinute - Words per minute reading rate (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): string {
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
} 