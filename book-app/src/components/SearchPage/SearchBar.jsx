import {useState} from "react";

const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const [general, setGeneral] = useState("");

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type = "Author" className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by author" value = {author} ></input>
                <input type = "Subject" className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by title" value = {title}></input>
                <input type = "General Information" className = "searchInput" style={{ textAlign: 'center'}} type = "text" placeholder="search by description" value = {description}></input>
                <button> Search by author </button>
                <button> Search by subject </button>
                <button> Search by general </button>
            </div>
        </div>
    )
};

export default SearchBar;