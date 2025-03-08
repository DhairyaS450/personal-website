/**
 * This script generates a valid admin token for testing and environment setup.
 * Run it with Node.js to get a token compatible with the authentication system.
 */

import crypto from 'crypto';

// Generate a JWT token similar to how it's done in auth/route.ts
function generateToken(username) {
  const payload = {
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days expiry
  };
  
  // Use the fallback secret key for consistency
  const jwtSecret = process.env.JWT_SECRET || 'your-fallback-secret-key';
  
  const token = crypto
    .createHmac('sha256', jwtSecret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return token;
}

// Generate token for admin user
const adminToken = generateToken('admin');

// Output the token and instructions
console.log('\nAdmin Token Generation Tool\n------------------------');
console.log('\nGenerated token:');
console.log(adminToken);
console.log('\nTo use this token, set it as an environment variable:');
console.log('\nFor Windows (Command Prompt):');
console.log(`set ADMIN_API_TOKEN=${adminToken}`);
console.log('\nFor Windows (PowerShell):');
console.log(`$env:ADMIN_API_TOKEN="${adminToken}"`);
console.log('\nFor .env file:');
console.log(`ADMIN_API_TOKEN=${adminToken}`);
console.log('\nYou can also set JWT_SECRET to "your-fallback-secret-key" for consistency:');
console.log('JWT_SECRET=your-fallback-secret-key'); 