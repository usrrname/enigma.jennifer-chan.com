import React, { useState } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';
import { videoIdList } from '../App';

type Props = YouTubeProps & {
  isPlaying?: boolean;
  isChecked?: boolean;
  start?: number;
  end?: number;
}

export const Wallpaper = (props: Props) => {
  let { isChecked, isPlaying, start, end } = props;
  const [player, setPlayer] = useState(null);

  const onReady = (event: any) => {
    setPlayer(event.target)
  }

  const onPlay = (event: any) => {
    event.target.playVideo();
  }

  const onPause = (event: any) => {
    if (!isChecked && !isPlaying) {
      event.target.pauseVideo();
    }
  }

  const opts = {
    playerVars: {
      controls: 0,
      color: 'red',
      playsinline: 1,
      mute: 1,
      fs: 0,
      disablekb: 0,
      modestbranding: 1,
      showinfo: 0,
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: start,
      end: end
    } as PlayerVars,
  } as Options;

  return (
    <ResponsiveEmbed aspectRatio='16by9'>
      <YouTube
        videoId={props.videoId}
        className={props.className}
        containerClassName={props.containerClassName}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onStateChange={props.onStateChange}
      />
    </ResponsiveEmbed>
  );

}