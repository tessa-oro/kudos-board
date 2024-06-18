import "./KudosCard.css";
import React from "react";

const KudosCard = ({num}) => {

    return (
        <div id="kudosCard">
            <div>
                <img id="kudosPoster" src={`https://picsum.photos/200/300?random=${num}`}/>
                <p id="cardName">card</p>
            </div>
            <div>
                <span id="viewMoreBox">
                    <button id="viewMore" >view more</button>
                </span>
                <span>
                    <button id="delete">delete</button>
                </span>
            </div>
        </div>
    );
}

export default KudosCard;