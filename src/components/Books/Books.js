import React, { useState, useEffect } from 'react'
  import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

const Books = ({ user, alerts }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/books`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(responseData => setBooks(responseData.data.books))
      .catch(console.error)
  }, [])

  const booksJsx = books.map(book => (
    <div key={book._id}>
      <Link to={`books/${book._id}`}>title: {book.title}</Link>
      <p>id: {book._id}</p>
    </div>
  ))

  return (
    <div>
      <h1>Books</h1>
      {booksJsx}
    </div>
  )
}

export default Books
