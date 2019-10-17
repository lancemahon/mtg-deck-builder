import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
// import SearchBar from '../Cards/searchBarComponent.js'
// import AddCardForm from '../Cards/addCardForm.js'

// const mtg = require('mtgsdk')

const NewDeck = ({ user, testProp }) => {
  // want to make this pop up when you click to make a new deck. It will mostly be for naming purposes.
  const [formData, setFormData] = useState({ name: '', colors: '', format: '' })

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
          format: formData.format
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Form onSubmit={makeNewDeck}>
        <label>{testProp}</label>
        <input
          placeholder="Green Stompy"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <input
          placeholder="White, Blue, Black, Red, Green"
          value={formData.colors}
          name="colors"
          onChange={handleChange}
        />
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
