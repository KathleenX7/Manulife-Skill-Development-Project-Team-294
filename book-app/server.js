import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static('dist'));

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
            publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A',
            editions: book.edition_count ? `${book.edition_count}` : '1',
            pages: book.number_of_pages_median ? `${book.number_of_pages_median}` : "Unknown",
            ratings: book.ratings_average ? `${book.ratings_average}` : "N/A",
            bookId: book.key.replace('/works/','')
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
                    publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A',
                    editions: book.edition_count ? `${book.edition_count}` : '1',
                    pages: book.number_of_pages_median ? `${book.number_of_pages_median}` : "Unknown",
                    ratings: book.ratings_average ? `${book.ratings_average}` : "N/A",
                    bookId: book.key.replace('/works/','')
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
            publicationDate: book.first_publish_year ? `${book.first_publish_year}` : 'N/A',
            editions: book.edition_count ? `${book.edition_count}` : '1',
            pages: book.number_of_pages_median ? `${book.number_of_pages_median}` : "Unknown",
            ratings: book.ratings_average ? `${book.ratings_average}` : "N/A",
            bookId: book.key.replace('/works/','')
          };
        });
        res.json(books); // Send the book search results as JSON response
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for books.' });
      });
  });
  

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config;

const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = "https://nqkfueqxtghxwpknupfg.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xa2Z1ZXF4dGdoeHdwa251cGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwMDg2ODksImV4cCI6MjAwMzU4NDY4OX0.R-vrDJuTOBSAFsuTCsL2DlPR3vYDDJ0IlTcxTiyJ9rY"
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to parse JSON request bodies
app.use(express.json());

// Add a book to the reading list
app.post('/reading-list', async (req, res) => {
const { title, author, cover, year, bookId} = req.body;

try {
  // Check if the book with the given bookId already exists in the reading list
  const { data: existingBook, error: existingBookError } = await supabase
  .from('reading_list')
  .select('*')
  .eq('bookId', bookId);

  if (existingBookError) {
    throw new Error(existingBookError.message)
  }

  // If the book already exists, return an error response
  if (existingBook && existingBook.length > 0) {
    return res.status(400).json({ error: 'Book with the same bookId already exists' });
  }

  // Insert the book into the 'reading_list' table
  const { data: addbook, error: addBookError } = await supabase
    .from('reading_list')
    .insert([{ title, author, cover, year, bookId }]);

  if (addBookError) {
    throw new Error(addBookError.message);
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


//Deleting books from reading list
app.delete('/reading-list/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    
    const { data, error } = await supabase
      .from('reading_list')
      .delete()
      .eq('bookId', bookId);

    if (error) {
      throw new Error(error.message);
    }

    res.json({ message: 'Book removed from the reading list' });
  } catch (error) {
    console.error(error); // Optional: Handle error response
    res.status(500).json({ error: 'Failed to remove book from the reading list' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
