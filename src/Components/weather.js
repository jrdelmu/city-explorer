import { Component } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";


export default class weatherRender extends Component {
  render() {
    return (
      <Container>
        {this.props.weather.map((weatherData, idx) => {
            return(
            <Card key={idx}>
            <Card.Title></Card.Title>  
              <Card.Body>
                <Card.Text>Date: {weatherData.date}</Card.Text>
                <Card.Text>Report: {weatherData.description}</Card.Text>
              </Card.Body>
            </Card>
            )
        })};
      </Container>
    );
  };
}