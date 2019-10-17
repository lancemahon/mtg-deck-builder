import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
// import AddCardForm from '../Cards/addCardForm.js'
import UpdateDeckForm from './UpdateDeckForm.js'
import { Link } from 'react-router-dom'

const Decks = ({ user }) => {
  const [decks, setDecks] = useState([])
  const [clicked, setClicked] = useState(false)
  const [focusDeck, setFocusDeck] = useState(null)
  const [updateClicked, setUpdateClicked] = useState(false)
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

  const toggleUpdateClicked = () => {
    setUpdateClicked(!updateClicked)
  }

  if (!clicked) {
    return (
      <div>
        {newDeckButtonJsx}
        {decksJsx}
      </div>
    )
  } else if (!updateClicked) {
    return (
      <React.Fragment>
        {focusDeck.name}
        <br />
        {focusDeckJsx}
        <h6>Update this deck?</h6>
        <button type='button' className='btn btn-secondary' onClick={toggleUpdateClicked}>Update</button>
        <br />
        <h6>Delete this deck?</h6>
        <button type='button' className='btn btn-danger' onClick={() => { deleteDeck(focusDeck._id) }}>Delete</button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h4>Updating {focusDeck.name}</h4>
        <UpdateDeckForm
          user={user}
          focusDeck={focusDeck}
        />
      </React.Fragment>
    )
  }
}

export default Decks
