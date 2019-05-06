import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
    <div>
      <NavBar/>
      <Main />
      <Footer/>
    </div>
    );
  }
}

class NavBar extends Component {
  render (){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
      </nav>
    );
  }

}

class Footer extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input
          clasName="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">
            I won't be impressed with technology until I can download food.
          </span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default App;
