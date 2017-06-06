import React from 'react';

export default class Weather extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            weather:{}
        }
    }

    componentDidMount(){

        fetch('/weather').then( res => res.json() ).then( _weather => {
            console.log(_weather);
            this.setState({ weather: _weather });
        })
    }

    
render() {
    return (
      <div>
          This is the Weather. 
      </div>
    );
  }
}