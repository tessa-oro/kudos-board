import "./Modal.css";
import React from "react";

const Modal = ({ closeModal }) => {

    return (
        <>
            <div id="createModal">
                <p id="close" onClick={closeModal}>&times;</p>
                <div id="modalContent">
                </div>
            </div>
            <div id="overlay"></div>
        </>
    );
}


export default Modal;