import axios from 'axios';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Weather from './Components/weather.js'


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

      const localUrl = '';
      const localResponse = await axios.get(localUrl);
      console.log(localResponse.data);

      console.log(location);
      
      this.setState({
        location,
        error: false,
        localResponse
      }); 
    } catch (error) {
      console.error('Unable to find city', this.state.searchQuery)
      this.setState({
        error: true,
        errorMessage: `${error}. Unable to locate `,
      });
    }
  }

render(){
  return (

    <div> 
    <input onChange={(event) => this.setState({searchQuery: event.target.value})} placeholder="Search"></input>
    <button onClick={this.getLocation}>Explore!</button>

    {this.state.location.place_id &&
      <h2>{this.state.location.display_name}</h2>
    }
    {this.state.location.place_id &&(
      <Card style={{ width: '40rem' }}>
      <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_APIKEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12`} />
      <Card.Body>
        <Card.Title>Lat & Long</Card.Title>
        <Card.Text>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Latitude: {this.state.location.lat}</ListGroupItem>
        <ListGroupItem>Longitude: {this.state.location.lon}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Weather localResponse={this.state.localResponse.data} />
      </Card.Body>
    </Card>
    )}

    {this.state.error && <h2>{this.state.errorMessage}</h2>}
    </div>
    );
  }
}
export default App;
