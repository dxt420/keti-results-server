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
  conv.add('Hi');

  // conv.add('Hi there. I am Keti and I am going to be your E-oncolgist today ');
  // conv.add('Thank you for choosing me');
  // // conv.add('How can i help you? ');
});


app.intent("IntroTwo", (conv) => {
  conv.add('I may have to ask you a couple of personal questions');
  conv.add('This will help ease the assessment of the consultaion');
  conv.add('Are you okay with sharing personal information with me ?');
});






module.exports = app;

