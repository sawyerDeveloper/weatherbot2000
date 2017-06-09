import React from 'react';

export default class WeatherTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                {this.props.day.summary}
            </div>
        );
    }
}
