import {useState, useEffect} from "react";
import bookImage from "../../assets/book title.jpg";

const ReadingBook = ({title, author, year, description, image}) => {
    const [makeSmaller, setSmaller] = useState(false);
    useEffect(() => {
        let x = Math.floor((Math.random() * 2) + 1);
        if(x == 1){
            setClass("divBook divBookPurple");
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
                <img src = {image} alt = "book image"></img>
            </div>
            <div className = "subDivBook"> 
                <h6>{title} </h6> {/* add the link to the title */}
                <div className = "newLine">
                    <p className = "leftAlign" >{author}</p>
                    <p className = "rightAlign" >{year}</p>
                </div>

                {/* <button onClick = {handleMoreInfo} className = "subDivBook-clearButton"><u>More Info</u></button>
                
                <p>{description}</p> */}
            </div>
        </div>
        </>
    )
};

export default ReadingBook;