import { useEffect, useState } from "react";

const SearchAuthor = ( author ) => {
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
    fetch(`https://openlibrary.org/search/authors.json?q=${author}`)
        .then((response) => response.json);
        const authorkey = docs[0].key;
    });

    useEffect(() => {
    fetch(`https://openlibrary.org/authors/${authorkey}/works.json?limit=4`)
        .then((response) => response.json);
        const bookkey = docs[count].key
        setCount(count + 1);
    });

    useEffect(() => {
    fetch(`https://openlibrary.org/${bookkey}`)
        .then((response) => response.json)
        .then((data) => setBooks(data));
    });

    return (
        <>
        <h2>{JSON.stringify(books)}</h2>
        </>
    )
};

export default SearchAuthor;