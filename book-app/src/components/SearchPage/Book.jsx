import {useState, useEffect} from "react";
const Book = ({addToReading, moreInfo, data}) => {
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
    
    const handleAddReading = () => {
        addToReading(data);
    }
    const handleMoreInfo = () => {
        moreInfo(data);
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

                <button onClick = {handleMoreInfo} className = "subDivBook-clearButton"><u> more info </u></button>
                
                {/* <p>{description}</p> */}
            </div>
            <button onClick = {handleAddReading}> add to reading list</button>
            
        </div>
        </>
    )
};

export default Book;