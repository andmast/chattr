import React, { Component } from "react";


class ChatBar extends Component {

  _handleMessage = e => {
    // Handle an action up to the parent class (App.jsx) with callback function addMessage()
    if (e.key === "Enter") {
      this.props.addMessage(e.target.value);
      e.target.value ="";
    }
  };

  _handleUsername = e => {
    // Handle an action up to the parent class (App.jsx) with callback function changeUserName()
    if (e.key === "Enter") {
      this.props.changeUserName(e.target.value);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={
            this.props.currentUser.name
              ? this.props.currentUser.name
              : "Your Name (Optional)"
          }
          defaultValue={
            this.props.currentUser.name ? this.props.currentUser.name : ""
          }
          onKeyDown={this._handleUsername}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this._handleMessage}
        />
      </footer>
    );
  }
}


export default ChatBar;
