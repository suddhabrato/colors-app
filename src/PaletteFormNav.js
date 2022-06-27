import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const drawerWidth = 350;

const Root = styled('div')({
    display: 'flex'
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
    const [newPaletteName, setNewPaletteName] = React.useState('');

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }, [palettes]);

    const handlePaletteNameChange = (event) => {
        setNewPaletteName(event.target.value);
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
                <div >
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            onChange={handlePaletteNameChange}
                            validators={['required', 'isPaletteNameUnique',]}
                            errorMessages={['Enter a Palette Name', 'Palette name taken!',]} />
                        <Button type='submit' color='error' variant='contained'>Save Palette</Button>
                    </ValidatorForm>
                    <Link to='/'>
                        <Button color='primary' variant='contained'>Go Back</Button>
                    </Link>
                </div>
            </AppBar>
        </Root>
    )
};