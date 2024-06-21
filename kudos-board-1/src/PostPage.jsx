import React from 'react';
import { useState, useEffect } from 'react';
import "./PostPage.css";
import Post from "./Post";

const PostPage = ({ cardId }) => {
    const [kudoPosts, setKudoPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(cardId);
    
    const fetchPosts = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosPosts/${cardId}`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            console.log(data);
            setKudoPosts(data);
        })
        .catch(error => {
            console.error('Error fetching posts', error);
        });
    }

    return (
        <div id="postPage" >
            <p>Posts</p>
            <div id="posts">
                <div id="postSection">
                    {kudoPosts.map(post => (
                        <Post message={post.message} author={post.author} votes={post.votes}
                        card={post.cardId}
                        /*{ deleteCard={(num) => deleteThisCard(num)} } *//>)
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;