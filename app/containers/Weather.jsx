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

    }

    openTile(tileNum){
        console.log('openTile',tileNum)
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
        this.countdown = setInterval(this.refreshData, 30000);
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
    }

    dispatchZip(zip){
        let newZips = this.state.zips;
        newZips.push(zip);
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
                    height: 600,
                    background: 'grey',
                    borderRadius: 10,
                    display: 'block'
                },
                logo: {
                    textAlign: 'center'
                },
                refreshText: {
                    fontSize: 16,
                    color: 'white',
                    float: 'left'
                },
                refreshButton: {
                    color: 'black',
                    borderRadius: 5,
                    float: 'left'
                },
                refreshHolder: {
                    position: 'relative',
                    marginLeft: 20
                },
                zipCompareHolder: {

                }
            },
        })
        
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
                <div style={ styles.refeshHolder }>
                    <button style={ styles.refreshButton } onClick={this.refreshData}>
                        Refresh
                    </button>
                    <div style={ styles.refreshText }>Last Refresh: {this.state.lastRefresh}</div>
                </div>
                <div style={ styles.zipCompare }>
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