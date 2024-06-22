import "./PostModal.css";
import React from "react";
import { useState, useEffect } from 'react';

const PostModal = ({ closeModal, createPost }) => {
    const [searchGIF, setSearchGIF] = useState("");
    const [gifOptions, setGifOptions] = useState([]);
    const [pickedURL, setPickedURL] = useState("");

    useEffect(() => {
        fetchSearch;
    }, []);

    /*
    Fetch first 6 search giphy search results using GIPHY API
    */
    const fetchSearch = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=GadzqBwyej5EjOVt6ryGmgYENTbW6mls&q=${searchGIF}&limit=6&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
        fetch(url)
            .then(response => response.json())
            .then(response => setGifOptions(response.data))
            .catch(err => console.error(err));
    }

    /*
    Set search term for search url to what user enters to search bar
    */
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchGIF(e.target.value);
    }

    /*
    Fetches search when search button is clicked
    */
    const goSearch = (e) => {
        e.preventDefault();
        fetchSearch();
    }

    /*
    Sets the selected gif url to correspond to gif that user clicked
    */
    const selectGIF = (e, selectedURL) => {
        e.preventDefault();
        setPickedURL(selectedURL);
    }

    return (
        <>
            <div id="createModalPost">
                <div id="modalContent">
                    <h3>Create a New Post</h3>
                    <form onSubmit={(e) => {createPost(e)}}>
                        <div>
                        <div id="title">
                            <label>Title:</label>
                            <input type="text" id="title" name="title" required></input>
                        </div>
                        </div>
                        <div>
                        <div id="message"> 
                                <label>Message:</label>
                                <input id="message" name="message" required></input>
                        </div>
                        </div>
                        <div id="gifSearch" onSubmit={(e) => goSearch(e)}>
                            <label>Search GIFS:</label>
                            <input type="text" id="searchFor" name="searchFor"
                            onChange={handleSearch} value={searchGIF} required></input>
                            <button onClick={(e) => goSearch(e)}>search</button>
                        </div>
                        <div id="gifOptions">
                            <div>
                                {gifOptions.map((gOption, index) => (
                                    <img id="gifItem" alt="GIF" src={gOption.images.fixed_height.url}
                                    loading="lazy" onClick={(e) => selectGIF(e, gOption.images.fixed_height.url)}/>)                          
                                 )}
                            </div>
                            <div>
                                <p id="pPickedURL">GIF URL: {pickedURL}</p>
                                <input type="hidden" id="pickedURL" name="pickedURL" value={pickedURL}></input>
                            </div>
                        </div>
                        <div>
                        <div id="author"> 
                            <label>Author:</label>
                            <input type="text" id="author" name="author"></input>
                        </div>
                        </div>
                        <div id="submitPostDiv">
                        <button type="submitPost" value="Submit">Create Post</button>
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