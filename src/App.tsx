import './App.css';
import React, { useState } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import { useElapsedTime } from 'use-elapsed-time';
import useSound from 'use-sound';
import { YouTubeProps } from 'react-youtube';

const soundtrack = require('./assets/sadeness.mp3');

export enum videoIdList {
  PLANE_WASHES = "SNDGCiY0z5I",
  BABY_WHALE = "TPChnsfBFuw",
  DEAD_WHALE = "IZRruR6X220",
  JACOB_REES = "XJ8i896xM",
  NOODLE = "5mTiFRNMRO0",
  SPAM = "uamdraznYsU",
  MERKEL_SHAKING = "ilEolWazM6o",
  MACE = "aKmLxoMScb4",
  BUBBLING_MUD = "se_Q_KRGTNg",
  DRINKING_WATER = "BhAX0gi4CbM",
  DOG_DRINKING = "_OT4CNxHEGM",
  NEVER_SCOOP = "2rCVARgnyjg",
  POLAR_VORTEX = "1xTG5pHSjYQ",
  MILK_TEA = "L9TnPiCVaLI",
  BUCKET = "WIo9ROTi7a4",
  TRASH_MP = "A8q-Zx8gIbg",
  FLUSH_NOODLES = "zQVXFpDb5zM",
  SNAKE_EATING_SELF = "jIl2DSXUffw",
  ROPE_WALKING = "XtPic_hf-Jo"
}

type Props = YouTubeProps;

export const App = (props: Props) => {

  const [videoId, setVideoId] = useState(videoIdList.PLANE_WASHES);

  let [isChecked, setIsChecked] = useState(false);

  const { elapsedTime } = useElapsedTime(isChecked);

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
