import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

const Decks = ({ user }) => {
  const [decks, setDecks] = useState([])
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

  const decksJsx = decks.map(deck => (
    <h3 key={deck._id}>{deck.name}</h3>
  ))

  return (
    <div>
      {decksJsx}
    </div>
  )
}

export default Decks
