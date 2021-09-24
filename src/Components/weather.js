import React, {Component} from 'react';

export default class Weather extends Component {
  render(){
    return (
      <div>
        {this.props.localResponse[0].date && this.props.localResponse.map((city, idx) => (<h3 key={idx}>{city.date}<br></br>{city.description}</h3> ))}
      </div>
    )
  }
}