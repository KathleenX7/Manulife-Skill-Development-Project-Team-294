import {useState} from "react";

const SearchBar = ({onSearchAuthor, onSearchSubject, onSearchGeneral}) => {
    const [author, setAuthor] = useState("");
    const [subject, setSubject] = useState("");
    const [general, setGeneral] = useState("");
    const [type, setType] = useState("");
    const [topic, setTopic] = useState("");
    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }
    const handleSearchAuthor = () => {
        setType("author");
        setTopic(author);
        if(author != ""){ onSearchAuthor(author); }
        setAuthor("");
    }

    const handleChangeSubject = (event) => {
        setSubject(event.target.value);
    }
    const handleSearchSubject = () => {
        setType("subject");
        setTopic(subject);
        if(subject != "") {onSearchSubject(subject);}
        setSubject("");
    }

    const handleChangeGeneral = (event) => {
        setGeneral(event.target.value);
    }
    const handleSearchGeneral = () => {
        setType("description");
        setTopic(general);
        if(general != "") {onSearchGeneral(general);}
        setGeneral("");
    }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className = "searchBar-container">
                    <input onChange = {handleChangeAuthor} type = "Author" className = "searchInput" style={{ textAlign: 'center'}} placeholder="e.g. J.K Rowling" value = {author} ></input>
                    <button onClick = {handleSearchAuthor} className = "searchBar-btn"> search author </button>
                </div>

                <div className = "searchBar-container">
                    <input onChange = {handleChangeSubject} type = "Subject" className = "searchInput" style={{ textAlign: 'center'}} placeholder="e.g. Magic" value = {subject}></input>
                    <button onClick = {handleSearchSubject} className = "searchBar-btn"> search subject </button>
                </div>

                <div className = "searchBar-container">
                    <input onChange = {handleChangeGeneral} type = "General Information" className = "searchInput" style={{ textAlign: 'center'}} placeholder="e.g. Harry Potter" value = {general}></input>
                    <button onClick = {handleSearchGeneral} className = "searchBar-btn"> search description </button>
                </div>
            </div>
            {topic == ""? "":<p className = "searchBar-searchBy"> <b>search by {type}</b>: "{topic}" </p>}
            
        </div>
    )
};

export default SearchBar;