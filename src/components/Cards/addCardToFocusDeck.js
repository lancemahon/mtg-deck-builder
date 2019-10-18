import React from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Decks from '../Decks/Decks.js'

const addCardToFocusDeckForm = (props, { deck, user, card }) => {
  console.log('apiUrl is ', apiUrl)
  let deckCards = []
  if (props.deck.cards) {
    deckCards.push(props.deck.cards)
  }
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

  // GET the deck that matches deckName
  axios({
    method: 'GET',
    url: `${apiUrl}/decks/${props.deck._id}`,
    headers: {
      'Authorization': `Bearer ${props.user.token}`
    }
  })

  const addCard = (event) => {
    event.persist()
    event.preventDefault()
    console.log('props.deck is ', props.deck)
    console.log('props.deck.name is ', props.deck.name)
    console.log('props.card is ', props.card)
    // change 'card' into a form that my server likes
    // const cardId = card._id
    // const cardName = card.name
    // const cardManaCost = card.manaCost
    // const cardCmc = card.cmc
    // const cardColors = card.colors
    //
    // // map the cards into a new array, make sure the format is nice
    // const newArrayOfCards = deckCards.filter((card) => {
    //
    // })

    // get the deck's cards into an array locally
    // then push the new card
    if (deckCards.length !== 0) { // if there are already cards
      deckCards.push(props.card) // push `card`
    } else { // if there are no cards yet
      deckCards = [props.card] // then deckCards will just be `card`
    }

    // add 'card' into the 'cards' field of the copy
    // make patch request with new deck data
    axios({
      method: 'PATCH',
      url: `${apiUrl}/decks/${props.deck._id}`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: {
        cards: deckCards
      }
    })
  }

  //   id: {
  //   type: String
  // },
  // name: {
  //   type: String,
  //   required: true
  // },
  // manaCost: {
  //   type: String,
  //   required: true
  // },
  // cmc: {
  //   type: Number,
  //   required: true
  // },
  // colors: {
  //   type: Array,
  //   required: true
  // },
  // type: {
  //   type: String
  // },
  // supertypes: {
  //   type: String
  // },
  // types: {
  //   type: String
  // },
  // subTypes: {
  //   type: String
  // },
  // rarity: {
  //   type: String,
  //   required: true
  // },
  // set: {
  //   type: String,
  //   required: true
  // },
  // text: {
  //   type: String
  // },
  // artist: {
  //   type: String
  // },
  // power: {
  //   type: Number
  // },
  // toughness: {
  //   type: Number
  // }

  return (
    <Form onSubmit={addCard}>
      <button type='submit' className='btn btn-primary'>Add to the deck!</button>
    </Form>
  )
}

export default addCardToFocusDeckForm
