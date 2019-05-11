import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      messages: [],
      onlineusers: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  addMessage(message) {
    // handle postMessage to the Socket Server
    let currentUser;
    if (this.state.currentUser.name) {
      currentUser = this.state.currentUser.name;
    } else {
      currentUser = "Anonymous";
    }
    this.socket.send(
      JSON.stringify({
        type: "postMessage",
        username: currentUser,
        content: message
      })
    );
  }

  changeUserName(userName) {
    // handle postNotification to the Socket Server
    let currentUser;
    if (this.state.currentUser.name) {
      currentUser = this.state.currentUser.name;
    } else {
      currentUser = "Anonymous";
    }
    this.socket.send(
      JSON.stringify({
        type: "postNotification",
        content: `${currentUser} has changed their name to ${userName}`
      })
    );
    this.setState({ currentUser: { name: userName } });
  }

  componentDidMount() {
    this.socket.onopen = event => {
      // checking if Socket server is up and connected to
      console.log("Connected to server");
    };

    this.socket.onmessage = event => {
      // Handle messages from the socket server
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "userCount":
          // handle incominguserCount from the socket server
          this.setState({ onlineusers: message.count });
          break;
        case "incomingMessage":
          // handle incomingMessage from the socket server
          const newMessage = {
            type: "incomingMessage",
            id: message.id,
            username: message.username,
            content: message.content,
            color: message.color
          };
          const messages = this.state.messages.concat(newMessage);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          // handle incoming notification from the socket server
          const newNotification = {
            type: "incomingNotification",
            id: message.id,
            content: message.content
          };
          const notifications = this.state.messages.concat(newNotification);
          this.setState({ messages: notifications });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar users={this.state.onlineusers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUserName={this.changeUserName}
        />
      </div>
    );
  }
}

export default App;
