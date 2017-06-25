import React from 'react';
import WeatherTile from '../components/weather/WeatherTile.jsx';
import reactCSS from 'reactcss';
import { CSSTransitionGroup } from 'react-transition-group'
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
        const styles = reactCSS({
        'default': {
                container: {
                    position: 'absolute',
                    margin: 'auto',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    width: 850,
                    height: 600,
                    background: 'grey',
                    borderRadius: '5px'
                },
                tileHolder: {
                    float: 'none',
                    padding: '5px',
                }
            },
        })
        const tiles = this.state.dailyWeather.map((day) => {
                            return (
                                <WeatherTile day={day} key={day.time}/>
                            );
                        });
        return (
            <div style={ styles.container }>
                 <div style={ styles.tileHolder }>
                    {tiles}
                </div>
            </div>
        );
    }
}