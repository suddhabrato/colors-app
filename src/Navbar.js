import React, { Component } from 'react';
import Slider from 'rc-slider';
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.handleChange(evt.target.value);
    }
    closeSnackbar() {
        this.setState({ open: false });
    }
    render() {
        const { level, changeLevel } = this.props;
        return (
            <header className='Navbar'>
                <div className='logo'>
                    <a href='#'>reactcolorpicker</a>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider defaultValue={level} min={100} step={100} max={900} onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className='select-container'>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select value={this.state.format} onChange={this.handleFormatChange}>
                            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    onClose={this.closeSnackbar}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format Changed to {this.state.format.toUpperCase()}!</span>}
                    ContentProps={{ "aria-describedby": "message-id" }}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                    ]
                    }
                />
            </header >
        )
    }
}

export default Navbar;