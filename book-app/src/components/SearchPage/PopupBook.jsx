import React from "react";

import bookImage from "../../assets/book title.jpg";

function PopupBook(props){
    const handleClose = () =>{
        props.closePopup();
    }
    return(props.trigger) ? (
        <div className="popup">
            <div className= "popup-inner">
                {/* {props.children} */}
                
                <div className = "popup-inner-sub"> 
                    <h6> {props.data.title} </h6>
                    <div className = "newLine">
                        <p className = "leftAlign" > {props.data.author}</p>
                        <p className = "rightAlign" > {props.data.publicationDate}</p>
                    </div>
                    <div className = "popup-additionalInfo">
                        <p> <b>Edition Count:</b> {props.data.edition_count}</p>
                        <p> <b>Pages:</b> {props.data.number_of_pages_median}</p>
                        <p> <b>Rating:</b> {props.data.ratings_average}</p>
                    </div>
                    

                    <button onClick={handleClose}>close</button>
                </div>
                    
                    
            </div> 
        </div>
    ) : "";
};

export default PopupBook;