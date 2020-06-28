import React, { useState } from 'react';
import YouTube, { YouTubeProps, Options } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

type Props = YouTubeProps;

export const Wallpaper = (props: Props) => {
  let [player, setPlayer] = useState();
  const opts = {
    playerVars: {
      controls: 0,
      color: 'red',
      playsinline: 1,
      mute: 1,
      modestbranding: 1,
      showinfo: 0,
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  } as Options;
  const onReady = (event: any) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
  }
  const onClick = (event: any) => {
    event.preventDefault();
  }
  return (
    <ResponsiveEmbed aspectRatio='16by9' onClick={onClick}>
      <YouTube videoId={props.videoId} className={props.className} opts={opts} onReady={onReady} />
    </ResponsiveEmbed>
  );
}