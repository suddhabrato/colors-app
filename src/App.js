import React, { Component } from 'react';
import Palette from "./Palette";
import { generatePalette } from './colorHelper';
import seedColors from './seedColors';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, () => { this.syncLocalStorage() });
  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  deletePalette(id) {
    this.setState(st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }), () => { this.syncLocalStorage() })
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

    const GetRouteTransitions = () => {
      let location = useLocation();
      return (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Routes location={location}>
              <Route path='/' element={<Page><PaletteList palettes={palettes} deletePalette={this.deletePalette} /></Page>} />
              <Route path='/palette/new' element={<Page><NewPaletteForm savePalette={this.savePalette} palettes={palettes} /></Page>} />
              <Route path="/palette/:id" element={<Page><GetPalette /></Page>} />
              <Route path='/palette/:paletteId/:colorId' element={<Page><GetSingleColorPalette /></Page>} />
            </Routes >
          </CSSTransition>
        </TransitionGroup>
      )
    }

    return (
      <Routes>
        <Route path='*' element={<GetRouteTransitions />} />
      </Routes>
    );
  }
}

export default App;
