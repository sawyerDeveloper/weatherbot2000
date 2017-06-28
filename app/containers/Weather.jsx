import React from 'react';
import WeatherWeek from './WeatherWeek.jsx';
import ZipCompare from '../components/weather/ZipCompare.jsx';
import reactCSS from 'reactcss';
export default class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zips: ["23510"],
            refresh: false,
            lastRefresh: ""
        }

        this.refreshComplete = this.refreshComplete.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.dispatchZip = this.dispatchZip.bind(this);
    }
    
    componentDidMount(){
        //var intervalID = this.setInterval(this.refreshData, 60000);
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
        console.log(zip)
        let newZips = this.state.zips;
        newZips.push(zip);
        this.setState({
            zips: newZips
        })
        console.log(newZips)
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    position: 'relative',
                    margin: 'auto',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 850,
                    height: 600,
                    background: 'grey',
                    borderRadius: 5
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

                }
            },
        })
        
        return (
            <div style={ styles.container }>
                <div style={ styles.logo }><img src="../public/images/weatherbotlogo.png"/></div>
                {this.state.zips.map((zip) => {
                    return (
                        <WeatherWeek refresh={this.state.refresh} refreshComplete={this.refreshComplete} key={zip} zip={zip}/>
                    );
                })}
                <div style={ styles.refeshHolder }>
                    <button style={ styles.refreshButton } onClick={this.refreshData}>
                        Refresh
                    </button>
                    <div style={ styles.refreshText }>Last Refresh: {this.state.lastRefresh}</div>
                </div>
                <div>
                    <ZipCompare dispatchZip={this.dispatchZip} />
                </div>
            </div>
        );
    }
}