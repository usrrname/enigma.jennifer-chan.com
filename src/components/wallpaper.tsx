import React, { Component } from 'react';
import YouTube, { YouTubeProps, Options, PlayerVars } from 'react-youtube';
import { ResponsiveEmbed, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Video, IndexState } from '../types';
import { getVideo } from '../util';
import { videos } from '../assets/videos';

type Props = YouTubeProps & {
  isPlaying: boolean;
  isChecked: boolean;
  index: IndexState;
  onEnd: (event: any) => void;
  onPlayerReady: () => void;
}

interface State {
  isLoading: boolean;
  player: any;
}

export class Wallpaper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      player: null,
      isLoading: true
    } as State
  }
  keyImage = require('../assets/keys.png');
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

  componentDidCatch() {
    this.onError();
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.index !== this.props.index) {
      this.updateOpts(nextProps, this.props);
      this.state.player.playVideo();
    }
    if ((!nextProps.isChecked && this.props.isChecked)
      || this.video?.autoplay === 1) {
      this.state.player.playVideo();
    }
    if ((nextProps.isChecked && !this.props.isChecked) || (nextProps.isPlaying && !this.props.isPlaying)) {
      this.state.player.pauseVideo();
    }
  }

  updateOpts(props: Props, nextProps?: Props) {
    this.video = getVideo(props.index.current, videos);
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
    this.props.onPlayerReady();
    this.setState({
      player: event?.target,
      isLoading: false
    })
    this.updateOpts(this.props);

  }

  onError = (event?: any) => {
    console.warn(event.data)
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
      this.props?.onEnd(event);
    });
  }

  onPlay = (event: any) => {
    if (this.props.isChecked && this.props.isPlaying) {
      event?.target.playVideo();
    }
  }

  onPause = (event: any) => {
    if (!this.props.isChecked || !this.props.isPlaying) {
      event?.target.pauseVideo();
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading &&
          <Container className="spinner container-fluid" fluid>
            <Row>
              <Col lg={{ span: 12, offset: 3 }} className="mt-5">
                <Spinner animation="border" />
                <p>Toggle back and forth</p>
                <img src={this.keyImage} alt="Toggle back and forth with left and right keys" width={100} />
              </Col>
            </Row>
          </Container>
        }
        <ResponsiveEmbed aspectRatio='16by9'>
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
      </>
    )
  }
}