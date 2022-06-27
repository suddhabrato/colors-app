import React from 'react';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
    picker: {
        width: '100% !important',
        marginTop: '1rem'
    },
    addColor: {
        width: '100%',
        padding: '0.7rem !important',
        marginTop: '1rem !important',
        fontSize: '1.5rem !important'
    },
    colorNameInput: {
        width: '100%',
        height: '55px',

    }
};

function ColorPickerForm({ paletteFull, updateColors, colors, classes }) {
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
        <div className={classes.picker}>
            <ChromePicker className={classes.picker} color={currColor} onChange={(newColor) => setCurrColor(newColor.hex)} />
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    margin='normal'
                    variant='filled'
                    placeholder='Color Name'
                    className={classes.colorNameInput}
                    value={newName}
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a Color Name', 'Color name must be unique!', 'Color already used!']} />
                <Button
                    className={classes.addColor}
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ backgroundColor: paletteFull ? 'gray' : currColor }}
                    disabled={paletteFull}
                >
                    {paletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPickerForm);