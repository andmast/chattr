import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty | Users online: {this.props.users}
        </a>
      </nav>
    );
  }
}

export default NavBar;