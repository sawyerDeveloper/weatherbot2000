import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';
import WeatherTileFront from './WeatherTileFront.jsx';
import WeatherTileBack from './WeatherTileBack.jsx';
import HourlyDetail from './HourlyDetail.jsx';

export default class WeatherTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            hourly: []
        };

        this.flip = this.flip.bind(this);
    }
    
    componentDidMount(){
        fetch('/forecast/hourly/?address='+this.props.zip+',time='+this.props.day.time).then( res => res.json() ).then( _weather => {
            let hours = [_weather[12],_weather[13],_weather[14],_weather[15],_weather[16],_weather[17],_weather[18],_weather[19],_weather[20],_weather[21],]
            this.setState({ 
                hourly: hours
            });
            console.log(hours)
        })
    }
    getHourly(){
        fetch('/forecast/hourly/?address='+this.props.zip+',time='+this.props.day.time).then( res => res.json() ).then( _weather => {
            let hours = [_weather[12],_weather[13],_weather[14],_weather[15],_weather[16],_weather[17],_weather[18],_weather[19],_weather[20],_weather[21],]
            this.setState({ 
                hourly: hours,
                flipped: true
            });
            console.log(hours)
        })
    }

    flip(){
        if(this.state.flipped == false){
            this.getHourly()
        } else {
            this.setState({
                //hourly: null,
                flipped: false
            })
        }
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
                    width: 100,
                    height: 100,
                    perspective: 1000,
                    display: 'block',
                    position: 'relative',
                    float: 'left',
                    marginRight: 5
                },
                tile: {
                    height: '100%',
                    position: 'relative',
                    transition: 'all 1s ease-in-out',
                    width: '100%',
                    transformStyle: 'preserve-3d',
                },
                tileFront: {
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    backfaceVisibility: 'hidden',
                    borderRadius: 5,
                    background: 'white',
                    textAlign: 'center',
                    transition: 'all 1s ease-in-out',
                },
                tileFrontText: {
                    fontSize: 11
                },
                tileFrontDayText: {
                    fontSize: 13,
                    fontWeight: 'bold'
                },
                tileBack: {
                    borderRadius: 5,
                    background: 'white',
                    textAlign: 'center',
                    width: 360,
                    height: 350,
                    position: 'absolute',
                    left: -100,
                    top: -100,
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                },
                tileBackHeader: {
                    fontSize: 18,
                    fontWeight: 'bold'
                },
                hourlyDetailContainer: {
                    borderTop: '1px solid black',
                    width: 360,
                    height: 31,
                    textAlign: 'center',
                },
                hourlyDetailRowElement: {
                    display: 'inline-block',
                    marginRight: 10,
                    fontSize: 11
                }
            },
            'flipped': {
                tile: {
                    transform: 'rotateY(180deg)'
                },
                tileBack:{
                    zIndex: 1000
                },
                tileFront: {
                    transform: 'scale3d(4,4,4)'
                }
            }
        }, this.state);

        var day = new Date(0);
        day.setUTCSeconds(this.props.day.time);
        let dayNum = day.getDay();
        let dayName = dayMapping[dayNum];

        return (
            <div onClick={this.flip} style={ styles.container }>
                <div style={ styles.tile }>
                    <div style={ styles.tileFront }>
                        <div style={ styles.tileFrontText }>
                            <div style={ styles.tileFrontDayText }>{dayMapping[dayNum]}</div>
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
                    <div style={ styles.tileBack }>
                        <div style={ styles.tileBackHeader }>
                            10 Hour Forecast for {dayName}
                        </div>
                        {this.state.hourly.map((hour) => {
                            var time = new Date(0);
                            time.setUTCSeconds(hour.time);
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
                                    <div style={ styles.hourlyDetailContainer } key={hour.time}>
                                        <div style={ styles.hourlyDetailRowElement }>{displayTime}{suffix}</div>     
                                        <ReactAnimatedWeather
                                            style={ styles.hourlyDetailRowElement }
                                            icon={iconMapping[hour.icon]}
                                            color='black'
                                            size={24}
                                            animate={false}
                                        />
                                        <div style={ styles.hourlyDetailRowElement }>{hour.summary}</div>
                                        <div style={ styles.hourlyDetailRowElement }>Temp {Math.round(hour.temperature)}&#176;</div>
                                        <div style={ styles.hourlyDetailRowElement }>Precip {Math.trunc(hour.precipProbability * 100)}%</div>
                                        <div style={ styles.hourlyDetailRowElement }>Humid {Math.round(hour.humidity * 100)}%</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}
/*



*/