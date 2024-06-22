import React from 'react';
import { useState, useEffect } from 'react';
import "./KudosBoard.css";
import ButtonSection from "./ButtonSection";
import KudosCard from "./KudosCard";
import Modal from "./Modal";

function KudosBoard( {passCardId} ) {
    const [showModal, setShowModal] = useState(false);
    const [kudoCards, setKudoCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            console.log(data);
            setKudoCards(data);
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
    }

    const changeModalDisplay = () => {
        setShowModal(!showModal);
    }

    const createCard = (formInput) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: `${formInput.target.elements.title.value}`,
	                category: `${formInput.target.elements.category.value}`,
	                author: `${formInput.target.elements.author.value}`
                })
            }
        )
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            fetchCards();
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
    }

    const handleSort = (e) => {
        const selectedSort = e.target.value;
        console.log(selectedSort);
        if (selectedSort === 'all') {
            fetchCards();
        } else {
            try {
                fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards/show/${selectedSort}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                        return response.json();
                    } 
                })
                .then(data => {
                    console.log(data);
                    setKudoCards(data);
                })
                .catch(error => {
                    console.error('Error fetching boards', error);
                });
            } catch {
                console.error('Did not pick valid sort option');
            }
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchingFor = e.target.value;
        console.log(searchingFor);
        if (searchingFor === "") {
            fetchCards();
        } else {
            fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards/search/${searchingFor}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                } 
            })
            .then(data => {
                console.log(data);
                setKudoCards(data);
            })
            .catch(error => {
                console.error('Error fetching boards', error);
            });
        }
    }

    const clearSearch = () => {
        fetchCards();
    }

    const deleteThisCard = (num) => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/kudosCards/${num}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             } else {
                return response.json();
              } 
        })
        .then(data => {
            fetchCards();
        })
        .catch(error => {
            console.error('Error fetching boards', error);
        });
    }

    return (
        <div>
            <ButtonSection openCreate={() => changeModalDisplay()} handleSort={handleSort} handleSearch={handleSearch}
            clearSearch={clearSearch}/>
            { showModal ? (
                <Modal closeModal={() => changeModalDisplay()} createBoard={(formInput) => createCard(formInput)}/>
            ) : (<></>)
            }
            <div id="kudos">
                <div id="cardSection">
                    {kudoCards.map(card => (
                        <KudosCard title={card.title} category={card.category} num={card.id} 
                        passCardId={passCardId}
                        deleteCard={() => deleteThisCard(card.id)} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default KudosBoard;