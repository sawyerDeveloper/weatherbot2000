import React from 'react';
import WeatherWeek from '../containers/WeatherWeek.jsx';

import reactCSS from 'reactcss';
export default class Weather extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zips: ["23510"],
            detailsDay: null,
            refresh: false,
            lastRefresh: ""
        }

        this.refreshComplete = this.refreshComplete.bind(this);
        console.log('weather')
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

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    position: 'absolute',
                    margin: 'auto',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    width: 850,
                    height: 600,
                    background: 'grey',
                    borderRadius: '5px'
                },
                logo: {
                    textAlign: 'center'
                },
                refreshText: {
                    fontSize: '16px',
                    color: 'white'
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
                <div style={ styles.refreshText }>Last Refresh: {this.state.lastRefresh}</div>
            </div>
        );
    }
}