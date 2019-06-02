const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion, BasicCard, Button, Image } = require('dialogflow-fulfillment')
const { dialogflow } = require('actions-on-google')
// const dialogFlow = require('./diagflow')

// const agent = new WebhookClient({
//   request: req,
//   response: res
// });

// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true
});




// Handlers go here..
// app.intent("Transplant Fallback", conv => {
//   // handler for this intent



//   // return admin.database().ref('users').once("value").then((snapshot) => {
//   //   var lastName = snapshot.child(uid).child("firstName").val();
//   //   // agent.add(`Thats great to hear. Anyways, how can i help you today ` + lastName);
//   //   agent.add(lastName, +`with all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

//   //   You can follow the guidelines of using this tool by following this link `);
//   // });

//   agent.add(new Card({

//     title: `With all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

//  You can follow the guidelines of using this tool by following this link `,
//     imageUrl: 'https://s3-external-1.amazonaws.com/com-amazon-mas-catalog/amzn1.devportal.fileupload.e9ee260c6e5040a5aa59a2ef5c18e41f_b9d3f723-da8d-47bf-9074-8539f0552994_7b47ec9987aec186f29aca62cda86b43',
//     //text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
//     buttonText: 'Read Guidelines',
//     buttonUrl: 'https://cdarh.org/product.html'
//   }));
// });

// app.intent("Say_Something_Silly", conv => {
//   // handler for this intent
// });


app.intent("hpv", (conv) => {








  // handler for this intent
  //   return admin.database().ref('users').once("value").then((snapshot) => {
  //   var lastName = snapshot.child(uid).child("firstName").val();
  //   // agent.add(`Thats great to hear. Anyways, how can i help you today ` + lastName);
  //   conv.ask('Hi ' +lastName);
  // });
  conv.add(`Hi `);
  conv.add(`You good`);


  console.log("--------------------------------");
  console.log("HPV Conv Request =>", conv);
  console.log("--------------------------------");

  console.log("--------------------------------");
  console.log("Items =>", conv.responses);
  console.log("--------------------------------");

    // console.log(conv.request);
    const chat = {
    message: conv.responses,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }

  pusher.trigger('chat-bot', 'chat', chat)

  
  // conv.ask(`kick it balotelli`);
});


app.intent("hpv - yes", (conv) => {
  // handler for this intent

// console.log(conv);


  conv.ask(`get capture`);
  conv.ask(`kick it balotelli`);


});










module.exports = app;
// express().use(bodyParser.json(), app).listen(3000);
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
