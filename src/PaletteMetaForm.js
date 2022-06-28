import * as React from 'react';
import { useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import data from '@emoji-mart/data'

function EmojiPicker(props) {
    const ref = useRef()

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [])

    return <div ref={ref} />
}

export default function PaletteMetaForm({ handleSubmit, handleClose, palettes }) {
    const [open, setOpen] = React.useState('form');
    const [newPaletteName, setNewPaletteName] = React.useState('');


    const handlePaletteNameChange = (event) => {
        setNewPaletteName(event.target.value);
    }

    const showEmojiPicker = () => {
        setOpen('emoji');
    };

    const savePalette = (emoji) => {
        const newPalette = { paletteName: newPaletteName, emoji: emoji.native }
        handleSubmit(newPalette);
        setOpen('');
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }, [palettes]);

    return (
        <div>
            <Dialog open={open === 'emoji'}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <EmojiPicker theme='light' onEmojiSelect={savePalette} />
            </Dialog>
            <Dialog open={open === 'form'} onClose={handleClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beautiful palette. Make sure it is unique!
                        </DialogContentText>
                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            fullWidth
                            margin='normal'
                            onChange={handlePaletteNameChange}
                            validators={['required', 'isPaletteNameUnique',]}
                            errorMessages={['Enter a Palette Name', 'Palette name taken!',]} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' color='primary' variant='contained'>Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
