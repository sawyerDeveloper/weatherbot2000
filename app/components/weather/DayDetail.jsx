import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';

export default class DayDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if(this.props.day.length > 0){
            console.log('should render DayDetails')
            return null;
        }
        
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
                    width: '500px',
                    height: '300px',
                    background: 'white',
                    textAlign: 'center'
                },
                text: {
                    fontSize: '11px',
                },
                header: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                }
            },
        })
        return (

            <div style={ styles.container }>
                <div style={ styles.header }>
                    10 Hour Forecast
                </div>
                <ReactAnimatedWeather
                    icon={iconMapping[this.props.day.icon]}
                    color='black'
                    size={64}
                    animate={true}
                />
            </div>
        );
    }
}
