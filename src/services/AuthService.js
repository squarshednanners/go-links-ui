import axios from 'axios'
export default class AuthService {
  isAuthenticated() {
    return this.getUsername() !== null
  }

  isAdmin() {
    return this.isAuthenticated() && this.getRoles().indexOf('ROLE_ADMIN') > -1
  }

  createUser(createInput, successFunc, errorFunc) {
    axios({
      method: 'post',
      url: `${process.env.API_URL}/api/user/create`,
      data: createInput
    })
      .then(successFunc)
      .catch(errorFunc)
  }

  login(credentials, successFunc, errorFunc) {
    axios({
      method: 'post',
      url: `${process.env.API_URL}/oauth/token?grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      auth: { username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET }
    })
      .then(response => {
        this.setToken(response.data.access_token)
        this.retrieveUserInfo(successFunc, errorFunc)
      })
      .catch(error => {
        this.resetUser()
        errorFunc(error)
      })
  }

  retrieveUserInfo(successFunc, errorFunc) {
    axios({
      method: 'get',
      url: `${process.env.API_URL}/oauth/check_token?token=${this.getToken()}`,
      auth: { username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET }
    })
      .then(response => {
        this.setUsername(response.data.user_name)
        this.setRoles(response.data.authorities)
        successFunc()
      })
      .catch(error => {
        this.resetUser()
        errorFunc(error)
      })
  }

  logout() {
    this.resetUser()
    window.router.push({
      name: 'Login',
      query: { redirect: true }
    })
  }

  resetUser() {
    this.deleteUsername()
    this.deleteRoles()
    this.deleteToken()
  }

  getAuthHeader() {
    return { Authorization: this.getAuthBearer() }
  }

  getAuthBearer() {
    return `Bearer ${this.getToken()}`
  }

  getUsername() {
    return localStorage.getItem('auth_username')
  }

  setUsername(username) {
    localStorage.setItem('auth_username', username)
  }

  deleteUsername() {
    localStorage.removeItem('auth_username')
  }

  getToken() {
    return localStorage.getItem('auth_token')
  }

  setToken(token) {
    localStorage.setItem('auth_token', token)
  }

  deleteToken() {
    localStorage.removeItem('auth_token')
  }

  getRoles() {
    return localStorage.getItem('auth_roles')
  }

  setRoles(roles) {
    localStorage.setItem('auth_roles', roles)
  }

  deleteRoles() {
    localStorage.removeItem('auth_roles')
  }
}
