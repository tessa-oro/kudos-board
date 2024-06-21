import React from 'react';
import { useState, useEffect } from 'react';
import "./Post.css";

const Post = ({title, message, gif, author, votes, deleteCard}) => {

    return (
        <div id="post" >
            <p id="title">{title}</p>
            <p id="message">{message}</p>
            <p id="author">{author}</p>
            <p id="upvote">{votes} upvote</p>
            <button id="delete" onClick={deleteCard}>delete</button>
        </div>
    );
}

export default Post;