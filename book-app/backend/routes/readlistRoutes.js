// Import the necessary modules and models
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Readlist = require('../models/readlist');

// Define a route for getting the Readlist
router.get('/', async (req, res) => {
  try {
    // Fetch the Readlist from the database
    const readlist = await Readlist.findOne({});
    
    // Send the Readlist as the response
    res.status(200).json(readlist);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
});

// Define a route for adding a book to the Readlist
router.post('/', async (req, res) => {
  try {
    const { title, author, publicationDate } = req.body;

    // Find the Readlist document and update the books array with the new book
    const updatedReadlist = await Readlist.findOneAndUpdate(
      {},
      { $push: { books: { title, author, publicationDate } } },
      { new: true }
    );

    // Send a success response with the updated Readlist
    res.status(201).json(updatedReadlist);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
});

// Define a route for searching books using the Open Library API
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Make a GET request to the Open Library API
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
    const { docs } = response.data;

    // Extract the necessary book details from the response
    const books = docs.map((doc) => {
      const { title, author_name, first_publish_year } = doc;
      return {
        title,
        author: author_name ? author_name[0] : 'Unknown',
        // you need the cover_i her right?
        publicationDate: first_publish_year ? first_publish_year.toString() : 'Unknown',
      };
    });

    // Send the book search results as the response
    res.status(200).json(books);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
