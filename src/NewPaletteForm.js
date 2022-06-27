import React from 'react';
import { withStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { useNavigate } from 'react-router-dom';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const styles = {
    container: {
        height: '100%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: '100%'
    },
    button: {
        width: '50%'
    }
}

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: `calc(100vh - 64px)`,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

NewPaletteForm.defaultProps = {
    maxColors: 20
};

function NewPaletteForm(props) {
    const [open, setOpen] = React.useState(true);
    const [colors, setNewColor] = React.useState([]);

    let navigate = useNavigate();
    let paletteFull = colors.length >= props.maxColors;
    const { classes } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const clearColors = () => {
        setNewColor([]);
    };

    const updateColors = (currColor, newName) => {
        const newCol = { color: currColor, name: newName };
        setNewColor([...colors, newCol]);
    };

    const handleSubmit = (newPaletteName) => {
        const newPalette = { paletteName: newPaletteName, colors: colors, id: newPaletteName.toLowerCase().replace(/ /g, '-') };
        props.savePalette(newPalette);
        navigate('/');
    };

    const deleteColor = (colorName) => {
        console.log("In Here")
        setNewColor(colors.filter(color => color.name !== colorName))
    };

    const addRandom = () => {
        const allColors = props.palettes.map(pal => pal.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const newCol = allColors[rand];
        setNewColor([...colors, newCol]);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setNewColor(arrayMove(colors, oldIndex, newIndex));
    };

    React.useEffect(() => {
        setNewColor(props.palettes[0].colors);
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PaletteFormNav
                open={open}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div className={classes.container}>
                    <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button className={classes.button} variant='contained' color='error' onClick={clearColors}>Clear Palette</Button>
                        <Button className={classes.button} variant='contained' color='primary' onClick={addRandom} disabled={paletteFull}>Random Color</Button>
                    </div>
                    <ColorPickerForm
                        paletteFull={paletteFull}
                        updateColors={updateColors}
                        colors={colors}
                    />
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList colors={colors} deleteColor={deleteColor} axis='xy' onSortEnd={onSortEnd} />
            </Main>
        </Box >
    );
}

export default withStyles(styles)(NewPaletteForm);