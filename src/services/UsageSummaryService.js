import axios from 'axios'

export default class UsageSummaryService {
  getTotalSummary(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/summary/usage/total`)
      .then(successFunc)
      .catch(errorFunc)
  }

  getHourlySummary(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/summary/usage/hour`)
      .then(successFunc)
      .catch(errorFunc)
  }

  getDailySummary(successFunc, errorFunc) {
    axios.get(`${process.env.API_URL}/api/summary/usage/day`)
      .then(successFunc)
      .catch(errorFunc)
  }
}
