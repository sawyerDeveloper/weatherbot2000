import React from 'react';
import WeatherTile from '../components/weather/WeatherTile.jsx';

export default class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[]
        }
    }

    componentDidMount(){
        //Get weather data through internal API
        fetch('/forecast').then( res => res.json() ).then( _weather => {
            
            this.setState({ dailyWeather: _weather });
        })
    }

    render() {
        return (
            <div>
                This is the Weather. 
                {this.state.dailyWeather.map(function(day) {
                        return (
                            <WeatherTile day={day} key={day.time}/>
                        );
                    })
                }
            </div>
        );
    }
}