import "./KudosCard.css";
import React from "react";
import { Link } from 'react-router-dom';

const KudosCard = ({title, category, num, deleteCard, passCardId}) => {

    /*
    Passes the id of the clicked card in order to show corresponding posts
    */
    const handleSwitch = () => {
        passCardId(num);
    }

    return (
        <div id="kudosCard" >
            <div>
                <img id="kudosPoster" src={`https://picsum.photos/200/300?random=${num}`}/>
                <p id="cardTitle">{title}</p>
                <p id="category">{category}</p>
            </div>
            <span>
                <span id="viewBoardBox">
                    <Link to="/posts">
                        <button id="viewBoard" onClick={handleSwitch}>view more</button>
                    </Link>
                </span>
                <span>
                    <button id="delete" onClick={deleteCard}>delete</button>
                </span>
            </span>
        </div>
    );
}

export default KudosCard;