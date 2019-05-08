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
  }

  addMessage(message) {
    const newId = this.state.messages.length + 1;
    let currentUser;
    if (this.state.currentUser.name) {
      currentUser = this.state.currentUser.name;
    } else {
      currentUser = "Anonymous";
    }

    const newMessage = {
      id: newId,
      username: currentUser,
      content: message
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
  }

  changeUserName(userName) {
  this.setState({ currentUser: {name: userName} });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
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
