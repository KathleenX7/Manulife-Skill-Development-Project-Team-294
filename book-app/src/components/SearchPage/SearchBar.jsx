import {useState} from "react";

const SearchBar = ({onSearchAuthor, onSearchSubject, onSearchGeneral}) => {
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const [general, setGeneral] = useState("");
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }
    const handleSearchAuthor = () => {
        if(author != ""){ onSearchAuthor(author); }
        
        setAuthor("");
    }

    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    }
    const handleSearchSubject = () => {
        if(subject != "") {onSearchSubject(subject);}
        setSubject("");
    }

    const handleChangeGeneral = (event) => {
        setGeneral(event.target.value);
    }
    const handleSearchGeneral = () => {
        if(general != "") {onSearchGeneral(general);}
        setGeneral("");
    }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input onChange = {handleChangeAuthor} type = "Author" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by author" value = {author} ></input>
                <input onChange = {handleChangeSubject} type = "Subject" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by subject" value = {subject}></input>
                <input onChange = {handleChangeGeneral} type = "General Information" className = "searchInput" style={{ textAlign: 'center'}} placeholder="search by description" value = {general}></input>
                <button onClick = {handleSearchAuthor}> Search by author </button>
                <button onClick = {handleSearchSubject}> Search by subject </button>
                <button onClick = {handleSearchGeneral}> Search by general </button>
            </div>
        </div>
    )
};

export default SearchBar;