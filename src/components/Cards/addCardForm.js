import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Decks from '../Decks/Decks.js'

const addCardForm = (props, { deckLists, user, card }) => {
  const [deck, setDeck] = useState(null)

  // const decks = ['Yawgmoth', 'Dinosaurs', 'Voltron', 'Vampires', 'Lands Matter', 'Green Stompy', 'Hydras', 'Ninjas', 'Sea Monsters', 'Eldrazi', 'Trostani', 'Golos', 'Chainer', 'Dwarves']

  const decksLister = () => {
    const listOfDecks = []
    console.log('list of decks inside Decks: ', listOfDecks)

    axios({
      method: 'GET',
      url: `${apiUrl}/decks`
    })
      .then(response => {
        listOfDecks.push(response.data.decks)
        console.log('list of decks inside .then(): ', listOfDecks)
      })
      .catch(error => {
        console.log(error)
      })

    return listOfDecks
  }

  const handleChange = (event) => {
    event.persist()
    const deckName = event.target.value
    console.log('deckName is :', deckName)
    setDeck(decksLister[deckName])

    // GET the deck that matches deckName
    axios({
      method: 'GET',
      url: `${apiUrl}/decks/${deckName._id}`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
  }

  const addCard = (event) => {
    event.persist()
    event.preventDefault()
    deck.cards.push(card)

    // add 'card' into the 'cards' field of the copy
    // make patch request with new deck data
    axios.patch({
      url: `${apiUrl}/decks/${deck._id}`
    })
  }

  return (
    <Form onSubmit={addCard}>
      <select name="decklist" onChange={handleChange}>
        <option key='dropdown-default'>Choose a Deck</option>
        {props.deckLists}
      </select>
      <button type='submit' className='btn btn-primary'>Add to the deck!</button>
    </Form>
  )
}

export default addCardForm
