import React, { Component } from "react";


class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input clasName="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}


export default ChatBar;
