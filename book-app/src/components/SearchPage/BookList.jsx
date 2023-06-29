import {useState, useEffect} from "react";
import Book from "./Book";
import PopupBook from "./PopupBook";

const BookList = () => {
    const [popup, changePopup] = useState(false);
    const handleAddReading = () => {
        console.log("hi");
    }
    const handleChangePopup = () => {
        changePopup(!popup);
    }

    return (
        <div className = "bookListFlex">
            <Book addToReading = {handleAddReading} moreInfo = {handleChangePopup} author = "JK Rowling" title = "Harry Potter" year = "1997" description = "This book is about a lot of content that is content. I am not writing nonsense so that this is about the length of a description. We also might need to consider if the description is too long, but lets get the formatting in first. Do you think this is long enought. lets see"/>
            <Book />
            <Book />
            <Book />

            <PopupBook trigger = {popup} closePopup = {handleChangePopup} >hi</PopupBook>
        </div>
    )
};

export default BookList;