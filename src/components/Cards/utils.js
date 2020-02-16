export const CARD_STATE = {
    UNREVEALED: 'UNREVEALED',
    REVEALED: 'REVEALED',
    MATCHED: 'MATCHED',
};

export function shuffleCards(array) {
    return array.sort(() => {
      return 0.5 - Math.random()
    })
}

export const handleClick = (idx, item, cards, setCards ) => {

    const flippedCards = cards.filter(card => card.state === CARD_STATE.REVEALED);

    if (cards.filter(item => item.state === CARD_STATE.REVEALED).length >1) {
        return;
    }

    if(item.state === CARD_STATE.MATCHED) {
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
            return;
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