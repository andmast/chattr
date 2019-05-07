import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx";




class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
    <div>
      <NavBar/>
      <MessageList />
      <ChatBar />
    </div>
    );
  }
}

export default App;
