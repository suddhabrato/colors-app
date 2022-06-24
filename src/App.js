import React, { Component } from 'react';
import Palette from "./Palette";
import { generatePalette } from './colorHelper';
import seedColors from './seedColors';

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[1])} />
    </div>
  );
}

export default App;
