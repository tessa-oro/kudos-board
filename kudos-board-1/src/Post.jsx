import React from 'react';
import { useState, useEffect } from 'react';
import "./Post.css";

const Post = ({message, gif, author, votes}) => {

    return (
        <div id="post" >
            <p id="message">{message}</p>
            <p id="author">{author}</p>
            <p id="upvote">{votes} upvote</p>
            <button id="delete">delete</button>
        </div>
    );
}

export default Post;