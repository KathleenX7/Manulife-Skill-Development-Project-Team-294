import ReadingBook from "./ReadingBook";
import { useEffect, useState } from "react";
function ReadingPage({goToSearch}) {
    const [books, setBooks] = useState([]);

    useEffect(() => { //pull reading list, idk if you want to do it once or not
        fetch("http://localhost:3000/reading-list")
            .then((response) => response.json())
            .then((data) => setBooks(data));   
    }, []);
    const handleRemoveReading = (book) => {
        console.log("remove" + book.title);
        // delete from reading, the book is the one clicked
    }
    return(
        <div style = {{textAlign: 'center'}}>
            <p style={{ fontSize: '80px' }}>Bookpedia Reading List</p>
            <button className = "goReading-btn" onClick = {goToSearch}>GO TO SEARCH LIST</button>

            <div className = "bookListFlex">
                {books?.map((book) => (
                    <ReadingBook key = {book.title + " " + book.year} removeFromReading = {handleRemoveReading} data = {book}/>
                ))}
            </div>
        </div>
        
    )
}

export default ReadingPage;