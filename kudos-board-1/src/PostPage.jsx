import React from 'react';
import { useState, useEffect } from 'react';
import "./PostPage.css";
import Post from "./Post";
import PostModal from "./PostModal";
import { Link } from 'react-router-dom';

const PostPage = ({ cardId }) => {
    const [kudoPosts, setKudoPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    /*
    Fetches all posts corresponding to clicked card using GET
    */
    const fetchPosts = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosPosts/${cardId}`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            setKudoPosts(data);
        })
        .catch(error => {
            console.error('Error fetching posts', error);
        });
    }

    /*
    Opens and closes modal to create post
    */
    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    /*
    Creates a new post with form input using POST
    */
    const createPost = async (formInput) => {
        formInput.preventDefault();
        const formData = {
            title: `${formInput.target.elements.title.value}`,
            message: `${formInput.target.elements.message.value}`,
            author: `${formInput.target.elements.author.value}`,
            gif: `${formInput.target.elements.pickedURL.value}`
        };
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosPosts/${cardId}/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
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
            fetchPosts();
        })
        .catch(error => {
            console.error('Error fetching posts', error);
        });
        changeModalDisplay();
    }

    /*
    Deletes selected post using DELETE
    */
    const deleteThisPost = (num) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosPosts/${num}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
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
            fetchPosts();
        })
        .catch(error => {
            console.error('Error fetching post', error);
        });
    }

    /*
    Updates number of upvotes on a post using PATCH
    */
    const upVote = (num) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosPosts/upvote/${num}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
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
            fetchPosts();
        })
        .catch(error => {
            console.error('Error fetching post', error);
        });
    }

    return (
        <div id="postPage" >
            <p id="postTitle">Posts</p>
            <Link to="/">
                <button id="goBack">go back</button>
            </Link>
            <button onClick={() => changeModalDisplay()}>create post</button>
            { showModal ? (
                <PostModal closeModal={() => changeModalDisplay()} createPost={(e) => createPost(e)} />
            ) : (<></>)
            }
            <div id="posts">
                <div id="postSection">
                    {kudoPosts.map(post => (
                        <Post message={post.message} author={post.author} votes={post.votes}
                        card={post.cardId} title={post.title} gif={post.gif} postId={post.id}
                        deleteCard={() => deleteThisPost(post.id)}
                        upVote={() => upVote(post.id)} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;