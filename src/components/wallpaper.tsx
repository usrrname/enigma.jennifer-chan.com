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
  video: Video;
  opts: Options;
}

export class Wallpaper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      video: getVideo(props.index.current, videos),
      opts: {
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
          autoplay: 1,
          start: 6,
          end: 20
        }
      },
      player: null,
      isLoading: false
    } as unknown as State
  }
  keyImage = require('../assets/keys.png');

  componentDidMount() {
    this.setState({
      isLoading: true
    })
  }

  componentDidCatch() {
    this.onError();
  }

  componentDidUpdate(nextProps: Props) {
    if (nextProps.index !== this.props.index) {
      this.updateOpts(this.props, nextProps);
    }

    if (!nextProps.isChecked && this.props.isChecked) {
      this.state.player.playVideo();
    }

    if ((nextProps.isChecked && !this.props.isChecked) || (nextProps.isPlaying && !this.props.isPlaying)) {
      this.state.player.pauseVideo();
    }
  }

  updateOpts(props: Props, nextProps?: Props) {

    if (props && nextProps && (nextProps.index.current !== props.index.current)) {
      const nextVideo = getVideo(nextProps.index.current, videos);

      this.setState({
        video: nextVideo,
        opts: {
          playerVars: {
            controls: 0,
            color: 'red',
            playsinline: 1,
            enablejsapi: 1,
            iv_load_policy: 3,
            mute: nextVideo.mute ? nextVideo.mute : 1,
            fs: 0,
            disablekb: 1,
            modestbranding: 1,
            showinfo: 0,
            autoplay: 1,
            start: nextVideo.start,
            end: nextVideo.end
          } as PlayerVars,
        } as Options
      });
    }
  }

  onReady = (event?: any) => {
    this.setState({
      player: event?.target,
      isLoading: false
    });

    this.props.onPlayerReady();
  }

  onError = (event?: any) => {
    console.warn(event.data);
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
            videoId={this.state.video?.id}
            opts={this.state.opts}
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