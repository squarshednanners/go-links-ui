import axios from 'axios'

export default class UserService {
  getAllUsers(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/user/all`)
      .then(successFunc)
      .catch(errorFunc)
  }

  deleteUser(username, successFunc, errorFunc) {
    axios.delete(`${process.env.API_URL}/api/user/delete?username=${username}`)
      .then(successFunc)
      .catch(errorFunc)
  }

  activateUser(username, isActive, successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/user/activate?username=${username}&active=${isActive}`)
      .then(successFunc)
      .catch(errorFunc)
  }

  addRole(username, role, successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/user/addRole?username=${username}&role=${role}`)
      .then(successFunc)
      .catch(errorFunc)
  }

  changePassword(password, successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/user/changePassword?password=${password}`)
      .then(successFunc)
      .catch(errorFunc)
  }
}
