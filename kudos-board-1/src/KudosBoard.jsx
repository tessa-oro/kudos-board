import React from 'react';
import "./KudosBoard.css";
import ButtonSection from "./ButtonSection";
import KudosCard from "./KudosCard";

function KudosBoard() {
    return (
        <div>
            <ButtonSection />
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