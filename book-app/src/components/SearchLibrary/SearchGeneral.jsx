import {useState, useEffect} from "react";

const SearchGeneral = ( general ) => {
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
    fetch(`https://openlibrary.org/search.json?q=${general}?key=4`)
        .then((response) => response.json)
        const bookkey = docs[0].key;
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

export default SearchGeneral;