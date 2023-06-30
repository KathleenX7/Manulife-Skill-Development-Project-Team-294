import BookList from "./BookList";
import SearchBar from "./SearchBar";
import {useState} from "react";
function SearchPage({goToReading}) {
    const [books, setBooks] = useState([]);
    const handleSearchAuthor = (author) => {
        
        fetch("/searchauthor?q=" + author)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }

    const handleSearchSubject = (subject) => {
        
        fetch("/searchsubject?q=" + subject)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }

    const handleSearchGeneral = (general) => {
        fetch("/searchgeneral?q=" + general)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.log(error));
    }
    return(
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '80px' }}>Bookpedia</p>
            <button className = "goReading-btn" onClick = {goToReading}>GO TO READING LIST</button>

            <SearchBar onSearchAuthor = {handleSearchAuthor} onSearchSubject = {handleSearchSubject} onSearchGeneral = {handleSearchGeneral}/>
             <BookList data = {books}/>
            {/* <Link to="/booklist" className="btn btn-primary">Book List</Link> */}
        </div>
    )
};

export default SearchPage;