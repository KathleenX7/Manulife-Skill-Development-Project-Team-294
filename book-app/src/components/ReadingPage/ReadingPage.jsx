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
        fetch(`http://localhost:3000/reading-list/${book.bookId}`, {
            method: "DELETE",
            })
            .then((response) => {
                if(response.ok){
                    console.log("deleted " + book.id);
                }else {
                    console.log("not deleted");
                }
            })
            .catch((error) => console.error(error));
        fetch("http://localhost:3000/reading-list")
            .then((response) => response.json())
            .then((data) => setBooks(data));  
    }
    return(
        <div style = {{textAlign: 'center'}}>
            <p style={{ fontSize: '80px' }}>Bookpedia Reading List</p>
            <button className = "goReading-btn" onClick = {goToSearch}>GO TO SEARCH LIST</button>

            <div className = "bookListFlex">
                {books?.map((book) => (
                    <ReadingBook key = {book.bookId} removeFromReading = {handleRemoveReading} data = {book}/>
                ))}
            </div>
        </div>
        
    )
}

export default ReadingPage;