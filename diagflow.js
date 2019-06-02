const axios = require('axios')
const accessToken = 'afa9bbd1a12743a482ce7fb2e21b78f0'
const baseURL = 'https://api.dialogflow.com/v2/detectIntent'
module.exports = {
  send (message) {
    const data = {
      query: message,
      lang: 'en',
      sessionId: '123456789!@#$%'
    }
    return axios.post(baseURL, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  }
}
