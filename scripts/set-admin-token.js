/**
 * Simple script to set admin token for testing
 * Run with: node scripts/set-admin-token.js
 */

// Default fallback token that matches the one in the code
const DEFAULT_TOKEN = 'fallback-admin-token-12345';

// Get the token from environment or use the default
const adminToken = process.env.ADMIN_API_TOKEN || DEFAULT_TOKEN;

// Show instructions for setting the token
console.log('\nAdmin Token Setup\n---------------');
console.log('\nCurrent token (use this for authentication):');
console.log(adminToken);

console.log('\nTo set this token in your environment:');
console.log('\nFor Windows (Command Prompt):');
console.log(`set ADMIN_API_TOKEN=${adminToken}`);

console.log('\nFor Windows (PowerShell):');
console.log(`$env:ADMIN_API_TOKEN="${adminToken}"`);

console.log('\nFor .env.local file (create this file in your project root):');
console.log(`ADMIN_API_TOKEN=${adminToken}`);

console.log('\nMake sure both your auth and content API routes use the same token value.');
console.log('After setting the environment variable, restart your development server.'); 