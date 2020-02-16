import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../App.css';
import { getCards } from '../../api/images';

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

    const handleClick = (idx, item) => {
        const flippedCards = cards.filter(card => card.state === CARD_STATE.REVEALED);

        if (cards.filter(e => e.state === CARD_STATE.REVEALED).length >1) {
            return;
        }
        const revealedState = cards.map(card => {
            return card.position === idx ? {...card, state: CARD_STATE.REVEALED} : card;
        })

        const matchedState = revealedState.map(card => {
            return card.state === CARD_STATE.REVEALED ? {...card, state: CARD_STATE.MATCHED} : card;
        });
    
        const unFlip = revealedState.map(card => {
            return card.state === CARD_STATE.REVEALED ? {...card, state: CARD_STATE.UNREVEALED} : card;
        });
        if (flippedCards.length === 0) {
            setCards(revealedState);
        } else {
            if(flippedCards[0].position === item.idx) {
                return
            } else {
                setCards(revealedState);
                if (flippedCards[0].url === item.url) {
                    setCards(matchedState);
                } else {            
                    setTimeout(setCards, 800, unFlip);
                }
            }        
        }
    }

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
            {cards.map((item, idx) => <div onClick={() => handleClick(idx, item)} className={classnames("image", item.state.toLowerCase())} style={{backgroundImage: `url(${item.url})`}} key={idx}></div>)}
        </div>
    );
};

export default Cards