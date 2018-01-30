import axios from 'axios'

export default class LinkService {
  getAllLinks(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/go/all`)
      .then(successFunc)
      .catch(errorFunc)
  }

  createLink(createInput, successFunc, errorFunc) {
    axios.post(`${process.env.API_URL}/api/go/create`, createInput)
      .then(successFunc)
      .catch(errorFunc)
  }

  deleteLink(linkName, successFunc, errorFunc) {
    axios.delete(`${process.env.API_URL}/api/go/delete?name=${linkName}`)
      .then(successFunc)
      .catch(errorFunc)
  }

  searchLinks(searchString, successFunc, errorFunc) {
    axios.post(`${process.env.API_URL}/api/go/search`, searchString, { headers: { 'Content-Type': 'text/plain' } })
      .then(successFunc)
      .catch(errorFunc)
  }
}
