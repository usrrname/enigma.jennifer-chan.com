import React, { Component } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';
import { Video } from '../types';
import { getVideo } from '../util';
import { videos } from '../assets/videos';

type Props = YouTubeProps & {
  isPlaying: boolean;
  isChecked: boolean;
  index: number;
}

interface State {
  player: any;
}

export class Wallpaper extends Component<Props, State> {
  video: Video | undefined;
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
      autoplay: this.video?.autoplay,
      start: this.video?.start,
      end: this.video?.end
    }
  } as Options;

  state: State = {
    player: null,
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.index !== this.props.index) {
      this.updateOpts(nextProps);
    }
    if (!nextProps.isChecked && this.props.isChecked) {
      this.state.player.playVideo();
    }
    if (nextProps.isChecked && !this.props.isChecked) {
      this.state.player.pauseVideo();
    }
  }

  updateOpts(nextProps: Props) {
    if (nextProps.index !== this.props.index) {
      this.video = getVideo(nextProps.index, videos)
      if (this.video) {
        this.opts = {
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
            autoplay: this.video?.autoplay,
            start: this.video?.start,
            end: this.video?.end
          } as PlayerVars,
        } as Options;
      }
    }
  }

  onReady = (event: any) => {
    this.video = getVideo(this.props.index, videos);
    this.setState({
      player: event?.target
    })
    this.onPlay(event);
  }

  onPlay = (event: any) => {
    if ((this.props.isChecked && this.props.isPlaying) || this.video?.autoplay === 1) {
      event.target.playVideo();
    }
  }

  onPause = (event: any) => {
    if (!this.props.isChecked && !this.props.isPlaying) {
      event.target.pauseVideo();
    }
  }

  render() {
    return (
      <ResponsiveEmbed aspectRatio='16by9'>
        <YouTube
          videoId={this.video?.id}
          className={this.props.className}
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