import "./KudosCard.css";
import React from "react";

const KudosCard = ({title, category, num, goToPosts}) => {

    return (
        <div id="kudosCard" >
            <div>
                <img id="kudosPoster" src={`https://picsum.photos/200/300?random=${num}`}/>
                <p id="cardTitle">{title}</p>
                <p id="category">{category}</p>
            </div>
            <span>
                <span id="viewBoardBox">
                    <button id="viewBoard" onClick={goToPosts}>view board</button>
                </span>
                <span>
                    <button id="delete">delete</button>
                </span>
            </span>
        </div>
    );
}

export default KudosCard;