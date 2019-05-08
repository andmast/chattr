import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "1"
        },
        {
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "2"
        }
      ]
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
        username: currentUser,
        content: message
      })
    );
  }

  changeUserName(userName) {
  this.setState({ currentUser: {name: userName} });
  }

  componentDidMount() {
    this.socket.onopen = event => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event) => {
      console.log("TCL: App -> this.socket.onmessage -> event", event.data, typeof event.data)
      const message = JSON.parse(event.data)
			console.log("TCL: App -> this.socket.onmessage -> message", message)
      const newMessage = {
        id: message.id,
        username: message.username,
        content: message.content
      };
      console.log("TCL: App -> this.socket.onmessage -> newMessage", newMessage)

      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
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
