import React, { Component } from 'react';
import Palette from "./Palette";
import { generatePalette } from './colorHelper';
import seedColors from './seedColors';
import { Routes, Route, useParams } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: seedColors };
    this.savePalette = this.savePalette.bind(this);
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }
  render() {
    const { palettes } = this.state;
    const GetPalette = () => {
      let { id } = useParams();
      let currPalette = palettes.find(palette => palette.id === id);
      return <Palette palette={generatePalette(currPalette)} />;
    }
    const GetSingleColorPalette = () => {
      let { paletteId, colorId } = useParams();
      let currPalette = palettes.find(palette => palette.id === paletteId);
      return <SingleColorPalette colorId={colorId} palette={generatePalette(currPalette)} />;
    }
    return (
      <Routes>
        <Route path='/' element={<PaletteList palettes={palettes} />} />
        <Route path='/palette/new' element={<NewPaletteForm savePalette={this.savePalette} palettes={palettes} />} />
        <Route path="/palette/:id" element={<GetPalette />} />
        <Route path='/palette/:paletteId/:colorId' element={<GetSingleColorPalette />} />
      </Routes >
    );
  }
}

export default App;
