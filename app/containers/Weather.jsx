import React from 'react';
import WeatherWeek from './WeatherWeek.jsx';
import ZipCompare from '../components/weather/ZipCompare.jsx';
import reactCSS from 'reactcss';
import {TweenLite} from "gsap";

export default class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zips: ["23510"],
            hasRefreshed: false,
            refresh: false,
            lastRefresh: "",
            openedTile: 0,
            robotSource: "../public/images/SiteAnimation.png"
        }

        this.openTile = this.openTile.bind(this);
        this.firstWeekMountComplete = this.firstWeekMountComplete.bind(this);
        this.refreshComplete = this.refreshComplete.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.dispatchZip = this.dispatchZip.bind(this);
        this.speakSummary = this.speakSummary.bind(this);

        this.synth = window.speechSynthesis;
    }


    firstWeekMountComplete(summary){
        this.summary = summary;
        let weatherMapHolder = this.weatherMapHolder;
        TweenLite.fromTo(weatherMapHolder, 0.7, {opacity: 0, x:-500}, {x:0, opacity: 1, onComplete: this.speakSummary});
        let zipCompareHolder = this.zipCompareHolder;
        TweenLite.fromTo(zipCompareHolder, 0.7, {opacity: 0, y:500}, {y:0, opacity: 1, delay: 0.5});
    }

    speakSummary(){
        var speech = new SpeechSynthesisUtterance(this.summary);
            speech.pitch = 1;
            speech.rate = 0.7;
            speech.voice = this.synth.getVoices()[10];
            this.synth.speak(speech);
             this.setState({
                robotSource: "../public/images/SiteAnimationGifLong.gif?"+Math.random(1000)
            })
    }

    openTile(tileNum, summary){
        
        var speech = new SpeechSynthesisUtterance(summary);
            speech.pitch = 1;
            speech.rate = 0.7;
            speech.voice = this.synth.getVoices()[10];
            
        //hack until I can find a suitable sprite sheet lib that works with react
        if(this.state.openedTile == 0){
            this.setState({
                openedTile: tileNum,
                robotSource: "../public/images/SiteAnimationGif.gif?"+Math.random(1000)
            })
            this.synth.speak(speech);
        }else{
            this.setState({
                openedTile: 0
            })
        }
    }

    componentDidMount(){
        //Turn this on for production
        this.countdown = setInterval(this.refreshData, 180000);
    }

    refreshData(){
        this.setState({
            refresh: true
        })
    }

    refreshComplete(timeStamp){
        this.setState({
            refresh: false,
            lastRefresh: timeStamp
        })

        if(!this.state.hasRefreshed){
            this.setState({
                hasRefreshed: true
            })
        }
    }

    dispatchZip(zip){
        let newZips = this.state.zips;
        if(newZips.length > 1){
            newZips.pop();
        }
        newZips.push(zip);
        console.log(newZips)
        this.setState({
            zips: newZips
        })
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    position: 'absolute',
                    margin: 'auto',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 850,
                    height: 650,
                    background: 'grey',
                    borderRadius: 10,
                    display: 'block',
                    textAlign: 'center'
                },
                refreshText: {
                    position: 'fixed',
                    bottom: 13,
                    right: 100,
                    fontSize: 16,
                    color: 'white',
                    opacity: 0
                },
                refreshButton: {
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                    color: 'black',
                    borderRadius: 5,
                    opacity: 0
                },
                weatherWeekHolder: {
                    marginBottom: 10
                },
                weatherMapHolder: {
                    opacity: 0
                },
                zipCompareHolder: {
                    opacity: 0
                }
            },
            'hasRefreshed': {
                refreshButton: {
                    opacity: 100
                },
                refreshText: {
                    opacity: 100
                }
            }
        }, this.state)
        
        return (
            <div style={ styles.container }>
                <div><img src="../public/images/weatherbotlogo.png"/></div>
                <div style={styles.weatherWeekHolder}>
                <WeatherWeek 
                    speakSummary={this.speakSummary}
                    firstWeekMountComplete={this.firstWeekMountComplete} 
                    startTalking={this.startTalking}
                    openTile={this.openTile} 
                    openedTile={this.state.openedTile}
                    refresh={this.state.refresh} 
                    refreshComplete={this.refreshComplete} 
                    zip={this.state.zips[0]} />
                </div>
                <div ref={ref => this.weatherMapHolder = ref} style={ styles.weatherMapHolder }>
                    <img style={ styles.robot } src={this.state.robotSource}/>
                    <img src="../public/images/WeatherMap.jpg"/>
                </div>
                <div style={ styles.refeshHolder }>
                    <button style={ styles.refreshButton } onClick={this.refreshData}>
                        Refresh
                    </button>
                    <div style={ styles.refreshText }>Last Refresh: {this.state.lastRefresh}</div>
                </div>
                <div ref={ref => this.zipCompareHolder = ref} style={ styles.zipCompareHolder }>
                    <ZipCompare dispatchZip={this.dispatchZip} />
                </div>
                {this.state.zips.length > 1 ?
                    <WeatherWeek 
                        startTalking={this.startTalking}
                        openTile={this.openTile} 
                        openedTile={this.state.openedTile}
                        refresh={this.state.refresh} 
                        refreshComplete={this.refreshComplete} 
                        zip={this.state.zips[1]} />
                    : null
                }
            </div>
        );
    }
}