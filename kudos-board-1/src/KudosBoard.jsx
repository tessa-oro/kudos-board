import React from 'react';
import { useState, useEffect } from 'react';
import "./KudosBoard.css";
import ButtonSection from "./ButtonSection";
import KudosCard from "./KudosCard";
import Modal from "./Modal";

function KudosBoard() {
    const [showModal, setShowModal] = useState(false);
    const [kudoCards, setKudoCards] = useState([]);
    const [randImg, setRandImg] = useState(1);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            console.log(data);
            setKudoCards(data);
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
    };

    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    // const createCard = (formInput) => {
    //     console.log("creating");
    //     let card = new Map();
    //     setRandImg(randImg + 1);
    //     card.set('title', formInput.target.title.value);
    //     card.set('category', formInput.target.category.value);
    //     setKudoBoards(...kudoBoards, card);
    //     console.log(card);
    // }

    return (
        <div>
            <ButtonSection openCreate={() => changeModalDisplay()}/>
            { showModal ? (
                <Modal closeModal={() => changeModalDisplay()} createBoard={(formInput) => createCard(formInput)}/>
            ) : (<></>)
            }
            <div id="kudos">
                <div id="cardSection">
                    {kudoCards.map(card => (
                        <KudosCard title={card.title} category={card.category} num={card.id}/>)
                    )}
                </div>
            </div>
        </div>
    );
}

export default KudosBoard;