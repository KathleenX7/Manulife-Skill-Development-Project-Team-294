import {useState} from "react";
import SearchAuthor from "../SearchLibrary/SearchAuthor";
import SearchGeneral from "../SearchLibrary/SearchGeneral";
import SearchSubject from "../SearchLibrary/SearchSubject";

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
                <button onClick={SearchAuthor(author)}> Search by author </button>
                <button onClick={SearchSubject(subject)}> Search by subject </button>
                <button onClick={SearchGeneral(general)}> Search by general </button>
            </div>
        </div>
    )
};

export default SearchBar;