import React, { Component } from 'react'
import logo from '../public/logo.png';
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
   
  render() {
    return (
      <div className="App">
          <nav className="navbar pure-menu pure-menu-horizontal">
      
      <a href="#" className="pure-menu-heading pure-menu-link"><img id="headerimg" src={logo} className="App-logo" alt="logo" />Tutorialsurf</a>
    </nav>

    <main className="container">
    <p id="contentimg"><img  id="centerimg" src={logo} className="App-logo" alt="centered image" /></p> 
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>Blockchain Starter Kit</h1>
          <p>Owing to Tutorialsurf</p>
          <p>By Vasu</p>
       <code> <strong>Edit </strong>src/App.js <strong> save and  reload. </strong></code> 
        </div>
    
      </div>
    </main>
      </div>
    );
  }
}

export default App
