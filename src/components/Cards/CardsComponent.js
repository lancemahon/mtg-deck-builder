import React, { useState } from 'react'
import SearchBar from './searchBarComponent.js'
import AddCardForm from './addCardForm.js'
// import Decks from '../Decks/Decks.js'
// import axios from 'axios'
// import apiUrl from '../../apiConfig.js'
const mtg = require('mtgsdk')

const Cards = (props) => {
  const [cards, setCards] = useState([])
  const [query, setQuery] = useState({ name: '', manaCost: '', cmc: '', colors: '', type: '', supertypes: '', types: '', subTypes: '', rarity: '', set: '', text: '', artist: '', power: null, toughness: null })

  const decks = ['Yawgmoth', 'Dinosaurs', 'Voltron', 'Vampires', 'Lands Matter', 'Green Stompy', 'Hydras', 'Ninjas', 'Sea Monsters', 'Eldrazi', 'Trostani', 'Golos', 'Chainer', 'Dwarves']

  const deckLists = decks.map(deck => (
    <option key={deck.id}>{deck}</option>
  ))

  const cardsJsx = cards.map(card => (
    <span key={card.id}>
      <h4>{card.name}</h4>
      <p>id: {card.id}</p>
      <img src={card.imageUrl} />
      <br />
      <AddCardForm
        deckLists={deckLists}
        card={card}
        user={props.user}
      />
    </span>
  ))

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

  // TO DO: Make a search bar component, include here
  if (!cards) {
    return (
      <div>
        <h1>Search</h1>
        <SearchBar
          query={query}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Search</h1>
        <SearchBar
          query={query}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <h1>Cards</h1>
        {cardsJsx}
      </div>
    )
  }
}

export default Cards
