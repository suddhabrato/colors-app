import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import PaletteFormNav from './PaletteFormNav';

const drawerWidth = 320;

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

export default function NewPaletteForm(props) {
    const [open, setOpen] = React.useState(true);
    const [currColor, setCurrColor] = React.useState('teal');
    const [colors, setNewColor] = React.useState([]);
    const [newName, setNewName] = React.useState('');
    let navigate = useNavigate();
    let paletteFull = colors.length >= props.maxColors;
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateColors = () => {
        const newCol = { color: currColor, name: newName };
        setNewColor([...colors, newCol]);
        setNewName('');
    };

    const clearColors = () => {
        setNewColor([]);
    };

    const handleChange = (event) => {
        setNewName(event.target.value);
    };

    const handleSubmit = (newPaletteName) => {
        const newPalette = { paletteName: newPaletteName, colors: colors, id: newPaletteName.toLowerCase().replace(/ /g, '-') };
        props.savePalette(newPalette);
        navigate('/');
    };

    const deleteColor = (colorName) => {
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

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () =>
            colors.every(
                ({ color }) => color !== currColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }, [colors, currColor, props.palettes]);

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
                <Typography variant='h4'>Design Your Palette</Typography>
                <div>
                    <Button variant='contained' color='error' onClick={clearColors}>Clear Palette</Button>
                    <Button variant='contained' color='primary' onClick={addRandom} disabled={paletteFull}>Random Color</Button>
                </div>
                <ChromePicker color={currColor} onChange={(newColor) => setCurrColor(newColor.hex)} />
                <ValidatorForm onSubmit={updateColors}>
                    <TextValidator
                        value={newName}
                        onChange={handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a Color Name', 'Color name must be unique!', 'Color already used!']} />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        style={{ backgroundColor: paletteFull ? 'gray' : currColor }}
                        disabled={paletteFull}
                    >Add Color</Button>
                </ValidatorForm>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList colors={colors} deleteColor={deleteColor} axis='xy' onSortEnd={onSortEnd} />
            </Main>
        </Box >
    );
}