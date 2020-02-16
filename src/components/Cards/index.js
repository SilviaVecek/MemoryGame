import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './index.css';
import CircularLoader from '../CircularLoader'
import { getCards } from '../../api/images';
import { handleClick, CARD_STATE, shuffleCards } from './utils';

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
            {cards.length === 0 && <CircularLoader />}
            {cards.map((item, idx) => <div 
                onClick={() => handleClick(idx, item, cards, setCards)} 
                className={classnames("image", item.state.toLowerCase())} 
                style={{backgroundImage: `url(${item.url})`}} 
                key={idx}></div>)}
        </div>
    );
};

export default Cards