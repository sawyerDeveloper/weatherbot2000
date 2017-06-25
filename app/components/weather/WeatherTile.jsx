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
                    alignContent: 'center'
                },
                text: {
                    fontSize: '11px',
                    textAlign: 'center'
                }
            },
        })
        return (
            <div style={ styles.container }>
                <div style={ styles.text }>
                    {this.props.day.summary}
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
