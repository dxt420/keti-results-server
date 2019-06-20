const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')
const firebase = require('firebase')
const admin = require('firebase-admin')
const functions = require('firebase-functions')

require('dotenv').config()

const shortId = require('shortid')
const dialogFlow = require('./diagflow')
const app = express()


var serviceAccount = require("./serviceAccountKey.json");




const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyBbcT4BZ8tiDWsrbV16eFgo_z17bqBsOBs",
  authDomain: "chanjia-e9ddb.firebaseapp.com",
  databaseURL: "https://chanjia-e9ddb.firebaseio.com",
  projectId: "chanjia-e9ddb",
  storageBucket: "chanjia-e9ddb.appspot.com",
  messagingSenderId: "885878744432"

}

admin.initializeApp(firebaseConfig)

// admin.initializeApp()

const pusher = new Pusher({
  appId: '763384',
  key: '7e68e39c122f6cbf6b79',
  secret: '9be54d8e58c065d44a06',
  cluster: 'mt1',
  encrypted: true
})







// var app = new WebhookClient({ request, response });

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())




// Required by Firebase
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


var uid
var firstName

console.log(firstName);


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements





app.post('/getUser', (req, res) => {

  //console.log(req.headers)

  const token = req.headers.authorization.split('Bearer ')[1]

  return admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      uid = decodedToken.uid;
      console.log(uid);
      // console.log('Dext was here');

      admin.database().ref('users').once("value").then((snapshot) => {
        
        firstName = snapshot.child(uid).child("firstName").val();
        console.log(firstName);
     
      });

      res.status(200).send('Looks good!')

    })
    .catch(err => res.status(403).send('Unauthorized'))


})

const dialogFlowApp = require("./dialogflowApp");

app.post('/initiate',  dialogFlowApp);



app.post('/messageConsult', async (req, res) => {
  // simulate actual db save with id and createdAt added
  // console.log(req);
  console.log(req.body);
  console.log(req.body.token);
  console.log("||||||||||||||  BODY ||||||||||||");
  console.log(req);
  
  console.log("||||||||||||||  TOKEN ||||||||||||");
  console.log(req.body['token']);
  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }
  //update pusher listeners
  pusher.trigger('chat-bot', 'chat', chat)

  const message = chat.message;

  const response = await dialogFlow.sendConsult(message);



  if (response.data.result.fulfillment.messages[0].type == 1) {
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      extra: response.data.result.fulfillment.messages[0],
      type: 'bot',
      kind: 'ONE',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })


  } else {
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      type: 'bot',
      kind: 'ZERO',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })

  }



  res.send(chat)


})


app.post('/messageRefer', async (req, res) => {
  // simulate actual db save with id and createdAt added
 
  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }
  //update pusher listeners
  pusher.trigger('chat-bot', 'chat', chat)

  const message = chat.message;

  const response = await dialogFlow.sendRefer(message);



  if (response.data.result.fulfillment.messages[0].type == 1) {
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      extra: response.data.result.fulfillment.messages[0],
      type: 'bot',
      kind: 'ONE',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })


  } else {
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      type: 'bot',
      kind: 'ZERO',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })

  }



  res.send(chat)


})


// });
app.post('/messageResults', async (req, res) => {


  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }

//   //update pusher listeners
  pusher.trigger('chat-bot', 'chat', chat)

  const message = req.body.message;
//   // console.log(message);
  const response = await dialogFlow.sendResult(message);


    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      messages: response.data.result.fulfillment.messages,
      type: 'bot',
      kind: 'ZERO',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })


  res.send(chat);


})

app.listen(process.env.PORT, () => console.log('Listening at port' + process.env.PORT))

// app.listen('5000', () => console.log('Listening at port 5000'))






exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports.uid = uid;
module.exports.firstName = firstName



