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
        const formData = {
            title: `${formInput.target.elements.title.value}`,
            message: `${formInput.target.elements.message.value}`,
            author: `${formInput.target.elements.author.value}`,
            votes: "0",
            gif: "random"
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
            <p>Posts</p>
            <Link to="/">
                <p>go back</p>
            </Link>
            <button onClick={() => changeModalDisplay()}>create post</button>
            { showModal ? (
                <PostModal closeModal={() => changeModalDisplay()} createPost={(formInput) => createPost(formInput)} />
            ) : (<></>)
            }
            <div id="posts">
                <div id="postSection">
                    {kudoPosts.map(post => (
                        <Post message={post.message} author={post.author} votes={post.votes}
                        card={post.cardId} title={post.title}
                        deleteCard={() => deleteThisPost(post.id)}
                        upVote={() => upVote(post.id)} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;