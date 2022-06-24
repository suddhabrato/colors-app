import React, { Component } from 'react';
import Palette from "./Palette";
import { generatePalette } from './colorHelper';
import seedColors from './seedColors';
import { Routes, Route, useParams } from 'react-router-dom';
import PaletteList from './PaletteList';

class App extends Component {
  render() {
    const GetPalette = () => {
      let { id } = useParams();
      let currPalette = seedColors.find(palette => palette.id === id);
      return <Palette palette={generatePalette(currPalette)} />;
    }
    return (
      <Routes>
        <Route path='/' element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:id" element={<GetPalette />} />
      </Routes >
    );
  }
}

export default App;
