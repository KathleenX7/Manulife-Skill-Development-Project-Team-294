import {useState} from "react";
const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by author" value = {author} ></input>
                <input className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by title" value = {title}></input>
                <input className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by description" value = {description}></input>
                <input className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by published year" value = {year}></input>
                <button> search </button>
            </div>
        </div>
    )
};

export default SearchBar;