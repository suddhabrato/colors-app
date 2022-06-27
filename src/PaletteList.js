import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>{palettes.map(palette => (<MiniPalette {...palette} handleDelete={deletePalette} key={palette.paletteName} />))}</div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);