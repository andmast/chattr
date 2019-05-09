// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require("uuid");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.
wss.on('connection', (client) => {

  if(client) {
    console.log("Client connected");
    console.log("TCL: wss.clients", wss.clients.size);
    const userCount = {
      count: wss.clients.size,
      type: "userCount"
    };
    wss.broadcast(userCount);
  }

  client.on('message', (rawMessage) => {
		console.log("TCL: rawMessage", rawMessage);
    const message = JSON.parse(rawMessage);
    message["id"] = uuid();
    switch (message.type) {
      case "postMessage":
        // handle post message
        console.log("TCL: postMessage", message);
        message.type = "incomingMessage";
        wss.broadcast(message);
        break;
      case "postNotification":
			console.log("TCL: postNotification" , message);
        // handle post notification
        message.type = "incomingNotification";
        wss.broadcast(message);
        break;
      default:
        throw new Error(`Unknown event type: ${message.type}`);
    }


  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected')
    const userCount = {
      count: wss.clients.size,
      type: "userCount"
    };
    wss.broadcast(userCount);
  });
});