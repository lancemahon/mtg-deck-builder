import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
// import SearchBar from '../Cards/searchBarComponent.js'
// import AddCardForm from '../Cards/addCardForm.js'

// const mtg = require('mtgsdk')

const UpdateDeckForm = ({ user, focusDeck }) => {
  // want to make this pop up when you click to make a new deck. It will mostly be for naming purposes.
  const [formData, setFormData] = useState({ name: '', colors: '', format: '' })

  const handleChange = (event) => {
    event.persist()
    const editedFormData = { ...formData }
    editedFormData[event.target.name] = event.target.value

    setFormData(editedFormData)
  }

  const updateDeck = (event) => {
    event.persist()
    event.preventDefault()
    // making api request to PATCH
    axios({
      method: 'PATCH',
      url: `${apiUrl}/decks/${focusDeck._id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: {
        deck: {
          name: formData.name,
          colors: formData.colors,
          format: formData.format,
          cards: focusDeck.cards
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Form onSubmit={updateDeck}>
        <label>Name</label>
        <input
          placeholder={`${focusDeck.name}`}
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <label>Colors</label>
        <input
          placeholder={`${focusDeck.colors}`}
          value={formData.colors}
          name="colors"
          onChange={handleChange}
        />
        <label>Format</label>
        <input
          placeholder={`${focusDeck.format}`}
          value={formData.format}
          name="format"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Update</button>
      </Form>
    </React.Fragment>
  )
}

export default UpdateDeckForm
