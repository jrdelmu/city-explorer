import axios from 'axios';
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
  
  getLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_APIKEY}&q=${this.state.searchQuery}&format=json`;
    
    try {
      const response = await axios.get(url);
      const location = response.data[0];

      console.log(location);
      
      this.setState({
        location,
        error: false,
      });
    } catch (error) {
      console.error('Unable to find city', this.state.searchQuery)
      this.setState({error: true});
    }
  }

render(){
  return (

    <div> 
    <input onChange={(event) => this.setState({searchQuery: event.target.value})} placeholder="Search"></input>
    <button onClick={this.getLocation}>Explore!</button>

    {this.state.location.place_id &&
      <h2>The city is: {this.state.location.display_name}</h2>
    }

    {this.state.error && <h2>Error</h2>}
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
