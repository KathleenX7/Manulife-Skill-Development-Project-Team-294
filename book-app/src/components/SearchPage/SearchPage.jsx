import SearchBar from "./SearchBar";

function SearchPage() {
    return(
        <div>
            <SearchBar/>
            <Link to="/booklist" className="btn btn-primary">Book List</Link>
        </div>
    )
};

export default SearchPage;