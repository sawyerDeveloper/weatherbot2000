import React from 'react';
import WeatherTile from '../components/weather/WeatherTile.jsx';
import DayDetail from '../components/weather/DayDetail.jsx';
import reactCSS from 'reactcss';
export default class WeatherWeek extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[],
            hourlyWeather:[]
        }
        this.openDetail = this.openDetail.bind(this)
    }

    componentDidMount(){
        //Get weather data through internal API
        fetch('/forecast').then( res => res.json() ).then( _weather => {
            
            this.setState({ dailyWeather: _weather });
            console.log(_weather)
        })
    }

    openDetail(day){
        fetch('/forecast/hourly/?time='+this.state.dailyWeather[day].time).then( res => res.json() ).then( _weather => {
            
            this.setState({ hourlyWeather: _weather });
            console.log("hourly",_weather)
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
                
                <div style={ styles.homeHeader }>This Week's Weather in Norfolk VA</div>
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