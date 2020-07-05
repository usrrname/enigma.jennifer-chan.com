import './App.css';
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { SoundToggle } from './components/soundToggle';
import { Wallpaper } from './components/wallpaper';
import { Container } from 'react-bootstrap';
import { useElapsedTime } from 'use-elapsed-time';
import useSound from 'use-sound';
import { YouTubeProps } from 'react-youtube';
import { Video } from './types';

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
    elapsedTime: 51
  },
  {
    id: '_OT4CNxHEGM',
    name: 'How does a dog drink',
    start: 74,
    end: 84,
    order: 3,
    elapsedTime: 67.220
  },
  {
    id: 'WIo9ROTi7a4',
    name: 'the bucket',
    start: 64,
    end: 84,
    order: 4,
    elapsedTime: 74.5
  },
  {
    id: 'jIl2DSXUffw',
    name: '(Original) Suicidal Snake eating itself',
    start: 17,
    end: 23,
    order: 5,
    elapsedTime: 84.30
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
    elapsedTime: 94
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
    name: 'Drinking Water in Slow Motion'
  },
  {
    id: '1xTG5pHSjYQ',
    name: 'Polar Vortex 2019, Canada, Ontario (-38C)'
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
  const video = videos.find((v: Video) => { return v.id === 'TPChnsfBFuw' && v.order === 0 });

  let [isChecked, setIsChecked] = useState<boolean>(false);
  const { elapsedTime } = useElapsedTime(isChecked);
  let [play, { pause, isPlaying }] = useSound(soundtrack);

  let [videoId, setVideoId] = useState(video?.id);
  const [player, setPlayer] = useState(null);
  const prevVideo = useRef(video).current;

  const onStateChange = (event: any, videoId?: string) => {
    setVideoId(videoId);
    setPlayer(event.target);
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'delete':
      case 'ArrowLeft':
        if (prevVideo) {
          const nextVideo = videos.find(v => { return v.id === prevVideo?.id && (v.order === prevVideo?.order && v.order >= 0) })
          onStateChange(event, nextVideo?.id);
        }
        break;
      case 'Enter':
      case 'ArrowRight':
        if (prevVideo) {
          const nextVideo = videos.find(v => { return v.id !== prevVideo?.id && v.order === prevVideo?.order + 1 })
          onStateChange(event, nextVideo?.id);
        }
        break;
    }
  }

  useEffect(() => {
    if (prevVideo && (elapsedTime > prevVideo?.elapsedTime)) {
      setVideoId(videoId);
      setPlayer(player)
    }
  }, [elapsedTime, prevVideo, videoId, player])


  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex={0}>
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
          start={video?.start}
          end={video?.end}
          onStateChange={onStateChange}
        />
      </Container>
    </div >
  );
};
