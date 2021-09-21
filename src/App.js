import React, {Component} from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchQuery: '',
      location: {},
      error: false,
    }
  }
  
  // getLocation = async () +> {
  //   const url = ''
  // }
render(){
  return (

    <div> 
    <input onChange={(event) => this. setState({searchQuery: event.target.value})} placeholder="Search"></input>
    <button onClick={this.getLocation}>Explore!</button>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload. Changes
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    );
  }
}
export default App;
