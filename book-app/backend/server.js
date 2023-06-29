import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint for searching books in general
app.get('/searchgeneral', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    // Make a GET request to the Open Library API
    axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=16`)
      .then(response => {
        const books = response.data.docs.map(book => {
          return {
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown',
            cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
            publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A'
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for books.' });
      });
  });

app.get('/searchauthor', (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the request query parameters
  let authorKey;
  let bookKeys = new Array(16);
  let books = [];

  // Make a GET request to the Open Library API to search for authors
  axios.get(`https://openlibrary.org/search/authors.json?q=${searchQuery}`)
    .then(response => {
      if (response.data.docs.length > 0) {
        authorKey = response.data.docs[0].key;

        // Make a GET request to the Open Library API to fetch the author's works using the author key
        axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=16`)
          .then(response => {
            for (let i = 0; i < 16; i++) {
              bookKeys[i] = response.data.entries[i].key.replace('/works/','');
            }

            // Make parallel requests to fetch details of each book using the book keys
            const bookPromises = bookKeys.map(bookKey =>
              axios.get(`https://openlibrary.org/search.json?q=${bookKey}&limit=1`)
            );

            // Wait for all book requests to complete
            Promise.all(bookPromises)
              .then(bookResponses => {
                books = bookResponses.map(bookResponse => {
                  const book = bookResponse.data.docs[0];

                  return {
                    title: book.title,
                    author: book.author_name ? book.author_name[0] : 'Unknown',
                    cover: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
                    publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A'
                  };
                });

                res.json(books); // Send the book search results as JSON response
              })
              .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'An error occurred while fetching book details.' });
              });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while searching for the author\'s works.' });
          });
      } else {
        res.status(404).json({ error: 'Author not found.' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for the author' });
    });
});


// Endpoint for searching books by subject
  app.get('/searchsubject', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request query parameters
  
    // Make a GET request to the Open Library API
    axios.get(`https://openlibrary.org/subjects/${searchQuery}.json?limit=16`)
      .then(response => {
        const books = response.data.works.map(book => {
          return {
            title: book.title,
            author: book.authors[0].name ? book.authors[0].name : 'Unknown',
            cover: book.cover_id ? `http://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : `http://lgimages.s3.amazonaws.com/nc-sm.gif`,
            publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A'
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for books.' });
      });
  });
  

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to parse JSON request bodies
app.use(express.json());

// Add a book to the reading list
app.post('/reading-list', async (req, res) => {
const { title, author, cover, year } = req.body;

try {
  // Insert the book into the 'reading_list' table
  const { data, error } = await supabase
    .from('reading_list')
    .insert([{ title, author, cover, year }]);

  if (error) {
    throw new Error(error.message);
  }

  res.json({ message: 'Book added to the reading list' });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred while adding the book to the reading list' });
}
});

// Get all books from the reading list
app.get('/reading-list', async (req, res) => {
try {
  // Fetch all books from the 'reading_list' table
  const { data, error } = await supabase.from('reading_list').select('*');

  if (error) {
    throw new Error(error.message);
  }

  res.json(data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'An error occurred while fetching the reading list' });
}
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
