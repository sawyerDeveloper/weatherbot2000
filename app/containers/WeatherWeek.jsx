import React from 'react';
import WeatherTile from '../components/weather/WeatherTile.jsx';
import DayDetail from '../components/weather/DayDetail.jsx';
import reactCSS from 'reactcss';
export default class WeatherWeek extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[],
            detailsOpen: false
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
        this.setState({
            detailDay: this.state.dailyWeather[day],
            detailsOpen: true
        })

        //this._details.setShow(true);
        console.log('open detail', day);
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

                <DayDetail day={this.state.detailDay} isOpen={this.state.detailsOpen}/>
            </div>
        );
    }
}

//<DayDetail ref={(ref) => this._details = ref }/>