import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'

const CreateBook = ({ user }) => {
  const bookObject = {
    _id: '',
    title: '',
    author: ''
  }
  const [created, setCreated] = useState(false)
  const [book, setBook] = useState(bookObject)

  const handleChange = event => {
    event.persist()
    setBook(book => ({ ...book, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/books`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: {
        book: {
          title: book.title,
          author: book.author
        }
      }
    })
      .then(responseData => setCreated(responseData.data.book._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/books/${created}`} />
  }

  return (
    <BookForm
      book={book}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreateBook
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
