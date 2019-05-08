import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }

  addMessage(message) {
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
    }));
    this.setState({ currentUser: { name: userName } });
  }

  componentDidMount() {
    this.socket.onopen = event => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event) => {
      console.log("TCL: App -> this.socket.onmessage -> event", event.data, typeof event.data)
      const message = JSON.parse(event.data)
      switch (message.type) {
        case "incomingMessage":
          // handle incoming message
          const newMessage = {
            type: "incomingMessage",
            id: message.id,
            username: message.username,
            content: message.content
          };
          const messages = this.state.messages.concat(newMessage);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
        console.log("TCL: App -> this.socket.onmessage -> incomingNotification", message)

          // handle incoming notification

          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUserName = {this.changeUserName}
        />
      </div>
    );
  }
}

export default App;
