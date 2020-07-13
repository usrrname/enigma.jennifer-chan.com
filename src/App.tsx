import './App.css';
import { Suspense, lazy, useRef } from 'react';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useSound from 'use-sound';
import { videos } from './assets/videos';
import { IndexState } from './types';
import { Loading } from './components/loading';

const soundtrack = require('./assets/sadeness.mp3');

const Wallpaper = lazy(() =>
  import('./components/wallpaper')
    .then(({ Wallpaper }) =>
      ({ default: Wallpaper })
    ),
)
const SoundToggle = lazy(() =>
  import('./components/soundToggle')
    .then(({ SoundToggle }) =>
      ({ default: SoundToggle })
    ),
)

export const App = () => {

  // toggle sound on
  let [isChecked, setIsChecked] = useState<boolean>(true);

  const [index, setIndex] = useState<IndexState>({
    prev: 0,
    current: 0
  } as IndexState);

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  const onStateChange = (event?: any, nextIndex?: number) => {
    if (nextIndex) {
      let nextPrev: number;
      if (nextIndex === (0 || 1)) {
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
  }, [index, isChecked, isPlaying])

  const onSoundChange = (event?: any) => {
    setIsChecked(!isChecked);
    isChecked ? pause() : play();
  }

  const onEnd = (event: any) => {
    if (index.current === videos.length - 1) { // zero-based index
      onStateChange(event, 0);
      console.log('jump to start video');
    } else if (index.current < videos.length - 1) {
      onStateChange(event, index.current + 1);
      console.log('next video');
    }
  }

  const handleKeyDown = (event: any) => {

    let nextIndex: number;
    switch (event.key) {
      case 'Delete':
      case 'Backspace':
      case 'ArrowLeft':

        nextIndex = index.current <= 1 ? 0 : index.prev;
        onStateChange(event, nextIndex);
        break;
      case 'Enter':
      case 'ArrowRight':

        if (index.current < videos.length - 1) {
          nextIndex = index.current + 1
        } else {
          nextIndex = 0;
        }
        onStateChange(event, nextIndex);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('onkeydown', handleKeyDown)
  })

  return (
    <Container fluid
      className="App"
      onKeyDown={(event: any) => handleKeyDown(event)}
      tabIndex={0}
    >
      <Suspense fallback={<span>Loading Sound</span>}>
        <SoundToggle
          isChecked={isChecked}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          onChange={onSoundChange}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Wallpaper
          onReady={onSoundChange}
          className="videoWrapper"
          isChecked={isChecked}
          isPlaying={isPlaying}
          onEnd={onEnd}
          index={index}
          onStateChange={onStateChange}
        />
      </Suspense>
    </Container>
  );
};