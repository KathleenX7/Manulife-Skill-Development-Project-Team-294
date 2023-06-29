import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;


// Endpoint for searching books in general
app.get('/searchgeneral', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    // Make a GET request to the Open Library API
    axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=4`)
      .then(response => {
        const books = response.data.docs.map(book => {
          return {
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown',
            cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
            publicationDate: book.first_publish_year ? `First published in ${book.first_publish_year}` : 'No publication year available'
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for books.' });
      });
  });

  // Endpoint for searching books by author
  app.get('/searchauthor', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    // Make a GET request to the Open Library API
    axios.get(`https://openlibrary.org/search/authors.json?q=${searchQuery}`)
      .then(response => {
        const authorkey = response.data.docs.key
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for the author' });
      });

      axios.get(`https://openlibrary.org/authors/${authorkey}/works.json?limit=4`)
      .then(response => {
          const books = response.data.docs.map(book => {
          return {
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown',
            cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
            publicationDate: book.first_publish_year ? `First published in ${book.first_publish_year}` : 'No publication year available'
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
  });

// Endpoint for searching books by subject
  app.get('/searchsubject', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    // Make a GET request to the Open Library API
    axios.get(`https://openlibrary.org/subjects/${subject}.json?limit=4`)
      .then(response => {
        const books = response.data.docs.map(book => {
          return {
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown',
            cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
            publicationDate: book.first_publish_year ? `First published in ${book.first_publish_year}` : 'No publication year available'
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for books.' });
      });
  });
  
  // Endpoint for adding a book to the readlist
  app.post('/readlist', (req, res) => {
    const book = req.body; // Assuming the request body contains the book object to be added to the readlist
  
    // Save the book to the readlist (you can use a database or any other storage mechanism)
    // For simplicity, we'll assume there's an array to store the readlist
    readlist.push(book);
  
    res.status(201).json({ message: 'Book added to readlist successfully.' });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
