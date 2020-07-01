import './App.css';
import React, { useEffect, useState } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import { useElapsedTime } from 'use-elapsed-time';
import useSound from 'use-sound';

const soundtrack = require('./assets/sadeness.mp3');

export const App = () => {

  let [isChecked, setIsChecked] = useState(false);

  const { elapsedTime } = useElapsedTime(isChecked);
  const soundCheckBox = document.querySelector('.sound-toggle');

  useEffect(() => {
    soundCheckBox?.addEventListener("click", () => {
      if (soundCheckBox.getAttribute('active')) {
        setIsChecked(prevIsPlaying => !prevIsPlaying);
      }
    });
  })

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  return (
    <div className="App">
      <Container fluid>
        <SoundToggle
          play={play}
          isPlaying={isPlaying}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          pause={pause}
        />
        <span className="elapsed-time">{elapsedTime}</span>
        <Wallpaper
          className="videoWrapper"
          isChecked={isChecked}
          isPlaying={isPlaying}
        ></Wallpaper>

        {/* TODO: Figure out how to jump between one and the next video */}
        {/* <Wallpaper className="videoWrapper" videoId="IZRruR6X220"></Wallpaper> */}
      </Container>
    </div >
  );
};
