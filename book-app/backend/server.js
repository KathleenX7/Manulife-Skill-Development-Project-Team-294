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

app.get('/searchauthor', (req, res) => {
  const searchQuery = req.query.q; // Get the search query from the request query parameters
  let authorKey;
  let authorName;
  let bookKeys = new Array(4);
  let books = [];

  // Make a GET request to the Open Library API to search for authors
  axios.get(`https://openlibrary.org/search/authors.json?q=${searchQuery}`)
    .then(response => {
      if (response.data.docs.length > 0) {
        authorKey = response.data.docs[0].key;
        authorName = response.data.docs[0].name;

        // Make a GET request to the Open Library API to fetch the author's works using the author key
        axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=4`)
          .then(response => {
            for (let i = 0; i < 4; i++) {
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
                    publicationDate: book.first_publish_year ? `First published in ${book.first_publish_year}` : 'No publication year available'
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
