import React from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig.js'

const SearchBar = ({ query, handleSubmit, handleChange }) => {
  // const [query, setQuery] = useState({ name: '', manaCost: '', cmc: '', colors: '', type: '', supertypes: '', types: '', subTypes: '', rarity: '', set: '', text: '', artist: '', power: null, toughness: null })
  // const [cards, setCards] = useState([])

  // const handleChange = (event) => {
  //   event.persist()
  //   const editedQuery = { ...query }
  //   editedQuery[event.target.name] = event.target.value
  //
  //   setQuery(editedQuery)
  // }
  //   const handleChange = (event) => {
  //     event.persist()
  //     const editedMovie = { ...movie }
  //     editedMovie[event.target.name] = event.target.value
  //
  //     setMovie(editedMovie)
  //   }
  // const handleSubmit = event => {
  //   event.persist()
  //   event.preventDefault()
  //
  //   let queryParams = ''
  //   for (const property in query) {
  //     queryParams = `${queryParams}` + ` ${query[property]}`
  //   }
  //
  //   axios({
  //     url: `${apiUrl}/cards${queryParams}`,
  //     method: 'GET'
  //   })
  //     .then(responseData => setCards(responseData.data.cards))
  // }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  )
}

export default SearchBar
