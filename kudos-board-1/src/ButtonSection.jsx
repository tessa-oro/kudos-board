import React from 'react';
import "./ButtonSection.css"

function ButtonSection() {
    return (
        <div>
            <div id="searchSection">
                <form id="searchContainer" onSubmit={(e) => { handleSearch(e) }}>
                        <input id='searchBar' input='text' name='kudosSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                </form>
            </div>
            <div id="sortSection">
                <div id="sortBox">
                    <label id="sortLabel">View:</label>
                    <select name="sort" id="sortOption">
                        <option value="all">All</option>
                        <option value="recent">Recent</option>
                        <option value="celebration">Celebration</option>
                        <option value="thankYou">Thank You</option>
                        <option value="inspiration">Inspiration</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ButtonSection;