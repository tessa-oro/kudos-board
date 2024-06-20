import React from 'react';
import { useState, useEffect } from 'react';
import "./KudosBoard.css";
import ButtonSection from "./ButtonSection";
import KudosCard from "./KudosCard";
import Modal from "./Modal";

function KudosBoard() {
    const [showModal, setShowModal] = useState(false);
    const [kudoBoards, setKudoBoards] = useState([]);
    const [randImg, setRandImg] = useState(1);

    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    const createCard = (formInput) => {
        console.log("creating");
        let card = new Map();
        setRandImg(randImg + 1);
        card.set('title', formInput.target.title.value);
        card.set('category', formInput.target.category.value);
        setKudoBoards(...kudoBoards, card);
        console.log(card);
    }

    console.log(kudoBoards);

    return (
        <div>
            <ButtonSection openCreate={() => changeModalDisplay()}/>
            { showModal ? (
                <Modal closeModal={() => changeModalDisplay()} createBoard={(formInput) => createCard(formInput)}/>
            ) : (<></>)
            }
            <div id="kudos">
                <div id="cardSection">
                    <KudosCard num="1"/>
                    <KudosCard num="2" title="title" category="category"/>
                    <KudosCard />
                    <KudosCard />
                    <KudosCard />
                    <KudosCard />
                    {kudoBoards.forEach((card) => {
                        <KudosCard title={card.title} num={randImg} category={card.category} />
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default KudosBoard;