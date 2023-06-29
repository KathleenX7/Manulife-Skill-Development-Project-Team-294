import BookList from "./BookList";
import SearchBar from "./SearchBar";
import {useState} from "react";
function SearchPage({goToReading}) {
    const [books, setBooks] = useState([]);
    const [addBook, setAddedBook] = useState("");
    const handleSearchAuthor = (author) => {
        
        fetch("http://localhost:3000/searchauthor?q=" + author)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }

    const handleSearchSubject = (subject) => {
        
        fetch("http://localhost:3000/searchsubject?q=" + subject)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }

    const handleSearchGeneral = (general) => {
        fetch("http://localhost:3000/searchgeneral?q=" + general)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }
    const handleAddBook = (title) => {
        setAddedBook(title);
    }
    return(
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '80px' }}>Bookpedia</p>
            <button className = "goReading-btn" onClick = {goToReading}>GO TO READING LIST</button>

            <SearchBar onSearchAuthor = {handleSearchAuthor} onSearchSubject = {handleSearchSubject} onSearchGeneral = {handleSearchGeneral}/>
            {addBook == ""? "":<p className = "searchBar-searchBy"> {addBook} added to reading list" </p>}
             <BookList data = {books} addedBook = {handleAddBook}/>
            {/* <Link to="/booklist" className="btn btn-primary">Book List</Link> */}
        </div>
    )
};

export default SearchPage;