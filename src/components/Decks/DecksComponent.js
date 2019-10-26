import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import AddCardForm from '../Cards/addCardToFocusDeck.js'
import SearchBar from '../Cards/searchBarComponent.js'
import UpdateDeckForm from './UpdateDeckForm.js'
import { Link } from 'react-router-dom'
import LinkHome from '../shared/LinkHome.js'
const mtg = require('mtgsdk')

const Decks = ({ user }) => {
  const [decks, setDecks] = useState([]) // for top level, before selecting
  const [focusDeck, setFocusDeck] = useState(null) // upon selection
  const [cards, setCards] = useState([]) // for when we are focusing on a deck, this will be for searching cards (with SearchBar)
  const [deckCards, setDeckCards] = useState([]) // these will be the cards that are already in the deck
  const [query, setQuery] = useState({ name: '', manaCost: '', cmc: '', colors: '', type: '', supertypes: '', types: '', subTypes: '', rarity: '', set: '', text: '', artist: '', power: null, toughness: null })
  // this is also for SearchBar
  const [clicked, setClicked] = useState(false) // if we have selected a deck or not
  const [updateClicked, setUpdateClicked] = useState(false) // for getting the update form

  // get all the user's decks and set them with setDecks
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

  // this is how we know we are focusing a deck, and which deck
  const toggleClicked = (deck) => {
    setFocusDeck(deck)
    setDeckCards(deck.cards)
    setClicked(!clicked)
  }

  // this is the actual list of decks, with buttons that focus each deck
  const ownedDecks = decks.filter(deck => deck.owner === user._id
  )

  for (let i = 0; i < decks.length; i++) {
    // console.log('deck.owner: ', decks[i].owner)
  }

  // console.log('ownedDecks: ', ownedDecks)
  // console.log('user._id: ', user._id)

  const decksJsx = ownedDecks.map(deck => (
    <React.Fragment key={deck._id}>
      <button type="button" onClick={() => {
        toggleClicked(deck)
      }
      }>
        <h3>{deck.name}</h3>
      </button>
    </React.Fragment>
  ))

  const cardsJsx = cards.map(card => (
    <span key={card.id}>
      <h4>{card.name}</h4>
      <p>id: {card.id}</p>
      <img src={card.imageUrl} />
      <br />
      <AddCardForm
        deck={focusDeck}
        card={card}
        user={user}
      />
    </span>
  ))

  // haven't seen this show up, weird
  const newDeckButtonJsx = () => (
    <span>
      <Link to='/new-deck' type="button">New deck</Link>
    </span>
  )

  // Here all the cards display
  const focusDeckJsx = () => (
    // { if (clicked) {
    deckCards.map(card => (
      <React.Fragment key={`${deckCards.indexOf(card)}`}>
        <h4>Cards</h4>
        <span>
          <img src={`${card}`}/>
        </span>
      </React.Fragment>
    ))
    // }
    // }
  )

  // self-explanatory?
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

  const handleSubmit = event => {
    event.persist()
    event.preventDefault()

    const queryParams = {}
    for (const property in query) {
      if (query[property] === '' || query[property] === null) {
        continue
      } else {
        queryParams[property] = query[property]
      }
    }
    mtg.card.where(queryParams)
      .then(cards => {
        setCards(cards)
        // console.log(cards[0].name) // "Squee, Goblin Nabob"
      })
  }

  const handleChange = (event) => {
    event.persist()
    const editedQuery = { ...query }
    editedQuery[event.target.name] = event.target.value

    setQuery(editedQuery)
  }

  if (!clicked) {
    return (
      <div>
        {newDeckButtonJsx}
        {decksJsx}
        <LinkHome />
      </div>
    )
  } else if (!updateClicked) {
    return (
      <React.Fragment>
        <LinkHome />
        <h1>
          {focusDeck.name}
        </h1>
        <br />
        <div>
          {focusDeckJsx}
        </div>
        <br />
        <div>
          <h1>Search</h1>
          <SearchBar // want a different search bar that already has a deck
            query={query}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          <h1>Cards</h1>
          {cardsJsx}
        </div>
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
        <LinkHome />
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
