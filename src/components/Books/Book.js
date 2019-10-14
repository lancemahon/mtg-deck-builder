import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link, withRouter } from 'react-router-dom'

const Book = ({ user, alerts, match }) => {
  const [book, setBook] = useState({})

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/books/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      // .then(responseData => console.log(responseData.data.book))
      .then(responseData => setBook(responseData.data.book))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h3>
        Book
      </h3>
      Title: {book.title}
      <Link to={`/books/${match.params.id}/update-book`}>
        <button className='btn btn-primary'>Update</button>
      </Link>
    </div>
  )
}

export default withRouter(Book)
