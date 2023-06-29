import SearchBar from "./SearchBar";
import BookList from "./BookList";

function SearchPage() {
    return(
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '80px' }}>Bookpedia</p>
            <SearchBar/>
            <BookList/>
        </div>
    )
};

export default SearchPage;