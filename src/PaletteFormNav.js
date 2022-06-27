import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 350;

const Root = styled('div')({
    display: 'flex'
});

const NavBtns = styled('div')({
    margin: '1rem',
    '& a': {
        textDecoration: 'none'
    }
});

const StyledButtons = styled(Button)({
    margin: '0 0.5rem'
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
    alignItems: 'center',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function PaletteFormNav({ open, palettes, handleSubmit, handleDrawerOpen }) {
    const [formShowing, setFormShowing] = React.useState(false);
    const handleClickOpen = () => {
        setFormShowing(true);
    };
    const handleClose = () => {
        setFormShowing(false);
    };
    return (
        <Root>
            <AppBar position="fixed" color='default' open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create a Palette
                    </Typography>
                </Toolbar>
                <NavBtns >
                    <Link to='/'>
                        <StyledButtons color='error' variant='contained'>Go Back</StyledButtons>
                    </Link>
                    <StyledButtons variant="contained" color='primary' onClick={handleClickOpen}>
                        Save
                    </StyledButtons>
                </NavBtns>
            </AppBar>
            {formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} handleClose={handleClose} />}
        </Root>
    )
};
