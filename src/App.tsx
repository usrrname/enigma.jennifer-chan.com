import './App.css';
import { Suspense, lazy } from 'react';
import React, { useState, useEffect } from 'react';
import { SoundToggle } from './components/soundToggle';
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

export const App = () => {

  let [isChecked, setIsChecked] = useState<boolean>(false);

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  const [index, setIndex] = useState<IndexState>({
    prev: 0,
    current: 0
  } as IndexState);

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
  }, [index])

  const onEnd = (event: any) => {
    if (index.current === videos.length - 1) {
      onStateChange(event, 0);
      console.log('jump to start video');
    } else if (index.current < (videos.length - 1 || videos.length)) {
      onStateChange(event, index.current + 1);
      console.log('next video');
    }
  }

  const handleKeyDown = (event: any) => {
    let nextIndex: number;
    switch (event.key) {
      case 'delete':
      case 'ArrowLeft':

        nextIndex = index.current === 1 ? 0 : index.prev;
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
  }
  return (
    <Container fluid className="App" onKeyDown={handleKeyDown}>
      <SoundToggle
        play={play}
        isPlaying={isPlaying}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        pause={pause}
      />
      <Suspense fallback={<Loading />}>
        <Wallpaper
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