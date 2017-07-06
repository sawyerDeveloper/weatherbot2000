import React from 'react';
import reactCSS from 'reactcss';
export default class ZipCompare extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zip: ""
        }

        this.handleZipInput = this.handleZipInput.bind(this);
        this.dispatchZip = this.dispatchZip.bind(this);
    }

    handleZipInput(event) {
        this.setState({zip: event.target.value});
    }

    dispatchZip(){
        this.props.dispatchZip(this.state.zip);
    }

    render() {
        const styles = reactCSS({
        'default': {
                container: {
                    
                },
                text: {
                    color: 'white',
                    fontSize: 18
                },
                zipButton: {
                    color: 'black',
                    borderRadius: '5px'
                }
            },
        })
        
        return (
            <div style={ styles.container }>
                <div style={ styles.text }>Enter a zip code of a city you'd like to compare to Norfolk, VA</div>
                <input type="number" value={this.state.zip} onChange={ this.handleZipInput } maxLength="5"/>
                <button style={ styles.zipButton } onClick={this.dispatchZip}>
                        Compare
                </button>
            </div>
        );
    }
}