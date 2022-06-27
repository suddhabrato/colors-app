import React from 'react';
import { withStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@mui/icons-material/Delete';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id, handleDelete } = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} key={color.name} style={{ background: color.color }}></div>
    ));
    const history = useNavigate();
    function goToPalette() {
        history(`/palette/${id}`);
    }
    function deletePalette(event) {
        handleDelete(id);
        event.stopPropagation();
    }
    return (
        <div className={classes.root} onClick={goToPalette}>
            <DeleteIcon onClick={deletePalette} className={classes.deleteIcon} sx={{ transition: 'all 0.3s ease-in-out' }} />
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);