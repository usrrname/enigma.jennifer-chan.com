import './App.css';
import React from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';

export const App = () => {

  return (
    <div className="App">
      <Container fluid>
        <SoundToggle></SoundToggle>
        <Wallpaper></Wallpaper>
      </Container>
    </div>

  );
};
