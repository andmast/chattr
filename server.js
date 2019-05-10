var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });



  // server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require("uuid");

// Set the port to 3001
const PORT = 3001;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Broadcast Function to send data to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const colorArrary = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075']

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.

wss.on('connection', (client) => {
let colorIndex = getRandomInt(colorArrary.length);
console.log("TCL: colorIndex", colorIndex)
let color = colorArrary[colorIndex];
console.log("TCL: color", color)

  if(client) {
    // Handle an postUserCount to all clients
    const userCount = {
      count: wss.clients.size,
      type: "userCount",
    };
    wss.broadcast(userCount);
  }

  client.on('message', (rawMessage) => {
    // Handle messages from the clients
    const message = JSON.parse(rawMessage);
    message.id = uuid();
    message.color = color
    switch (message.type) {
      case "postMessage":
        // handle postMessage to all clients
        message.type = "incomingMessage";
        wss.broadcast(message);
        break;
      case "postNotification":
        // handle postNotification to all clients
        message.type = "incomingNotification";
        wss.broadcast(message);
        break;
      default:
        throw new Error(`Unknown event type: ${message.type}`);
    }


  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    // Handle an postUserCount to the clients
    const userCount = {
      count: wss.clients.size,
      type: "userCount"
    };
    wss.broadcast(userCount);
  });
});