import React from 'react';
import "./ButtonSection.css"

function ButtonSection( {openCreate, handleSort, handleSearch, clearSearch} ) {
    return (
        <div>
            <div id="searchSection">
                <form id="searchContainer" >
                        <input id='searchBar' onChange={(e) => { handleSearch(e) }} input='text' name='kudosSearch' placeholder='search'></input>
                        <button id='searchClear' onClick={clearSearch}>clear</button>
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

//onSubmit={(e) => { handleSearch(e) }}  
export default ButtonSection;