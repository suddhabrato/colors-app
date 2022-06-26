import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from 'react-sortable-hoc';

const styles = {
    root: {
        height: '25%',
        width: '20%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.9px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        position: 'absolute',
        padding: '10px',
        width: '100%',
        left: '0',
        bottom: '0',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        color: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
};

const DraggableColorBox = SortableElement((props) => {
    const { classes, color, name, handleClick } = props;
    return (
        <div style={{ backgroundColor: color }} className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);