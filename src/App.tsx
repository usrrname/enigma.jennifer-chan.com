import './App.css';
import React from 'react';
import { SoundToggle } from './components/soundToggle';
import { Container } from 'react-bootstrap';

export const App = () => {

  return (
    <Container className="App" fluid>
      <SoundToggle></SoundToggle>

    </Container>
  );
};
