import BookList from "./BookList";
import SearchBar from "./SearchBar";
import {useState} from "react";
function SearchPage() {
    const [books, setBooks] = useState();
    const handleSearchAuthor = (author) => {
        console.log("hi");
        fetch("http://localhost:3000/searchauthor?q=" + author)
            .then((response) => response.json())
            .then((data) => setBooks(data));   
        
    }

    const handleSearchSubject = (subject) => {
        fetch("http://localhost:3000/searchsubject?q=" + subject)
            .then((response) => response.json())
            .then((data) => setBooks(data));   
    }

    const handleSearchGeneral = (general) => {
        fetch("http://localhost:3000/searchgeneral?q=" + general)
            .then((response) => response.json())
            .then((data) => setBooks(data));   
    }
    return(
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '80px' }}>Bookpedia</p>
            <SearchBar onSearchAuthor = {handleSearchAuthor} onSearchSubject = {handleSearchSubject} onSeachGeneral = {handleSearchGeneral}/>
            <BookList/>
            {/* <Link to="/booklist" className="btn btn-primary">Book List</Link> */}
        </div>
    )
};

export default SearchPage;