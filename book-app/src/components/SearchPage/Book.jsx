import {useState, useEffect} from "react";
import bookImage from "../../assets/book title.jpg";

const Book = () => {
    const [divClass, setClass] = useState("");
    const [makeSmaller, setSmaller] = useState("divBookLarger");
    useEffect(() => {
        let x = Math.floor((Math.random() * 2) + 1);
        if(x == 1){
            setClass("divBook divBookGreen");
        }else{
            setClass("divBook");
        }
        if(window.innerWidth < 990){
            setSmaller("");
        }
        
        window.addEventListener("resize", () => {
            if(window.innerWidth < 990){
                setSmaller("");
            }else{
                setSmaller("divBookLarger");
            }
        });
    }, []);
    
    return (
        <>
        <div className = {divClass + " " + makeSmaller}>
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
            <button>Add to reading list</button>
        </div>
        </>
    )
};

export default Book;