import './App.css';
import React, { useState, useEffect } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import useSound from 'use-sound';
import { videos } from './assets/videos';
import { SplashScreen } from './components/splashScreen';
import { IndexState } from './types';

const soundtrack = require('./assets/sadeness.mp3');

export const App = () => {

  let [isLoading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    play();
    setIsChecked(true);
  }

  const [index, setIndex] = useState<IndexState>({
    prev: 0,
    current: 0
  } as IndexState);

  let [isChecked, setIsChecked] = useState<boolean>(false);

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  const onStateChange = (event?: any, nextIndex?: number) => {
    if (nextIndex) {
      let nextPrev: number;
      if (nextIndex < 1) {
        nextPrev = 0;
      } else {
        nextPrev = nextIndex - 1
      }
      setIndex({ prev: nextPrev, current: nextIndex });
    }
  }

  useEffect(() => {
    console.log(`index switched to ${index.current} `);
    console.log(`prev index: ${index.prev} `);
  }, [index, isLoading]);

  const onEnd = (event: any) => {
    if (index.current === videos.length) {
      onStateChange(event, 0);
      console.log('jump to start video');
    } else if (index.current < videos.length) {
      onStateChange(event, index.current + 1);
      console.log('jump to next video');
    }
  }


  const handleKeyDown = (event: any) => {
    let nextIndex: number;
    switch (event.key) {
      case 'delete':
      case 'ArrowLeft':

        if (index.current === 1) {
          nextIndex = 0;
        } else {
          nextIndex = index.current - 1
        }
        onStateChange(event, nextIndex);
        break;
      case 'Enter':
      case 'ArrowRight':
        if (index.current < videos.length) {
          nextIndex = index.current + 1
        } else {
          nextIndex = 0;
        }
        onStateChange(event, nextIndex);
        break;
    }
  }
  return (
    <Container fluid className="App" onKeyDown={handleKeyDown} tabIndex={0}>
      <SplashScreen show={show} isLoading={isLoading} handleClose={handleClose} />
      <SoundToggle
        play={play}
        isPlaying={isPlaying}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        pause={pause}
      />
      <Wallpaper
        className="videoWrapper"
        isChecked={isChecked}
        isPlaying={isPlaying}
        onEnd={onEnd}
        index={index}
        onStateChange={onStateChange}
      />
    </Container>
  );
};