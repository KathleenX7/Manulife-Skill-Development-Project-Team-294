import {useState, useEffect} from "react";
import Book from "./Book";
import PopupBook from "./PopupBook";
import PropTypes from "prop-types";

const BookList = ({data}) => {
    const [popup, changePopup] = useState(false);
    const handleAddReading = () => {
        console.log("hi");
    }
    const handleChangePopup = () => {
        changePopup(!popup);
    }

    return (
        <div className = "bookListFlex">

            {data?.map((book) => (
                <Book addToReading = {handleAddReading} moreInfo = {handleChangePopup} image = {book.cover} author = {book.author} title = {book.title} year = {book.publicationDate} description = "This book is about a lot of content that is content. I am not writing nonsense so that this is about the length of a description. We also might need to consider if the description is too long, but lets get the formatting in first. Do you think this is long enought. lets see"/>
            ))}

            <PopupBook trigger = {popup} closePopup = {handleChangePopup} >hi</PopupBook>
        </div>
    )
};

BookList.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BookList;