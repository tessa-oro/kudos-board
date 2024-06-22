import React from 'react';
import "./Post.css";

const Post = ({title, message, gif, author, votes, deleteCard, upVote}) => {

    return (
        <div id="post" >
            <p id="postCardTitle">{title}</p>
            <p id="bMessage">{message}</p>
            <img id="bGif" alt="GIF" src={gif} />
            <p id="bAuthor">{author}</p>
            <button id="upvote" onClick={upVote}>{votes} upvote</button>
            <button id="deletePost" onClick={deleteCard}>delete</button>
        </div>
    );
}

export default Post;