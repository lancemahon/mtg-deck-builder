import React from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Decks from '../Decks/Decks.js'

const addCardButton = (props, { deck, user, card }) => {
  // I want to grab just the imageUrl out of 'card':
  let cardArt = ''
  if (props.card.imageUrl) { // just to make sure it exists
    cardArt = props.card.imageUrl
  }
  let deckCards = []
  if (props.deck.cards) {
    for (card in props.deck.cards) {
      deckCards.push(card)
    }
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
    console.log('props.card.imageUrl is ', props.card.imageUrl)
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
    if (deckCards.length === 0) { // if there are no cards yet
      deckCards = [cardArt] // then deckCards will just be `card`
    } else { // if there are cards already
      deckCards.push(cardArt) // push `card`
    }
    console.log('deckCards: ', deckCards)
    // add 'card' into the 'cards' field of the copy
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
  }

  return (
    <Form onSubmit={addCard}>
      <button type='submit' className='btn btn-primary'>Add to the deck!</button>
    </Form>
  )
}

export default addCardButton
