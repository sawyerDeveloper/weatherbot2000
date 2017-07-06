import React from 'react';
import reactCSS from 'reactcss';
export default class AnimatedRobot extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shouldStart: this.props.shouldStart
        }

    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    
                },
            },
        })
        
        return (
            <div style={ styles.container }>
                <img src={"../public/images/SiteAnimationGif.gif?"+Math.random(1000)}/>
            </div>
        );
    }
}