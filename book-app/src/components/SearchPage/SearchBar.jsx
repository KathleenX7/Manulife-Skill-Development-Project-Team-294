import {useState} from "react";

const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const [general, setGeneral] = useState("");

    return (
        <div>
            <div>
                <input type = "Author" value = {author}></input>
                <input type = "Subject" value = {subject}></input>
                <input type = "General Information" value = {general}></input>
                <button> Search by author </button>
                <button> Search by subject </button>
                <button> Search by general </button>
            </div>
        </div>
    )
};

export default SearchBar;