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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.
wss.on('connection', (client) => {
  console.log("Client connected");

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
    });
  };



  client.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    message["id"]= uuid();
    console.log("TCL: receivedMessage","id", message.id, "User", message.username, "Said", message.content)
    wss.broadcast(message)
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});