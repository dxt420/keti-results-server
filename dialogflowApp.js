const { dialogflow } = require('actions-on-google')

var server = require('./server');

// console.log("In Custom FF");
// console.log(server.uid);
// console.log(server.firstName)

// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true
});



app.intent("Welcome", (conv) => {
  // conv.add('Hi ' + server.firstName);
  console.log(conv)
  conv.add('Hi there');
});


app.intent("Fine", (conv) => {
    conv.add('PDL ');
});



module.exports = app;

