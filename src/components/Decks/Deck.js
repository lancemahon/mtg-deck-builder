import React, { /* useState, */ useEffect } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Deck = ({ user, deckId }) => {
  // const [deck, setDeck] = useState()
  console.log('in Deck, user is :', user)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/decks/${deckId}`
    })
    // .then(responseData => console.log('response data is: ', responseData))
    // .then(responseData => setDeck(responseData.data.deck))
  })

  const deleteDeck = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/decks/${deckId}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
  }

  // const deckJsx = deck.cards.map(card => (
  //   <React.Fragment key={card.id}>
  //     <h4>Cards</h4>
  //     <span>
  //       <div>{card.name}</div>
  //     </span>
  //   </React.Fragment>
  // ))

  return (
    <React.Fragment>
      {
      // <h4>{deck.name}</h4>
      }
      {// {deckJsx}
      }
      <h6>Delete this deck?</h6>
      <button type='button' className='btn btn-danger' onClick={deleteDeck}>Delete</button>
    </React.Fragment>
  )
}

export default Deck
