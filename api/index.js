const express = require('express');

// Create express instance
const app = express();

// Require API routes
const books = require('./routes/books');

// Import API Routes
app.use(books);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
};
