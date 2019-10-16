// import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

const Decks = () => {
  const responseData = []
  console.log('response data inside Decks: ', responseData)

  axios({
    method: 'GET',
    url: `${apiUrl}/decks`
  })
    .then(response => {
      responseData.push(response)
      console.log('response data inside .then(): ', responseData)
    })
    .catch(error => {
      console.log(error)
    })

  return responseData
}

export default Decks
