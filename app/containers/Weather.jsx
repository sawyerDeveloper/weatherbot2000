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
            openedTile: 0
        }

        this.openTile = this.openTile.bind(this);
        this.firstWeekMountComplete = this.firstWeekMountComplete.bind(this);
        this.refreshComplete = this.refreshComplete.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.dispatchZip = this.dispatchZip.bind(this);
    }

    firstWeekMountComplete(){
        let weatherMapHolder = this.weatherMapHolder;
        TweenLite.fromTo(weatherMapHolder, 0.7, {opacity: 0, x:-500}, {x:0, opacity: 1});
        let zipCompareHolder = this.zipCompareHolder;
        TweenLite.fromTo(zipCompareHolder, 0.7, {opacity: 0, y:500}, {y:0, opacity: 1, delay: 0.5});
    }

    openTile(tileNum){
        if(this.state.openedTile == 0){
            this.setState({
                openedTile: tileNum
            })
        }else{
            this.setState({
                openedTile: 0
            })
        }
    }

    componentDidMount(){
        //Turn this back on for production
        //this.countdown = setInterval(this.refreshData, 30000);
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
                logo: {
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
                weatherMapHolder: {
                    opacity: 0
                },
                refreshHolder: {
                    
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
                <div style={ styles.logo }><img src="../public/images/weatherbotlogo.png"/></div>
                <WeatherWeek 
                    firstWeekMountComplete={this.firstWeekMountComplete} 
                    openTile={this.openTile} 
                    openedTile={this.state.openedTile}
                    refresh={this.state.refresh} 
                    refreshComplete={this.refreshComplete} 
                    zip={this.state.zips[0]} />
                <div ref={ref => this.weatherMapHolder = ref} style={ styles.weatherMapHolder }>
                    <img src="../public/images/SiteAnimation.png"/>
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