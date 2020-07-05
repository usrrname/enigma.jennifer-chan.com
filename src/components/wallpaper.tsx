import React, { Component } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

type Props = YouTubeProps & {
  isPlaying?: boolean;
  isChecked?: boolean;
  start?: number;
  end?: number;
}

interface State {
  player: any;
}

export class Wallpaper extends Component<Props, State> {

  static state: State = {
    player: null,
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!prevProps.isChecked && this.props.isChecked) {
      this.state.player.playVideo();
    }
    if (prevProps.isChecked && !this.props.isChecked) {
      this.state.player.pauseVideo();
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

  onStateChange = (event: any) => {
    this.setState({
      player: event?.currentTarget
    })
  }
  opts = {
    playerVars: {
      controls: 0,
      color: 'red',
      playsinline: 1,
      enablejsapi: 1,
      mute: 1,
      fs: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
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