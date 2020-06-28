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
        <Wallpaper className="videoWrapper" videoId="TPChnsfBFuw"></Wallpaper>
        {/* TODO: Figure out how to jump between one and the next video */}
        {/* <Wallpaper className="videoWrapper" videoId="IZRruR6X220"></Wallpaper> */}
      </Container>
    </div>

  );
};
