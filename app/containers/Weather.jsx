import React from 'react';
import WeatherWeek from '../containers/WeatherWeek.jsx';

import reactCSS from 'reactcss';
export default class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zips: ["23324"],
            dailyWeather:[]
        }
        console.log('weather')
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
                }
            },
        })

        return (
            <div style={ styles.container }>
                {this.state.zips.map((zip) => {
                    return (
                        <WeatherWeek key={zip} zip={zip}/>
                    );
                })}
                
            </div>
        );
    }
}