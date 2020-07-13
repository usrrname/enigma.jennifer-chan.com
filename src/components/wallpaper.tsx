import React, { Component } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';
import { Video, IndexState } from '../types';
import { getVideo } from '../util';
import { videos } from '../assets/videos';

type Props = YouTubeProps & {
  isPlaying: boolean;
  isChecked: boolean;
  index: IndexState;
}

interface State {
  player: any;
}

export class Wallpaper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      player: null,
    } as State
  }

  video: Video | undefined;
  opts = {
    playerVars: {
      controls: 0,
      color: 'red',
      playsinline: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
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

  componentDidMount() {
    this.onReady();
  }

  componentDidCatch() {
    this.onError();
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.index !== this.props.index) {
      this.updateOpts(nextProps, this.props);
    }
    if ((!nextProps.isChecked && this.props.isChecked)
      && (!nextProps.isPlaying && this.props.isPlaying) && this.video?.autoplay === 1) {
      this.state.player.playVideo();
    }
    if (nextProps.isChecked && !this.props.isChecked) {
      this.state.player.pauseVideo();
    }
  }

  updateOpts(props: Props, nextProps?: Props,) {
    if (props && !nextProps) {
      this.opts = {
        playerVars: {
          controls: 0,
          color: 'red',
          playsinline: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
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
    } else {
      if (nextProps && (nextProps.index !== props.index)) {
        this.video = getVideo(nextProps.index.current, videos)
        if (this.video && this.opts) {
          this.opts = {
            playerVars: {
              controls: 0,
              color: 'red',
              playsinline: 1,
              enablejsapi: 1,
              iv_load_policy: 3,
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
  }

  onReady = (event?: any) => {
    this.video = getVideo(this.props.index.current, videos);
    this.updateOpts(this.props);

    this.setState({
      player: event?.target
    })
  }

  onError = (event?: any) => {
    console.warn(event.data)
  }

  onPlay = (event: any) => {
    if (this.props.isChecked && this.props.isPlaying) {
      event.target.playVideo();
    }
  }

  onPause = (event: any) => {
    if (!this.props.isChecked || !this.props.isPlaying) {
      event.target.pauseVideo();
    }
  }

  render() {
    return (
      <ResponsiveEmbed aspectRatio='16by9' bsPrefix="embed-responsive">
        <YouTube
          videoId={this.video?.id}
          opts={this.opts}
          onReady={this.onReady}
          onEnd={this.props.onEnd}
          onError={this.onError}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onStateChange={this.props.onStateChange}
        />
      </ResponsiveEmbed>
    )
  }
}