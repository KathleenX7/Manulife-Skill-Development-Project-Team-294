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
                    <h6> name </h6>
                    <div className = "newLine">
                        <p className = "leftAlign" > author</p>
                        <p className = "rightAlign" > year</p>
                    </div>

                    <p>afd sfhdsof hadosf hushfodsh ofhdua ofuhdsua fdusfoa dhufoa</p>
                    <button onClick={handleClose}>Close</button>
                </div>
                    
                    
            </div>
        </div>
    ) : "";
};

export default PopupBook;