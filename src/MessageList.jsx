import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    const Messages = this.props.messages.map(message => {
      return <Message key={message.id} message={message} />;
    });
    return (
      <main className="messages">
      { this.props.messages.map( message => {
        if (message.type === 'incomingMessage') {
          return <Message key={message.id} message={message} />
          } else {
            return <Notification key={message.id} content={message.content}/>
        }


      })
    }

      </main>
    );
  }
}



export default MessageList;
