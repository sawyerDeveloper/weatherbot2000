import React from 'react';
import reactCSS from 'reactcss';
export default class WeatherTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    borderRadius: '5px',
                    width: '100px',
                    height: '100px',
                    background: 'white',
                    float: 'left',
                    marginRight: '5px',
                },
                text: {
                    fontSize: '11px'
                }
            },
        })
        return (
            <div style={ styles.container }>
                <div style={ styles.text }>
                    {this.props.day.summary}
                </div>
                
            </div>
        );
    }
}
