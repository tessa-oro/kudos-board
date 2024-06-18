import React from 'react';
import { useState, useEffect } from 'react';
import "./KudosBoard.css";
import ButtonSection from "./ButtonSection";
import KudosCard from "./KudosCard";
import Modal from "./Modal";

function KudosBoard() {
    const [showModal, setShowModal] = useState(false);

    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    return (
        <div>
            <ButtonSection openCreate={() => changeModalDisplay()}/>
            { showModal ? (
                <Modal closeModal={() => changeModalDisplay()}/>
            ) : (<></>)
            }
            <div id="kudos">
                <div id="cardSection">
                    <KudosCard num="1"/>
                    <KudosCard num="2"/>
                    <KudosCard />
                    <KudosCard />
                    <KudosCard />
                    <KudosCard />
                </div>
            </div>
        </div>
    );
}

export default KudosBoard;