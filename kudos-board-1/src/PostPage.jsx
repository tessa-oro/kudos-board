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
            console.log(data);
            console.log(cardId);
            setKudoPosts(data);
        })
        .catch(error => {
            console.error('Error fetching posts', error);
        });
    }

    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    const createPost = async (formInput) => {
        formInput.preventDefault();
        console.log(formInput.target.elements.title.value)
        console.log(formInput.target.elements.message.value);
        console.log(formInput.target.elements.author.value);
        console.log(formInput.target.elements.pickedURL.value);
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
            console.log(cardId);
            fetchPosts();
        })
        .catch(error => {
            console.error('Error fetching posts', error);
        });
        changeModalDisplay();
    }

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
                        card={post.cardId} title={post.title} gif={post.gif}
                        deleteCard={() => deleteThisPost(post.id)}
                        upVote={() => upVote(post.id)} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;