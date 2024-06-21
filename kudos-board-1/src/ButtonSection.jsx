import React from 'react';
import "./ButtonSection.css"

function ButtonSection( {openCreate, handleSort} ) {
    return (
        <div>
            <div id="searchSection">
                <form id="searchContainer" onSubmit={(e) => { handleSearch(e) }}>
                        <input id='searchBar' input='text' name='kudosSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                </form>
            </div>
            <span>
                <span id="sortSection">
                    <div id="sortBox">
                        <label id="sortLabel">View:</label>
                        <select onChange={(e) => handleSort(e)} name="sort" id="sortOption">
                            <option value="all">All</option>
                            <option value="recent">Recent</option>
                            <option value="celebration">Celebration</option>
                            <option value="thankYou">Thank You</option>
                            <option value="inspiration">Inspiration</option>
                        </select>
                    </div>
                </span>
                <span id="createNewSection">
                    <button id='createNew' onClick={openCreate}>Create a New Board</button>
                </span>
            </span>
        </div>
    );
}

export default ButtonSection;