import {useState} from "react";
const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");

    return (
        <div>
            <div>
                <input type = "text" value = {author}></input>
                <input type = "text" value = {title}></input>
                <input type = "text" value = {description}></input>
                <input type = "text" value = {year}></input>
                <button> search </button>
            </div>
        </div>
    )
};

export default SearchBar;