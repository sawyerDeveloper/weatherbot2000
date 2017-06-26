import React from 'react';
import WeatherTile from '../components/weather/WeatherTile.jsx';
import DayDetail from '../components/weather/DayDetail.jsx';
import reactCSS from 'reactcss';
export default class WeatherWeek extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[],
            city: "",
            hourlyWeather: null
        }
        this.openDetail = this.openDetail.bind(this)
    }

    componentDidMount(){
        //Get weather data through internal API
        fetch('/forecast/?address='+this.props.zip).then( res => res.json() ).then( obj => {
            
            this.setState({ dailyWeather: obj.weather, city: obj.city });
            console.log(obj)
        })
    }

    openDetail(day){
        fetch('/forecast/hourly/?address='+this.props.zip+',time='+this.state.dailyWeather[day].time).then( res => res.json() ).then( _weather => {
            let hours = [_weather[12],_weather[13],_weather[14],_weather[15],_weather[16],_weather[17],_weather[18],_weather[19],_weather[20],_weather[21],]
            this.setState({ hourlyWeather: hours });
            console.log("hourly",hours)
        })
    }

    closeDetails(){
        this.setState({
            hourlyWeather: []
        })
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
                <DayDetail hourly={this.state.hourlyWeather}/>
                <div style={ styles.homeHeader }>This Week's Weather in {this.state.city}</div>
                    <div style={ styles.tileHolder }>
                        {this.state.dailyWeather.map((day) => {
                            return (
                                <WeatherTile openDetail={this.openDetail} day={day} key={day.time}/>
                            );
                    })}
                </div>

                
            </div>
        );
    }
}

//<DayDetail ref={(ref) => this._details = ref }/>