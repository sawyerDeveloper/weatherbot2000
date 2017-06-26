import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';

export default class HourlyDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
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
                    borderTop: '1px solid black',
                    width: '400px',
                    height: '31px',
                    verticalAlign: 'middle',
                    textAlign: 'center'
                },
                text: {
                    fontSize: '12px',          
                },
                rowElement: {
                   display: 'inline-block',
                   marginRight: '10px'
                }
            },
        })

        var time = new Date(0);
        time.setUTCSeconds(this.props.hour.time);
        var displayTime = time.getHours()
        var suffix = "AM";

        if (displayTime >= 12) {
            displayTime = displayTime - 12;
            suffix = "PM";
        }

        if(displayTime == 0){
            displayTime = 12;
        }
    

        return (
            <div style={ styles.container }>
                <div style={ styles.rowElement }>{displayTime}{suffix}</div>     
                <ReactAnimatedWeather
                    style={ styles.rowElement }
                    icon={iconMapping[this.props.hour.icon]}
                    color='black'
                    size={24}
                    animate={false}
                />
                <div style={ styles.rowElement }>{this.props.hour.summary}</div>
                <div style={ styles.rowElement }>Temp {Math.round(this.props.hour.temperature)}&#176;</div>
                <div style={ styles.rowElement }>Precip {Math.trunc(this.props.hour.precipProbability * 100)}%</div>
                <div style={ styles.rowElement }>Humid {Math.round(this.props.hour.humidity * 100)}%</div>
            </div>
        );
    }
}
