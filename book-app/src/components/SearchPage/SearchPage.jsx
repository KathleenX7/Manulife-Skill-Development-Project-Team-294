import SearchBar from "./SearchBar";
import BookList from "./BookList";

function SearchPage() {
    return(
        <div>
            <SearchBar/>
            <Link to="/booklist" className="btn btn-primary">Book List</Link>
        </div>
    )
};

export default SearchPage;