import React, { useState } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

type Props = YouTubeProps & {
  isPlaying?: boolean;
  isChecked?: boolean;
}

enum videoIdList {
  FIRST_VIDEO = "TPChnsfBFuw",
  SECOND_VIDEO = "IZRruR6X220",
  THIRD_VIDEO = "XJ8i896xM"
}

export const Wallpaper = (props: Props) => {
  let { isChecked, isPlaying } = props;
  const [videoId, setVideoId] = useState(videoIdList.FIRST_VIDEO);
  const [player, setPlayer] = useState(null);

  const onReady = (event: any) => {
    setPlayer(event.target)
  }

  const onPlay = (event: any) => {
    if (isChecked && isPlaying) {
      event.target.playVideo();
    }
  }

  const onPause = (event: any) => {
    if (!isChecked && !isPlaying) {
      event.target.pauseVideo();
    }
  }

  const onStateChange = (event: any) => {
    setVideoId(videoId === videoIdList.FIRST_VIDEO ? videoIdList.FIRST_VIDEO : videoIdList.SECOND_VIDEO);
  }

  const opts = {
    playerVars: {
      controls: 0,
      color: 'red',
      enablejsapi: 1,
      playsinline: 1,
      mute: 1,
      modestbranding: 1,
      showinfo: 0,
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    } as PlayerVars,
  } as Options;

  return (
    <ResponsiveEmbed aspectRatio='16by9'>
      <YouTube
        videoId={videoId}
        className={props.className}
        containerClassName={props.containerClassName}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onStateChange={onStateChange}
      />
    </ResponsiveEmbed>
  );

}