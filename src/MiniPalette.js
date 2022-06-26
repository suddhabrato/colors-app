import React from 'react';
import { withStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id } = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} key={color.name} style={{ background: color.color }}></div>
    ));
    const history = useNavigate();
    function goToPalette() {
        history(`/palette/${id}`);
    }
    return (
        <div className={classes.root} onClick={goToPalette}>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);