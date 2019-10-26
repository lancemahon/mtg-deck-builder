import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Decks from '../Decks/Decks.js'

const addCardToFocusDeckForm = (props, { deck, user, card }) => {
  const [cardAdded, setCardAdded] = useState(false)
  // I want to grab just the imageUrl out of 'card':
  let cardArt = ''
  if (props.card.imageUrl) { // just to make sure it exists
    cardArt = props.card.imageUrl
  }

  console.log('Deck prop: ', props.deck)
  let deckCards = []
  console.log('first one, deckCards: ', deckCards)
  if (props.deck.cards.length !== 0) { // if the deck has cards already
    // this needs to be a map. push will result in pushing the ARRAY at props.deck.cards into deckCards. But we want to push the VALUES. So map might work
    deckCards = props.deck.cards.map(card => card)
  }
  console.log('just pushed props.deckcards, deckCards: ', deckCards)
  // const decksLister = () => {
  //   const listOfDecks = []
  //   console.log('list of decks inside Decks: ', listOfDecks)
  //
  //   axios({
  //     method: 'GET',
  //     url: `${apiUrl}/decks`
  //   })
  //     .then(response => {
  //       listOfDecks.push(response.data.decks)
  //       console.log('list of decks inside .then(): ', listOfDecks)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  //
  //   return listOfDecks
  // }

  // const handleChange = (event) => {
  //   event.persist()
  //   const deckName = event.target.value
  //   console.log('deckName is :', deckName)
  //   setDeck(decksLister[deckName])

  const addCard = (event) => {
    event.persist()
    event.preventDefault()

    // // GET the deck that matches deckName
    // const latestDeck = axios({
    //   method: 'GET',
    //   url: `${apiUrl}/decks/${props.deck._id}`,
    //   headers: {
    //     'Authorization': `Bearer ${props.user.token}`
    //   }
    // })

    // console.log('props.deck is ', props.deck)
    // console.log('props.deck.name is ', props.deck.name)
    // console.log('props.card is ', props.card)

    // get the deck's cards into an array locally
    // then push the new card
    console.log('just before pushing, deckCards: ', deckCards)
    deckCards.push(cardArt)
    console.log('just pushed cardArt, deckCards: ', deckCards)

    // make patch request with new deck data
    axios({
      method: 'PATCH',
      url: `${apiUrl}/decks/${props.deck._id}`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: {
        deck: {
          cards: deckCards
        }
      }
    })
      .then(setCardAdded(true))
  }

  if (cardAdded) { // will render when you click 'Add to the deck!'
    return (
      <React.Fragment>
        <h4>Added to {props.deck.name}</h4>
        <Form onSubmit={addCard}>
          <button type='submit' className='btn btn-primary'>Add to the deck!</button>
        </Form>
      </React.Fragment>
    )
  }
  return (
    <Form onSubmit={addCard}>
      <button type='submit' className='btn btn-primary'>Add to the deck!</button>
    </Form>
  )
}

export default addCardToFocusDeckForm
