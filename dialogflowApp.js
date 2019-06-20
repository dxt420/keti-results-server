const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion, BasicCard, Button, Image } = require('dialogflow-fulfillment')
const { dialogflow } = require('actions-on-google')
const admin = require('firebase-admin')
var server = require('./server');

console.log("In Custom FF");
console.log(server.uid);
console.log(server.firstName)

// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true
});



app.intent("Welcome", (conv) => {
  // conv.add('Hi ' + server.firstName);
  conv.add('Hi ');
});


app.intent("hh", (conv) => {
    // conv.add('Hi ' + server.firstName);
    conv.add('BIF ');
});



module.exports = app;
// express().use(bodyParser.json(), app).listen(3000);
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
