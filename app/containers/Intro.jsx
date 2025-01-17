import React from 'react';
import reactCSS from 'reactcss';
import YouTube from 'react-youtube';
export default class Intro extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onEnd(){
        window.location = '/weather';
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
                    width: '640px',
                    height: '360px',
                    textAlign: 'center'
                },
                skipButton: {
                    
                },
                logo: {
                    textAlign: 'center'
                },
            },
        })
        const opts = {
            height: '360',
            width: '640',
            playerVars: {
                autoplay: 1
            }
        };
        return (
            <div style={ styles.container }>
                <div style={ styles.logo }><img src="../public/images/weatherbotlogo.png"/></div>
                <YouTube
                    videoId="mYvor5FqM8w"
                    opts={opts}
                    onEnd={this.onEnd}
                />
                <button style={ styles.skipButton } onClick={this.onEnd}>
                    Skip Intro
                </button>
            </div>
        );
    };
};