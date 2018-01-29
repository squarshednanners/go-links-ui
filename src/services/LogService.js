import axios from 'axios'

export default class LogService {
  getAllLogs(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/log/action/all`)
      .then(successFunc)
      .catch(errorFunc)
  }
}
