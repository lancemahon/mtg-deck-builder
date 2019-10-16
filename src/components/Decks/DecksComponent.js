import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link } from 'react-router-dom'

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
    <React.Fragment key={deck._id}>
      <Link to={`/decks/${deck._id}`}>
        <h3>{deck.name}</h3>
      </Link>
    </React.Fragment>
  ))

  const newDeckButtonJsx = () => (
    <Link to='/new-deck'>Make a new deck</Link>
  )

  return (
    <div>
      {newDeckButtonJsx}
      {decksJsx}
    </div>
  )
}

export default Decks
