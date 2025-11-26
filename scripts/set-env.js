const fs = require('fs');
const path = require('path');

// Load API key from Vercel/System environment variables
const apiKey = process.env.API_KEY || '';

// Define paths
const envDirectory = path.join(__dirname, '../src/environments');
const targetPath = path.join(envDirectory, 'environment.ts');
const targetPathProd = path.join(envDirectory, 'environment.prod.ts');

// Ensure the directory exists
if (!fs.existsSync(envDirectory)) {
  fs.mkdirSync(envDirectory, { recursive: true });
}

// Create the content
const envFileContent = `
export const environment = {
   production: true,
   apiKey: '${apiKey}'
};
`;

// Write the files
fs.writeFileSync(targetPath, envFileContent);
fs.writeFileSync(targetPathProd, envFileContent);

console.log(`Angular environment file generated correctly at ${targetPath}`);