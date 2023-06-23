import {useState, useEffect} from "react";
import Book from "./Book";

const BookList = () => {
    

    return (
        <div className = "bookListFlex">
            <Book />
            <Book />
            <Book />
            <Book />
        </div>
    )
};

export default BookList;