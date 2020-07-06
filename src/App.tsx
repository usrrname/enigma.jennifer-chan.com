import './App.css';
import React, { useState } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import useSound from 'use-sound';
import { videos } from './assets/videos';
import { getVideo } from './util';
import { usePrevious } from './hooks/usePrevRef';

const soundtrack = require('./assets/sadeness.mp3');

export const App = () => {
  // store index and current index
  const [index, setIndex] = useState<number>(0);
  const prevIndex = usePrevious(index);

  let [isChecked, setIsChecked] = useState<boolean>(false);

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  let video: any;

  const init = () => {
    const appDiv = document.querySelector('.App') as HTMLElement;
    appDiv.focus();
  }

  const onStateChange = (event?: any, index?: number) => {
    // update video id
    if (index) {
      setIndex(index);
      video = getVideo(index, videos);
    }
  };

  const onEnd = (event: any) => {
    if (index < videos.length) {
      onStateChange(event, index + 1);
      console.log('jump to next video');
    }
    if (index === videos.length) {
      onStateChange(event, 0);
      console.log('jump to start video');
    }
  }

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'delete':
      case 'ArrowLeft':
        if (prevIndex) {
          let nextIndex: number;
          if (index <= 1) {
            nextIndex = 0;
          } else {
            nextIndex = index - 1
          }
          onStateChange(event, nextIndex);
        }
        break;
      case 'Enter':
      case 'ArrowRight':
        let nextIndex: number;
        if (!prevIndex || index < 24) {
          nextIndex = index + 1
        } else {
          nextIndex = 0;
        }
        onStateChange(event, nextIndex);
        break;
    }
  }
  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex={0} onLoad={init}>
      <Container fluid>
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
    </div >
  );
};