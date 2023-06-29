import {useState, useEffect} from "react";
import Book from "./Book";
import PopupBook from "./PopupBook";
import PropTypes from "prop-types";

const BookList = ({data, addedBook}) => {
    const [popup, changePopup] = useState(false);
    const [popupData, changePopupData] = useState([]);
    const handleAddReading = (book) => {
        addedBook(book.title);
        fetch("http://localhost:3000/reading-list", {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                // Request payload data in JSON format
                title: book.title,
                author: book.author,
                cover: book.cover,
                year: book.publicationDate,
                editions: book.editions,
                pages: book.pages,
                ratings: book.ratings,
                bookId: book.bookId
              }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }
    const handleOpenPopup = (book) => {
        changePopup(true);
        changePopupData(book);
    }

    const handleClosePopup = () => {
        changePopup(false);
    }

    return (
        <div className = "bookListFlex">

            {Array.isArray(data)? data.map((book) => (
                <Book key = {book.title + " " + book.publicationDate} addToReading = {handleAddReading} moreInfo = {handleOpenPopup} data = {book}/>
            )): ""}

            <PopupBook trigger = {popup} closePopup = {handleClosePopup} data = {popupData} >hi</PopupBook>
        </div>
    )
};

export default BookList;