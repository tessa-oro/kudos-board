import React from 'react';
import "./Post.css";
import Comments from "./Comments";
import { useState, useEffect } from 'react';

const Post = ({title, message, gif, author, votes, deleteCard, upVote, postId}) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    /*
    Fetches all comments belonging to post using GET
    */
    const fetchComments = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/comments/${postId}`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            setComments(data);
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
    }

    /*
    Adds a comment to array of comments belonging to post using POST
    */
    const addComment = (e) => {
        e.preventDefault();
        let newComment = e.target.elements.toComment.value;
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/comments/${postId}/create/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: newComment
                })
            }
        )
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            fetchComments();
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
        e.target.reset();
    }

    return (
        <div id="post" >
            <p id="postCardTitle">{title}</p>
            <p id="bMessage">{message}</p>
            <img id="bGif" alt="GIF" src={gif} />
            <p id="bAuthor">{author}</p>
            <button id="upvote" onClick={upVote}>{votes} upvote</button>
            <button id="deletePost" onClick={deleteCard}>delete</button>
            <form onSubmit={(e) => addComment(e)}>
                <input id="toComment" type="text" name="toComment" placeholder="add a comment..."></input>
            </form>
            <div id="comments">
                {comments.map(comment => (
                    <Comments content={comment.content} />
                ))}
            </div>
        </div>
    );
}

export default Post;