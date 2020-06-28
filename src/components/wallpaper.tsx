import React, { useState } from 'react';
import YouTube, { YouTubeProps, Options } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

type Props = YouTubeProps;

export const Wallpaper = (props: Props) => {
  let [player, setPlayer] = useState(null);
  const opts = {
    playerVars: {
      playsinline: 1,
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

  return (
    <ResponsiveEmbed>
      <YouTube videoId='IZRruR6X220' className={props.className} opts={opts} onReady={onReady} />
    </ResponsiveEmbed>
  );
}