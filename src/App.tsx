import './App.css';
import React, { useState, useEffect } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import { useElapsedTime } from 'use-elapsed-time';
import useSound from 'use-sound';
import { YouTubeProps } from 'react-youtube';
import { Video } from './types';
import { usePrevious } from './hooks/usePrevRef';

const soundtrack = require('./assets/sadeness.mp3');
const videos = [
  {
    id: 'TPChnsfBFuw',
    name: 'Drone footage of the baby whale beached at Amanzimtoti\'s Pipeline beach',
    start: 4,
    end: 51,
    order: 0,
    elapsedTime: 0
  },
  {
    id: 'IZRruR6X220',
    name: 'Dead whale at beach in Everett at Harborview Park',
    start: 78,
    end: 94,
    order: 1,
    elapsedTime: 51000
  },
  {
    id: 'WIo9ROTi7a4',
    name: 'the bucket',
    start: 64,
    end: 32,
    elapsedTime: 69000
  },
  {
    id: '_OT4CNxHEGM',
    name: 'How does a dog drink',
  },
  {
    id: 'XJ8i896xM',
    name: 'UK minister criticised over posture during Brexit debate',
  },
  {
    id: '5mTiFRNMRO0',
    name: '沙煲即食麵(要過熱河)將炸麵油除去。',
  },
  {
    id: 'uamdraznYsU',
    name: '餐蛋麵 Hong Kong Style Luncheon Meat & Egg Noodle',
  },
  {
    id: 'XtPic_hf-Jo',
    name: 'The Rope [Slackline over Monster Waves in Nazaré] [Drone]'
  },
  {
    id: 'A8q-Zx8gIbg',
    name: 'Ukrainian politician thrown into a rubbish bin by angry mob - BBC News'
  },
  {
    id: 'BhAX0gi4CbM',
    name: 'Drinking Water in Slow Motion',

  },
  {
    id: '1xTG5pHSjYQ',
    name: 'Polar Vortex 2019, Canada, Ontario (-38C)'
  },
  {
    id: 'jIl2DSXUffw',
    name: '(Original) Suicidal Snake eating itself'
  },
  {
    id: 'OR7Ug5y-va8',
    name: 'Angela Merkel seen shaking for a third time - BBC News',
    start: 51,
    end: 54
  },
  {
    id: 'ilEolWazM6o',
    name: 'Angela Merkel shaking for third time in as many weeks',
  },
  {
    id: 'aKmLxoMScb4',
    name: 'Brexit - British MP seizes mace, tossed from parliament',
  },
  {
    id: '2rCVARgnyjg',
    name: 'Never scoop again! PetSafe® ScoopFree® Self-Cleaning Litter Box',
  }
] as Video[];

type Props = YouTubeProps;

export const App = (props: Props) => {
  // let video: any;
  // let prevVideo: any;

  // dummy initial video
  const video = {
    id: 'TPChnsfBFuw',
    name: 'Drone footage of the baby whale beached at Amanzimtoti\'s Pipeline beach',
    start: 4,
    end: 51,
    order: 0,
    elapsedTime: 0
  }

  let [isChecked, setIsChecked] = useState(false);
  const { elapsedTime } = useElapsedTime(isChecked);
  let [play, { pause, isPlaying }] = useSound(soundtrack);


  const [videoId, setVideoId] = useState(video.id);
  // prevVideo = usePrevious(video)

  const onStateChange = (event: any) => {
    // if (!video && elapsedTime === 0) {
    //   video = videos.find((v: Video) => { return v.order === 0 && v.elapsedTime === 0 });
    // }
    // if (elapsedTime > 0) {
    //   video = videos.find((v: Video) => {
    //     return v.order > prevVideo.order
    //       && v.id !== prevVideo.id
    //       && v.elapsedTime >= elapsedTime
    //   });
    // }
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
          start={video.start}
          end={video.end}
          onStateChange={onStateChange}
        ></Wallpaper>
      </Container>
    </div >
  );
};
