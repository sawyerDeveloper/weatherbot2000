import React from 'react';
import reactCSS from 'reactcss';
import HourlyDetail from './HourlyDetail.jsx';

export default class DayDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if(this.props.hourly == null){
            console.log('should not render DayDetails')
            return null;
        }
        const dayMapping = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const styles = reactCSS({
        'default': {
                container: {
                    borderRadius: '5px',
                    width: '400px',
                    height: '350px',
                    background: 'white',
                    textAlign: 'center'
                },
                header: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                }
            },
        })

        var day = new Date(0);
        day.setUTCSeconds(this.props.hourly[0].time);
        let dayName = dayMapping[day.getDay()];

        return (

            <div style={ styles.container }>
                <div style={ styles.header }>
                    10 Hour Forecast for {dayName}
                </div>
                {this.props.hourly.map((hour) => {
                        return (
                            <HourlyDetail hour={hour} key={hour.time}/>
                        );
                    })}
            </div>
        );
    }
}