import {useState} from "react";

const SearchBar = () => {
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const [general, setGeneral] = useState("");
    const handleChangeAuthor = (event) => {
        setAuthors(event.target.value);
    }
    const handleSearchAuthor = () => {
        
        setAuthors("");
    }

    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    }
    const handleSearchSubject = () => {
        
        setSubject("");
    }

    const handleChangeGeneral = (event) => {
        setGeneral(event.target.value);
    }
    const handleSearchGeneral = () => {
        
        setGeneral("");
    }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input type = "Author" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by author" value = {author} ></input>
                <input type = "Subject" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by subject" value = {subject}></input>
                <input type = "General Information" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by description" value = {general}></input>
                <button> Search by author </button>
                <button> Search by subject </button>
                <button> Search by general </button>
            </div>
        </div>
    )
};

export default SearchBar;