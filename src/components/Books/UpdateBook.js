import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'

const UpdateBook = ({ user, match, alert, history }) => {
  const [book, setBook] = useState({ title: '', author: '' })
  // const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setBook(book => ({ ...book, [event.target.name]: event.target.value }))
  }

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

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: `${apiUrl}/books/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { book }
    })
      .then(() => alert({ heading: 'Success', message: 'You updated a book', variant: 'success' }))
      .then(() => history.push(`/books/${match.params.id}`))
      // .then(responseData => setUpdated(responseData.data.book._id))
      .catch(() => alert({ heading: 'Oops!', message: 'You did a bad', variant: 'danger' }))
  }

  // if (updated) {
  //   return <Redirect to={`/books/${updated}`} />
  // }

  return (
    <BookForm
      book={book}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(UpdateBook)
// import React, { useState } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig.js'
// // import { Link } from 'react-router-dom'
// import BookForm from '../shared/BookForm.js'
// import Redirect from 'react-router-dom'
//
// const CreateBook = ({ user }) => {
//   const bookObject = {
//     _id: '',
//     title: '',
//     author: ''
//   }
//   const [created, setCreated] = useState(false)
//   const [book, setBook] = useState(bookObject)
//   console.log('inside createbook: ', book)
//
//   const handleChange = (event) => {
//     event.persist()
//     setBook(book => ({ ...book, [event.target.name]: event.target.value }))
//
//     // This also works
//     // event.persist()
//     // const editedBook = { ...book }
//     // editedBook[event.target.name] = event.target.value
//     // setBook(editedBook)
//   }
//
//   const handleSubmit = (event) => {
//     event.preventDefault()
//
//     axios({
//       method: 'POST',
//       url: `${apiUrl}/books`,
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       },
//       data: {
//         book: {
//           title: book.title,
//           author: book.author
//         }
//       }
//     })
//       .then(responseData => setCreated(responseData.data.book._id))
//       .catch(console.error)
//   }
//
//   if (created) {
//     return <Redirect to={`/books/${created}`}/>
//   }
//
//   return (
//     <BookForm
//       book={book}
//       handleSubmit={handleSubmit}
//       handleChange={handleChange}
//     />
//   )
// }
//
// export default CreateBook
