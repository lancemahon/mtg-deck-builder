import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
// import SearchBar from '../Cards/searchBarComponent.js'
// import AddCardForm from '../Cards/addCardForm.js'

// const mtg = require('mtgsdk')

const NewDeck = ({ user }) => {
  // want to make this pop up when you click to make a new deck. It will mostly be for naming purposes.
  const [formData, setFormData] = useState({ name: '', colors: '', format: '', cards: [] })

  const handleChange = (event) => {
    event.persist()
    const editedFormData = { ...formData }
    editedFormData[event.target.name] = event.target.value

    setFormData(editedFormData)
  }

  const makeNewDeck = (event) => {
    event.persist()
    event.preventDefault()
    // making api request to POST
    axios({
      method: 'POST',
      url: `${apiUrl}/decks`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: {
        deck: {
          name: formData.name,
          colors: formData.colors,
          format: formData.format,
          cards: formData.cards
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Form onSubmit={makeNewDeck}>
        <label>Name</label>
        <input
          placeholder="Green Stompy"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <label>Colors</label>
        <input
          placeholder="White, Blue, Black, Red, Green"
          value={formData.colors}
          name="colors"
          onChange={handleChange}
        />
        <label>Format</label>
        <input
          placeholder="commander"
          value={formData.format}
          name="format"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Create</button>
      </Form>
    </React.Fragment>
  )
}

export default NewDeck
