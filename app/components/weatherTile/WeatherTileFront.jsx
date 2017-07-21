import React from 'react';
import reactCSS from 'reactcss';
import { iconMapping } from '../../utils/constants';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherTileFront = (props) => {

    const styles = reactCSS({
        'default': {
                container: {
                    borderRadius: '5px',
                    width: '100px',
                    height: '100px',
                    background: 'white',
                    textAlign: 'center',
                    cursor: 'pointer'
                },
                text: {
                    fontSize: '11px',
                    userSelect: 'none'
                },
                dayText: {
                    fontSize: '13px',
                    fontWeight: 'bold'
                }
            },
        })

    return (
        <div style={ styles.container }>
            <div style={ styles.text }>
                <div style={ styles.dayText }>{props.dayName}</div>
                <div>Temp {Math.round(props.day.temperatureMax)}&#176;</div>
                <div>Precip {Math.trunc(props.day.precipProbability * 100)}%</div>
                <div>Humid {Math.round(props.day.humidity * 100)}%</div>
            </div>
            <ReactAnimatedWeather
                icon={iconMapping[props.day.icon]}
                color='black'
                size={32}
                animate={true}
            />
        </div>
        );
}
export default WeatherTileFront
