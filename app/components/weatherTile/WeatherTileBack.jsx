import React from 'react';
import reactCSS from 'reactcss';
import HourlyDetail from './HourlyDetail.jsx';
import { iconMapping } from '../../utils/constants';
const WeatherTileBack = (props) => {

    if(props.hourly == null){
        console.log('should not render DayDetails')
        return null;
    }
    const styles = reactCSS({
    'default': {
            container: {
                borderRadius: 5,
                background: 'white',
                textAlign: 'center',
                width: 360,
                height: 350,
                position: 'absolute',
                left: -150,
                top: -200,
                overflow: 'hidden'
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
                10 Hour Forecast for {props.dayName}
            </div>
            {props.hourly.map((hour) => {
                    return (
                        <HourlyDetail hour={hour} key={hour.time}/>
                    );
                })}
        </div>
    );
    
}
export default WeatherTileBack;