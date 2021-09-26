import axios from 'axios';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// import logo from './logo.svg';
import './App.css';
import Weather from './Components/weather'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchQuery: '',
      location: {},
      error: false,
      weather: [],
    }
  }
  
  getLocation = async () => {
    const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_APIKEY}&q=${this.state.searchQuery}&format=json`;
    
    try {
      const locationResponse = await axios.get(locationUrl);
      const location = locationResponse.data[0];

      console.log(location);
      
      this.setState({
        location,
        error: false,
      });

      this.getWeather();
    
    }catch (error) {
      console.error('Unable to find city', this.state.searchQuery)
      this.setState({
        error: true,
        errorMessage: `${error}. Unable to locate `,
      });
    }
  }

  getWeather = async () => {
    const weatherUrl = `http://localhost:3001/weatherData?lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
    console.log(weatherUrl);
    try {
      const weatherResponse = await axios.get(weatherUrl);
      const weather = weatherResponse.data;
      console.log(weather);

      this.setState({
        weather,
        error: false,
      })

    } catch (error) {
      console.error('Unable to find weather data')
      this.setState({
        error: true,
        errorMessage: `${error}. Unable to fetch weather data `,
    })
  }
}

render(){
  return (

    <div class='card'> 
    <input onChange={(event) => this.setState({searchQuery: event.target.value})} placeholder="Search"></input>
    <button onClick={this.getLocation}>Explore!</button>

    {this.state.location.place_id &&
      <h2>{this.state.location.display_name}</h2>
    }
    {this.state.location.place_id &&(
      <Card style={{ width: '40rem' }}>
      <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_APIKEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12`} />
      <Card.Body>
        <Card.Title>City Data</Card.Title>
        <Card.Text>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Latitude: {this.state.location.lat}</ListGroupItem>
        <ListGroupItem>Longitude: {this.state.location.lon}</ListGroupItem>
      </ListGroup>
      <Card.Body>
      <h2>5 Day Forecast</h2>
      <Weather weather={this.state.weather}/>
      </Card.Body>
    </Card>
    )}

    {this.state.error && <h2>{this.state.errorMessage}</h2>}
    </div>
    );
  }
}
export default App;
