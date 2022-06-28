import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    openDialog(id) {
        this.setState({ openDeleteDialog: true, deletingId: id });
    }
    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingId: "" });
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    }
    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette {...palette} openDialog={this.openDialog} key={palette.paletteName} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby='delete-dialog-title'
                    onClose={this.closeDialog}
                >
                    <DialogTitle id='delete-dialog-title'>
                        Delete This Palette?
                    </DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ backgroundColor: blue[100], color: blue[600] }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);