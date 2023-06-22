import {useState} from "react";
const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");

    return (
        <div>
            <div>
                <input className = "searchInput" type = "text" value = {author}></input>
                <input className = "searchInput" type = "text" value = {title}></input>
                <input className = "searchInput" type = "text" value = {description}></input>
                <input className = "searchInput" type = "text" value = {year}></input>
                <button> search </button>
            </div>
        </div>
    )
};

export default SearchBar;