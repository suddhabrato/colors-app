import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        height: '25%',
        width: '20%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.9px',
    }
};

function DraggableColorBox(props) {
    const { classes, color, name } = props;
    return (
        <div style={{ backgroundColor: color }} className={classes.root}>
            {name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);