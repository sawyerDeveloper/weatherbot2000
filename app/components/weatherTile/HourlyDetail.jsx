import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';
import { iconMapping } from '../../utils/constants';

const HourlyDetail = (props) => {

    const styles = reactCSS({
    'default': {
            container: {
                borderTop: '1px solid black',
                width: 360,
                height: 31,
                textAlign: 'center',
            },
            text: {
                fontSize: 10,
            },
            rowElement: {
                display: 'inline-block',
                marginRight: 8,
                fontSize: 11
            }
        },
    })

    var time = new Date(0);
    time.setUTCSeconds(props.hour.time);
    var displayTime = time.getHours();
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
                icon={iconMapping[props.hour.icon]}
                color='black'
                size={24}
                animate={false}
            />
            <div style={ styles.rowElement }>{props.hour.summary}</div>
            <div style={ styles.rowElement }>Temp {Math.round(props.hour.temperature)}&#176;</div>
            <div style={ styles.rowElement }>Precip {Math.trunc(props.hour.precipProbability * 100)}%</div>
            <div style={ styles.rowElement }>Humid {Math.round(props.hour.humidity * 100)}%</div>
        </div>
    );   
}
export default HourlyDetail;