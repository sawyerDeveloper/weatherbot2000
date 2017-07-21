import React from 'react';
import reactCSS from 'reactcss';
import ReactAnimatedWeather from 'react-animated-weather';
import WeatherTileFront from '../components/weatherTile/WeatherTileFront.jsx';
import WeatherTileBack from '../components/weatherTile/WeatherTileBack.jsx';
import HourlyDetail from '../components/weatherTile/HourlyDetail.jsx';
import { dayMapping } from '../utils/constants';
import {TweenLite} from "gsap";

export default class WeatherTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            flipping: false,
            hourly: []
        };
        this.flip = this.flip.bind(this);
        this.doneFlipping = this.doneFlipping.bind(this);
        this.tweenInComplete = this.tweenInComplete.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.openedTile == this.props.tileNum){
            this.flip();
        }else if(nextProps.openedTile == 0 && this.state.flipped){
            this.flip();
        }
    }

    componentWillEnter () {
        let container = this.container;
        TweenLite.fromTo(container, .7, {x: 1000}, {x: 0, delay: this.props.animDelay, onComplete:this.tweenInComplete});
    }

    tweenInComplete(){
        //alert parent that animation completed
        this.props.tileMountComplete(this.props.tileNum);

        //wait for animation to end for smoothness before data loading
        fetch('/forecast/hourly/?params='+this.props.zip+'|'+this.props.day.time).then( res => res.json() ).then( _weather => {
            console.log(this.props.day.time,_weather)
            let hours = [_weather[12],_weather[13],_weather[14],_weather[15],_weather[16],_weather[17],_weather[18],_weather[19],_weather[20],_weather[21],]
            this.setState({ 
                hourly: hours
            });
        })
    }
    
    doneFlipping(){
        this.setState({
            flipping: false
        })
    }

    flip(){
        if(this.state.flipped == false){
            this.setState({ 
                flipped: true,
                flipping: true
            });
            
        } else {
            this.setState({
                flipped: false
            })
            setTimeout(this.doneFlipping, 1000);
        }
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    width: 100,
                    height: 100,
                    perspective: 1000,
                    display: 'block',
                    position: 'relative',
                    float: 'left',
                    marginRight: 5,
                    zIndex: 1
                },
                tile: {
                    height: '100%',
                    position: 'relative',
                    transition: 'all 1s ease-in-out',
                    width: '100%',
                    transformStyle: 'preserve-3d',
                },
                tileFront: {
                    backfaceVisibility: 'hidden',
                    transition: 'all 1s ease-in-out',
                },
                tileBack: {
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                },
            },
            'flipped': {
                container: {
                    zIndex: 1000
                },
                tile: {
                    transform: 'rotateY(180deg)'
                },
                tileFront: {
                    transform: 'scale3d(4,4,4)'
                }
            },
            'flipping': {
                container: {
                    zIndex: 1000
                }
            }
        }, this.state);

        var newDay = new Date(0);
        newDay.setUTCSeconds(this.props.day.time);
        let dayNum = newDay.getDay();
        var dayName = dayMapping[dayNum];
        if(this.props.tileNum == 1){
            dayName = "Today";
        }

        return (
            <div onClick={(tileNum, summary) => this.props.openTile(this.props.tileNum, this.props.day.summary)} style={ styles.container } ref={c => this.container = c}>
                <div style={ styles.tile }>
                    <div style={ styles.tileFront }>
                        <WeatherTileFront dayName={dayName} day={this.props.day} />
                    </div>
                    <div style={ styles.tileBack }>
                        <WeatherTileBack dayName={dayName} hourly={this.state.hourly} />
                    </div>
                </div>
            </div>
        );
    }
}