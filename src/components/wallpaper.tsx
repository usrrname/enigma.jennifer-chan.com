import React, { useState, useEffect } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';
import { videoIdList } from '../App';

type Props = YouTubeProps & {
  isPlaying?: boolean;
  isChecked?: boolean;
  start?: number;
  end?: number;
}

interface State {
  player: any;
}

export class Wallpaper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      player: null,
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.isChecked === false && this.props.isChecked === true) {
      this.state.player.playVideo();
    }
  }

  onReady = (event: any) => {
    this.setState({
      player: event.target
    })
  }

  onPlay = (event: any) => {
    event.target.playVideo();
  }

  onPause = (event: any) => {
    if (!this.props.isChecked && !this.props.isPlaying) {
      event.target.pauseVideo();
    }
  }

  opts = {
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
      autoplay: 0,
      start: this.props.start,
      end: this.props.end
    } as PlayerVars,
  } as Options;

  render() {
    return (
      <ResponsiveEmbed aspectRatio='16by9'>
      <YouTube
        videoId={this.props.videoId}
        className={this.props.className}
        containerClassName={this.props.containerClassName}
        opts={this.opts}
        onReady={this.onReady}
        onPlay={this.onPlay}
        onPause={this.onPause}
        onStateChange={this.props.onStateChange}
      />
    </ResponsiveEmbed>
    )
  }
}
