import {useState, useEffect} from "react";
import bookImage from "../../assets/book title.jpg";

const ReadingBook = () => {
    const [makeSmaller, setSmaller] = useState(false);
    useEffect(() => {
        window.addEventListener("resize", () => {
            if(window.innerWidth < 990){
                setSmaller(true);
            }else{
                setSmaller(false);
            }
        });
    }, []);
    
    return (
        <>
        <div className = {makeSmaller? "divBook": "divBook divBookLarger"}>
            <div className = "subDivBookImg"> 
                <img src = {bookImage} alt = "book image"></img>
            </div>
            <div className = "subDivBook"> 
                <h6>Harry Potter and the Philosopher's Stone</h6> {/* add the link to the title */}
                <div className = "newLine">
                    <p className = "leftAlign" >Author</p>
                    <p className = "rightAlign" >Year</p>
                </div>

                <p>This book is about a lot of content that is content. I am not writing nonsense so that this is about the length of a description. We also might need to consider if the description is too long, but lets get the formatting in first. Do you think this is long enought. lets see</p>
            </div>
        </div>
        </>
    )
};

export default ReadingBook;