import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';

export default class WeatherTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };

        console.log(this.props.day)
    }

    render() {
        const dayMapping = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const iconMapping = {
            "clear-day":"CLEAR_DAY",
            "clear-night":"CLEAR_NIGHT",
            "partly-cloudy-day":"PARTLY_CLOUDY_DAY",
            "partly-cloudy-night":"PARTLY_CLOUDY_NIGHT",
            "rain":"RAIN",
            "cloudy":"CLOUDY",
            "sleet":"SLEET",
            "snow":"SNOW",
            "wind":"WIND",
            "fog":"FOG"
        }
        const styles = reactCSS({
        'default': {
                container: {
                    borderRadius: '5px',
                    width: '100px',
                    height: '100px',
                    background: 'white',
                    float: 'left',
                    marginRight: '5px',
                    textAlign: 'center'
                },
                text: {
                    fontSize: '11px',
                    
                },
                dayText: {
                    fontSize: '13px',
                    fontWeight: 'bold'
                }
            },
        })

        var day = new Date(0);
        day.setUTCSeconds(this.props.day.time);
        let dayNum = day.getDay();
        
        return (
            <div onClick={(day) => this.props.openDetail(dayNum)} style={ styles.container }>
                <div style={ styles.text }>
                    <div style={ styles.dayText }>{dayMapping[dayNum]}</div>
                    <div>Temp {Math.round(this.props.day.temperatureMax)}&#176;</div>
                    <div>Precip {Math.trunc(this.props.day.precipProbability * 100)}%</div>
                    <div>Humid {Math.round(this.props.day.humidity * 100)}%</div>
                </div>
                <ReactAnimatedWeather
                    icon={iconMapping[this.props.day.icon]}
                    color='black'
                    size={32}
                    animate={true}
                />
            </div>
        );
    }
}
