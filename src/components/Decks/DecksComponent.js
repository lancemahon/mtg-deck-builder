import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link } from 'react-router-dom'

const Decks = ({ user }) => {
  const [decks, setDecks] = useState([])
  const [clicked, setClicked] = useState(false)
  const [focusDeck, setFocusDeck] = useState(null)
  console.log('user is ', user)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/decks`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      // .then(responseData => console.log(responseData.data.decks))
      .then(responseData => setDecks(responseData.data.decks))
      .catch(console.error)
  }, [])

  const toggleClicked = (deck) => {
    setFocusDeck(deck)
    setClicked(!clicked)
  }

  const decksJsx = decks.map(deck => (
    <React.Fragment key={deck._id}>
      <button type="button" onClick={() => {
        toggleClicked(deck)
      }
      }>
        <h3>{deck.name}</h3>
      </button>
    </React.Fragment>
  ))

  const newDeckButtonJsx = () => (
    <Link to='/new-deck' type="button">New deck</Link>
  )

  const focusDeckJsx = () => (
    { if (clicked) {
      focusDeck.cards.map(card => (
        <React.Fragment key={card.id}>
          <h4>Cards</h4>
          <span>
            <div>{card.name}</div>
          </span>
        </React.Fragment>
      ))
    }
    }
  )

  const deleteDeck = (deckId) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/decks/${deckId}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
  }

  if (!clicked) {
    return (
      <div>
        {newDeckButtonJsx}
        {decksJsx}
      </div>
    )
  } else {
    return (
      <React.Fragment>
        {focusDeck.name}
        {focusDeckJsx}
        <h6>Delete this deck?</h6>
        <button type='button' className='btn btn-danger' onClick={() => { deleteDeck(focusDeck._id) }}>Delete</button>
      </React.Fragment>
    )
  }
}

export default Decks
