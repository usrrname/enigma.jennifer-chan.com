import React, { Component } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

type Props = YouTubeProps & {
  isPlaying?: boolean;
  isChecked?: boolean;
  isPlayer?: boolean;
  playerTarget: any;
  autoplay?: number;
  start?: number;
  end?: number;
}

interface State {
  player: any;
}

export class Wallpaper extends Component<Props, State> {

  state: State = {
    player: null,
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if ((!prevProps.isChecked && this.props.isChecked) ||
      (prevProps.videoId !== this.props.videoId || this.props.autoplay) ||
      (prevProps.isPlaying && this.props.isPlaying)) {
      this.state.player.playVideo();
    }
    if (prevProps.isChecked && !this.props.isChecked) {
      this.state.player.pauseVideo();
    }
  }
  componentWillUnmount() {
    this.setState = (state: State, callback) => {
      return;
    };
  }
  onReady = (event: any) => {
    this.setState({
      player: event?.target || this.props.playerTarget
    })
  }
  onPlay = (event: any) => {
    if ((this.props.isChecked && this.props.isPlaying) || this.props.autoplay === 1) {
      event.target.playVideo();
    }
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
      enablejsapi: 1,
      mute: 1,
      fs: 0,
      disablekb: 1,
      modestbranding: 1,
      showinfo: 0,
      autoplay: this.props.autoplay,
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
          onEnd={this.props.onEnd}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onStateChange={this.props.onStateChange}
        />
      </ResponsiveEmbed>
    )
  }
}