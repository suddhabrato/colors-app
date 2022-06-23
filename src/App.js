import React, { Component } from 'react';
import Palette from "./Palette";
import { generatePalette } from './colorHelper';
import seedColors from './seedColors';

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
