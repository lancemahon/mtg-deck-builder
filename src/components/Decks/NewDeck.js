import React, { useState } from 'react'
import SearchBar from '../Cards/searchBarComponent.js'
const mtg = require('mtgsdk')

const NewDeck = () => {
  const [cards, setCards] = useState([])
  const [query, setQuery] = useState({ name: '', manaCost: '', cmc: '', colors: '', type: '', supertypes: '', types: '', subTypes: '', rarity: '', set: '', text: '', artist: '', power: null, toughness: null })

  const decks = ['Yawgmoth', 'Dinosaurs', 'Voltron', 'Vampires', 'Lands Matter', 'Green Stompy', 'Hydras', 'Ninjas', 'Sea Monsters', 'Eldrazi', 'Trostani', 'Golos', 'Chainer', 'Dwarves']

  const deckLists = decks.map(deck => (
    <option key={deck.id}>{deck}</option>
  ))

  const searchResultsJsx = cards.map(card => (
    <span key={card.id}>
      <h4>{card.name}</h4>
      <p>id: {card.id}</p>
      <img src={card.imageUrl} />
      <br />
      <select name="decklist">
        <option key='dropdown-default'>Choose a Deck</option>
        {deckLists}
      </select>
      <button className='btn btn-primary'>Add to the deck!</button>
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

  return (
    <React.Fragment>
      <h4>Search for cards to add</h4>
      <span>
        <SearchBar
          query={query}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        {searchResultsJsx}
      </span>
    </React.Fragment>
  )
}

export default NewDeck
