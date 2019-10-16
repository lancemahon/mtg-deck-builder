import React, { useState, useEffect } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Deck = ({ deckId }) => {
  const [deck, setDeck] = useState(null)

  useEffect(
    axios({
      method: 'GET',
      url: `${apiUrl}/decks/${deckId}`
    })
      .then(responseData => setDeck(responseData.data.deck))
  )

  const deckJsx = deck.cards.map(card => (
    <span key={card.id}>
      <div>{card.name}</div>
    </span>
  ))

  return (
    <React.Fragment>
      <h4>{deck.name}</h4>
      {deckJsx}
    </React.Fragment>
  )
}

export default Deck
