import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import sfx from 'simple-sfx';

class App extends Component {
  constructor(props) {
    super(props);
    this.audio = new sfx([
      process.env.PUBLIC_URL + 'start.ogg'
    ], true);
  }

  clickLogo = (e) => {
    this.audio.play('start');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.clickLogo} />
          <p>
            Click on the logo to test the sound!
          </p>
          <p>
            Watch the console for more.
          </p>
          <a
            className="App-link"
            href="https://github.com/tamasszoke/simple-sfx"
            target="_blank"
            rel="noopener noreferrer"
          >
            simple-sfx module
          </a>
        </header>
      </div>
    );
  }
}

export default App;
