import apiUrl from '../apiConfig'
import axios from 'axios'

export const getCards = (queryParams) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/cards' + queryParams
  })
}
