// Import necessary modules
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const readlistRoutes = require('./routes/readlistRoutes');

// Create an Express app
const app = express();

// Connect to the MongoDB database
const mongoURL = 'mongodb://localhost:27017/book-app';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes for the Readlist
app.use('/readlist', readlistRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
