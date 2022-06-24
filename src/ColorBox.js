import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
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
        const { name, background, paletteId, id, showLink } = this.props;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background: background }}>
                    <div className={`copy-overlay ${this.state.copied && 'show'}`} style={{ background: background }}></div>
                    <div className={`copy-msg ${this.state.copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <p className={isLightColor && 'dark-text'}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={isDarkColor && 'light-text'}>{name}</span>
                        </div>
                        <button className={isLightColor ? 'dark-text copy-button' : 'copy-button'}>Copy</button>
                    </div>
                    {showLink && <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}><span className={isLightColor ? 'dark-text see-more' : 'see-more'}>More</span></Link>}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;