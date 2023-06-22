import bookImage from "../../assets/book title.jpg";

const Book = () => {

    return (
        <div className = "divBook">
            <img src = {bookImage} alt = "book image"></img>
            
            <div className = "subDivBook"> 
                <h6>title</h6> {/* add the link to the title */}
                <p className = "leftAlign" >Author</p>
                
                <p className = "rightAlign" >Year</p>
                <p>This book is about a lot of content that is content. I am not writing nonsense so that this is about the length of a description. We also might need to consider if the description is too long, but lets get the formatting in first. Do you think this is long enought. lets see</p>
            </div>
            {/* <button>Add to reading list</button> */}
        </div>
    )
};

export default Book;