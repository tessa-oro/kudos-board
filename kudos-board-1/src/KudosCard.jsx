import "./KudosCard.css";
import React from "react";

const KudosCard = ({num, goToKudos}) => {

    return (
        <div id="kudosCard" onClick={goToKudos}>
            <div>
                <img id="kudosPoster" src={`https://picsum.photos/200/300?random=${num}`}/>
                <p id="cardName">card</p>
            </div>
            <span>
                <span id="viewMoreBox">
                    <button id="viewMore" >view more</button>
                </span>
                <span>
                    <button id="delete">delete</button>
                </span>
            </span>
        </div>
    );
}

export default KudosCard;