import {useState, useEffect} from "react";
import Book from "./Book";
import PopupBook from "./PopupBook";
import PropTypes from "prop-types";

const BookList = ({data}) => {
    const [popup, changePopup] = useState(false);
    const [popupData, changePopupData] = useState([]);
    const handleAddReading = (book) => {
        // HERE
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

            {data?.map((book) => (
                <Book key = {book.title + " " + book.publicationDate} addToReading = {handleAddReading} moreInfo = {handleOpenPopup} data = {book}/>
            ))}

            <PopupBook trigger = {popup} closePopup = {handleClosePopup} data = {popupData} >hi</PopupBook>
        </div>
    )
};

export default BookList;