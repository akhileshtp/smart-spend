const fs = require('fs');
const path = require('path');

// Load API key from Vercel/System environment variables
const apiKey = process.env.API_KEY || '';

const targetPath = path.join(__dirname, '../src/environments/environment.ts');
const targetPathProd = path.join(__dirname, '../src/environments/environment.prod.ts');

const envFileContent = `
export const environment = {
   production: true,
   apiKey: '${apiKey}'
};
`;

// Write the file
fs.writeFileSync(targetPath, envFileContent);
fs.writeFileSync(targetPathProd, envFileContent);

console.log(`Angular environment file generated correctly at ${targetPath}`);
