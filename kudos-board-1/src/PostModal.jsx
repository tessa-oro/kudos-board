import "./PostModal.css";
import React from "react";

const PostModal = ({ closeModal, createPost }) => {

    return (
        <>
            <div id="createModal">
                <div id="modalContent">
                    <h3>Create a New Post</h3>
                    <form onSubmit={(e) => {createPost(e)}}>
                        <div id="title">
                            <label>Title:</label>
                            <input type="text" id="title" name="title" required></input>
                        </div>
                        <div id="message"> 
                            <label>Card description:</label>
                            <input id="message" name="message"></input>
                        </div>
                        <div id="author"> 
                            <label>Author:</label>
                            <input type="text" id="author" name="author"></input>
                            <button type="submit" value="Submit">Create Post</button>
                        </div>
                    </form>
                    <p id="close" onClick={closeModal}>cancel</p>
                </div>
            </div>
            <div id="overlay"></div>
        </>
    );
}


export default PostModal;