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
        // fetch("http://localhost:3000/reading-list", {
        //     method: "POST",
        //     headers: {
        //         "content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         // Request payload data in JSON format
        //         title: book.title,
        //         author: book.author,
        //         cover: book.cover,
        //         year: book.publicationDate,
        //         // other properties
        //       }),
        //     })
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.error(error));
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