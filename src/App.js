import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://picsum.photos/200/';

async function getCards() {
  const responses = await Promise.all([...Array(8)].map(() => fetch(`${API}`)));
  return responses.map(response => response.url);
}

function shuffleCards(array) {
  return array.sort(() => {
    return 0.5 - Math.random()
  })
}

const CARD_STATE = {
  UNREVEALED: 'UNREVEALED',
  REVEALED: 'REVEALED',
  MATCHED: 'MATCHED',
};

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCards()
      let shuffledCards = shuffleCards([...data, ...data])
      setCards(shuffledCards.map((card, idx) => {
        return {
          position: idx,
          url: card,
          state: CARD_STATE.UNREVEALED
        }
      }))
    })();
  }, [])

  return (
    <div className="container">
        {cards.map((item, idx) => <div className="image" key={idx}></div>)}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Cards />
    </div>
  );
}

export default App;
