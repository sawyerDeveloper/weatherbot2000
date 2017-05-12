import React from 'react';

export default class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather:{}
        }
    }
render() {
    return (
      <div>
          This is the Weather.
      </div>
    );
  }
}