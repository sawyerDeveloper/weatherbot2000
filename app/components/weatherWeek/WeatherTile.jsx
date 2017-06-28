import React from 'react';
import reactCSS from 'reactcss';
import WeatherTileFront from './WeatherTileFront.jsx';
import WeatherTileBack from './WeatherTileBack.jsx';

export default class WeatherTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            hourly: null
        };

        this.flip = this.flip.bind(this);
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
                hourly: null,
                flipped: false
            })
        }
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    width: 100,
                    height: 100,
                    perspective: 800,
                    display: 'block',
                    position: 'relative',
                    float: 'left',
                    marginRight: '5px'
                },
                tile: {
                    height: '100%',
                    position: 'absolute',
                    transition: 'all 1s ease-in-out',
                    width: '100%',
                    transformStyle: 'preserve-3d',              
                },
                tileFront: {
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    zIndex: 2
                },
                tileBack: {
                    width: 100,
                    height: 100,
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    transform: 'rotateY(180deg)'
                }
            },
            'flipped': {
                tile: {
                    transform: 'rotateY(180deg)'
                },
                tileFront: {
                    
                },
                tileBack: {
                    
                }
            }
        }, this.state)

        var day = new Date(0);
        day.setUTCSeconds(this.props.day.time);
        let dayNum = day.getDay();

        return (
            <div onClick={this.flip} style={ styles.container }>
                <div style={ styles.tile }>
                    <WeatherTileFront style={ styles.tileFront } dayNum={dayNum} day={this.props.day}/>
                    <WeatherTileBack style={ styles.tileBack } dayNum={dayNum} hourly={this.state.hourly} zip={this.props.zip}/>
                </div>
            </div>
        );
    }
}
