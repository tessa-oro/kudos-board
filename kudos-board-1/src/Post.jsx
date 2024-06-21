import React from 'react';
import "./Post.css";

const Post = ({title, message, gif, author, votes, deleteCard, upVote}) => {

    return (
        <div id="post" >
            <p id="title">{title}</p>
            <img id="gif" alt="GIF" src={gif} />
            <p id="message">{message}</p>
            <p id="author">{author}</p>
            <button id="upvote" onClick={upVote}>{votes} upvote</button>
            <button id="delete" onClick={deleteCard}>delete</button>
        </div>
    );
}

export default Post;