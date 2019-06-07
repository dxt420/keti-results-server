const axios = require('axios')
const accessToken1 = 'afa9bbd1a12743a482ce7fb2e21b78f0'
const accessToken2 = '91dd16599ca9418888bf8097046def9d'
const accessToken3 = 'b9bf5675f9fc44ba8da7fcaea95b6016'
const baseURL = 'https://api.dialogflow.com/v1/query?v=20150910'

module.exports = {
  sendConsult(message) {
    const data = {
      query: message,
      lang: 'en',
      sessionId: '123456789!@#$%'
    }
    return axios.post(baseURL, data, {
      headers: {
        Authorization: `Bearer ${accessToken2}`
      }
    })
  },

  sendResult(message) {
    const data = {
      query: message,
      lang: 'en',
      sessionId: '123456789!@#$%'
    }
    return axios.post(baseURL, data, {
      headers: {
        Authorization: `Bearer ${accessToken1}`
      }
    })
  }

  sendRefer(message) {
    const data = {
      query: message,
      lang: 'en',
      sessionId: '123456789!@#$%'
    }
    return axios.post(baseURL, data, {
      headers: {
        Authorization: `Bearer ${accessToken3}`
      }
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