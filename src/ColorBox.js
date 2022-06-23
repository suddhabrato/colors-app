import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({ copied: true }, () => { setTimeout(() => this.setState({ copied: false }), 1500) })
    }
    render() {
        const { name, background } = this.props;
        return (
            <div className='ColorBox' style={{ background: background }}>
                <div className={`copy-overlay ${this.state.copied && 'show'}`} style={{ background: background }}></div>
                <div className={`copy-msg ${this.state.copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p>{background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{name}</span>
                    </div>
                    <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                        <button className='copy-button'>Copy</button>
                    </CopyToClipboard>
                </div>
                <span className='see-more'>More</span>
            </div>
        )
    }
}

export default ColorBox;