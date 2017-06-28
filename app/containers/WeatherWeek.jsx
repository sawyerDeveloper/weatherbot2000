import React from 'react';
import reactCSS from 'reactcss';
import WeatherTile from '../components/weatherWeek/WeatherTile.jsx';

export default class WeatherWeek extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[],
            city: ""
        }
    }

    timeStamp() {
        var date = new Date();
        var hour = date.getHours()
        var suffix = "AM";
        if (hour >= 12) {
            hour = hour - 12;
            suffix = "PM";
        }
        if(hour == 0){
            hour = 12;
        }
        return ((date.getMonth() + 1) + '/' +
            (date.getDate()) + '/' +
            date.getFullYear() + " " +
            hour + ':' +
            ((date.getMinutes() < 10)
                ? ("0" + date.getMinutes())
                : (date.getMinutes())) + ':' +
            ((date.getSeconds() < 10)
                ? ("0" + date.getSeconds())
                : (date.getSeconds()))) + " " +
            suffix;
    }

    componentDidMount(){
        this.updateWeeklyWeather()
    }

    updateWeeklyWeather(){
        //Get weather data through internal API
        fetch('/forecast/?address='+this.props.zip).then( res => res.json() ).then( obj => {
            this.setState({ dailyWeather: obj.weather, city: obj.city });
            this.props.refreshComplete(this.timeStamp());
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.refresh){
            this.updateWeeklyWeather()
        }
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    marginTop: 50
                },
                tileHolder: {
                    float: 'none',
                    padding: '5px',
                },
                homeHeader: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '18px'
                }
            },
        })

        return (
            <div style={ styles.container }>
                <div style={ styles.homeHeader }>This Week's Weather in {this.state.city}</div>
                    <div style={ styles.tileHolder }>
                        {this.state.dailyWeather.map((day) => {
                            return (
                                <WeatherTile zip={this.props.zip} hourlyWeather={this.state.hourlyWeather} day={day} key={day.time} />
                            );
                        })}
                </div>
            </div>
        );
    }
}