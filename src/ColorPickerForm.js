import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ColorPicker = styled(ChromePicker)({
    width: '100% !important',
    marginTop: '1rem'
});

const AddColor = styled(Button)({
    width: '100%',
    padding: '0.7rem !important',
    marginTop: '1rem !important',
    fontSize: '1.5rem !important'
});

const ColorNameInput = styled(TextValidator)({
    width: '100%',
    height: '55px'
});

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
        <div style={{
            width: '100%',
            marginTop: '1rem'
        }}>
            <ColorPicker color={currColor} onChange={(newColor) => setCurrColor(newColor.hex)} />
            <ValidatorForm onSubmit={handleSubmit}>
                <ColorNameInput
                    margin='normal'
                    variant='filled'
                    placeholder='Color Name'
                    value={newName}
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a Color Name', 'Color name must be unique!', 'Color already used!']} />
                <AddColor
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ backgroundColor: paletteFull ? 'gray' : currColor }}
                    disabled={paletteFull}
                >
                    {paletteFull ? 'Palette Full' : 'Add Color'}
                </AddColor>
            </ValidatorForm>
        </div>
    )
}
