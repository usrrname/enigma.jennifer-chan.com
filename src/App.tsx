import './App.css';
import React, { useEffect, useState } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import { useElapsedTime } from 'use-elapsed-time';
import useSound from 'use-sound';
import { YouTubeProps } from 'react-youtube';

const soundtrack = require('./assets/sadeness.mp3');

export enum videoIdList {
  WHALE = "TPChnsfBFuw",
  DEAD_WHALE = "IZRruR6X220",
  JACOB_REES = "XJ8i896xM",
  NOODLE = "5mTiFRNMRO0",
  SPAM = "uamdraznYsU"
}

type Props = YouTubeProps;

export const App = (props: Props) => {

  const [videoId, setVideoId] = useState(videoIdList.WHALE);

  let [isChecked, setIsChecked] = useState(false);

  const { elapsedTime } = useElapsedTime(isChecked);
  const soundCheckBox = document.querySelector('.toggle-sound');

  useEffect(() => {
    soundCheckBox?.addEventListener("click", () => {
      if (document.querySelector('.active')) {
        setIsChecked(prevIsPlaying => !prevIsPlaying);
      }
    });
  })

  let [play, { pause, isPlaying }] = useSound(soundtrack);

  const onStateChange = (event: any) => {
    setVideoId(videoId);
  }

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
          videoId={videoId}
          className="videoWrapper"
          isChecked={isChecked}
          isPlaying={isPlaying}
          start={props.opts?.playerVars?.start}
          end={props.opts?.playerVars?.end}
          onStateChange={onStateChange}
        ></Wallpaper>
      </Container>
    </div >
  );
};
