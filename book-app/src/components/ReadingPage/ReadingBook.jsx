import {useState, useEffect} from "react";
import bookImage from "../../assets/book title.jpg";

const ReadingBook = ({data, removeFromReading}) => {
    const [divClass, setClass] = useState("");
    const [makeSmaller, setSmaller] = useState("divBookLarger");
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
    const handleRemoveReading = () => {
        removeFromReading(data);
    }
    return (
        <>
        <div className = {divClass + " " + makeSmaller}>
            <div className = "subDivBookImg"> 
                <img src = {data.cover} alt = "book image"></img>
            </div>
            <div className = "subDivBook"> 
                <h6>{data.title} </h6> {/* add the link to the title */}
                <div className = "newLine">
                    <p className = "leftAlign" >{data.author}</p>
                    <p className = "rightAlign" >{data.publicationDate}</p>
                </div>

                {/* <button onClick = {handleMoreInfo} className = "subDivBook-clearButton"><u>More Info</u></button>
                
                <p>{description}</p> */}
            </div>
            <button onClick = {handleRemoveReading}> remove from reading list</button>
        </div>
        </>
    )
};

export default ReadingBook;