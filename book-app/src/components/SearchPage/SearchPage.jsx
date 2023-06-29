import SearchBar from "./SearchBar";

function SearchPage() {
    return(
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '80px' }}>Bookpedia</p>
            <SearchBar/>
            <Link to="/booklist" className="btn btn-primary">Book List</Link>
        </div>
    )
};

export default SearchPage;