import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    console.log(this.props.messages);
    const Messages = this.props.messages.map(message => {
      console.log("Message in map",message);
      return <Message message={message} />;
    });
    console.log("Messages", Messages);
    return (
      <main className="messages">
      {Messages}


        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}



export default MessageList;
