const axios = require('axios')
const accessToken = 'afa9bbd1a12743a482ce7fb2e21b78f0'
const baseURL = 'https://api.dialogflow.com/v1/query?v=20150910'

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


// const baseURL = 'https://dialogflow.googleapis.com/v2/{session=projects/*/agent/sessions/*}:detectIntent'


// module.exports = {
//   send (message) {
//     const data = {
//       query: message,
//       lang: 'en',
//       sessionId: '123456789!@#$%'
//     }
//     return axios.post(baseURL, data, {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     })
//   }
  
// }


