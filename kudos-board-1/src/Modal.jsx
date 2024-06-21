import "./Modal.css";
import React from "react";

const Modal = ({ closeModal, createBoard }) => {

    return (
        <>
            <div id="createModal">
                <div id="modalContent">
                    <h3>Create a New Board</h3>
                    <form onSubmit={(e) => {createBoard(e)}}>
                        <div id="dTitle">
                            <label>Title:</label>
                            <input type="text" id="title" name="title" required></input>
                        </div>
                        <div id="dCategory"> 
                            <label>Category:</label>
                            <select id="category" name="category">
                                <option value="">select</option>
                                <option value="celebration">Celebration</option>
                                <option value="thankYou">Thank You</option>
                                <option value="inspiration">Inspiration</option>
                            </select>
                        </div>
                        <div id="dAuthor"> 
                            <label>Author:</label>
                            <input type="text" id="author" name="author"></input>
                            <button type="submit" value="Submit">Create Board</button>
                        </div>
                    </form>
                    <p id="close" onClick={closeModal}>cancel</p>
                </div>
            </div>
            <div id="overlay"></div>
        </>
    );
}


export default Modal;