import React from 'react'
import Form from 'react-bootstrap/Form'
// import axios from 'axios'
// import apiUrl from '../../apiConfig.js'

const SearchBar = ({ query, handleSubmit, handleChange }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        placeholder="Snapcaster Mage"
        value={query.name}
        name="name"
        onChange={handleChange}
      />
      <select defaultValue="Boolean search options" name="name-boolean">
        <option value="&&">AND</option>
        <option value="||">OR</option>
      </select>
      <br />
      <label>Colors</label>
      <input
        placeholder=""
        value={query.colors}
        name="colors"
        onChange={handleChange}
      />
      <select defaultValue="Boolean search options" name="manaCost-boolean">
        <option value="&&">AND</option>
        <option value="||">OR</option>
      </select>
      <br />
      <label>Converted Mana Cost</label>
      <input
        placeholder="5"
        value={query.cmc}
        name="cmc"
        onChange={handleChange}
      />
      <select defaultValue="Boolean search options" name="cmc-boolean">
        <option value="&&">AND</option>
        <option value="||">OR</option>
      </select>
      <br />
      <button type="submit">Submit</button>
    </Form>
  )
}

export default SearchBar
