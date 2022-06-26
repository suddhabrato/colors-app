import React from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function ColorPickerForm({ paletteFull, updateColors, colors }) {
    const [currColor, setCurrColor] = React.useState('teal');
    const [newName, setNewName] = React.useState('');

    const handleSubmit = () => {
        updateColors(currColor, newName);
        setNewName('');
    }

    const handleChange = (event) => {
        setNewName(event.target.value);
    };

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
    }, [colors, currColor]);

    return (
        <div>
            <ChromePicker color={currColor} onChange={(newColor) => setCurrColor(newColor.hex)} />
            <ValidatorForm onSubmit={handleSubmit}>
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
        </div>
    )
};