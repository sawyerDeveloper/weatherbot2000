import React from 'react';
import reactCSS from 'reactcss';
import WeatherTile from '../components/weatherWeek/WeatherTile.jsx';
import GSAP from 'react-gsap-enhancer';
import TransitionGroup from 'react-addons-transition-group';
import {TweenLite} from "gsap";

export default class WeatherWeek extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dailyWeather:[],
            city: "",
        }
        //Or 7
        this.tileCount = 8;
        this.tileMountComplete = this.tileMountComplete.bind(this);
    }

    timeStamp() {
        var date = new Date();
        var hour = date.getHours();
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

    tileMountComplete(tileNum){
        if(tileNum == this.tileCount && this.props.firstWeekMountComplete){
            this.props.firstWeekMountComplete();
        }
    }

    componentDidMount(){
        this.updateWeeklyWeather();
        let header = this.header;
        TweenLite.fromTo(header, 1.4, {opacity: 0}, {opacity: 1, delay: 1.5});
    }

    updateWeeklyWeather(){
        //Get weather data through internal API
        fetch('/forecast/?address='+this.props.zip).then( res => res.json() ).then( obj => {
            this.setState({ dailyWeather: obj.weather, city: obj.city });
            this.props.speakSummary(obj.summary);
            this.props.refreshComplete(this.timeStamp());
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.refresh){
            this.updateWeeklyWeather();
        }
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    marginTop: 10
                },
                tileHolder: {
                    padding: 5
                },
                homeHeader: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 18,
                    opacity: 0
                }
            },
        })
        var delay = 0;
        var tileNum = 0;
        return (
            <div style={ styles.container }>
                <div style={ styles.homeHeader } ref={ref => this.header = ref}>This Week's Weather in {this.state.city}</div>
                    <div style={ styles.tileHolder }>
                        <TransitionGroup>
                            {this.state.dailyWeather.map((day) => {
                                delay += 0.08;
                                tileNum++;
                                return (
                                    <WeatherTile 
                                        openedTile={this.props.openedTile}
                                        openTile={this.props.openTile}
                                        tileMountComplete={this.tileMountComplete} 
                                        animDelay={delay} 
                                        zip={this.props.zip} 
                                        hourlyWeather={this.state.hourlyWeather} 
                                        day={day} 
                                        tileNum={tileNum}
                                        key={day.time} />
                                );
                            })}
                        </TransitionGroup>
                </div>
            </div>
        );
    }
}