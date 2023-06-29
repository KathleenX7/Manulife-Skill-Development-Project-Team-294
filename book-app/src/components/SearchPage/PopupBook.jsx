import React from "react";

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
                        <p> <b>Edition Count:</b> {props.data.editions}</p>
                        <p> <b>Pages:</b> {props.data.pages}</p>
                        <p> <b>Rating:</b> {props.data.ratings}</p>
                    </div>
                    

                    <button onClick={handleClose}>close</button>
                </div>
                    
                    
            </div> 
        </div>
    ) : "";
};

export default PopupBook;