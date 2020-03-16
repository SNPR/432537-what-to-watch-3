import * as React from "react";
import { formatTime } from "../../utils/utils";
import { Subtract } from "utility-types";

type InjectingProps = {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  onFullscreenButtonClick: () => void;
  getPlaybackProgress: () => string;
  getElapsedTime: () => string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onExitButtonClick: () => void;
  onLoadedMetadata: (evt: React.SyntheticEvent<EventTarget>) => void;
  onTimeUpdate: (evt: React.SyntheticEvent<EventTarget>) => void;
  id: string | number;
};

type withPlayerProps = {
  muted: boolean;
  autoPlay: boolean;
  onExitButtonClick: () => void;
  id: number | string;
};

type withPlayerState = {
  isPlaying: boolean;
  videoDuration: number;
  currentTime: number;
};

const withPlayer = Component => {
  type P = React.ComponentProps<typeof Component>;
  type T = withPlayerProps & Subtract<P, InjectingProps>;

  class WithPlayer extends React.PureComponent<T, withPlayerState> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        videoDuration: 0,
        currentTime: 0
      };

      this.handleVideoPlay = this.handleVideoPlay.bind(this);
      this.handleFullscreen = this.handleFullscreen.bind(this);
      this.getPlaybackProgress = this.getPlaybackProgress.bind(this);
      this.getElapsedTime = this.getElapsedTime.bind(this);
      this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
      this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
    }

    handleVideoPlay() {
      const video = this.videoRef.current;

      if (video.paused) {
        video.play();
        this.setState({ isPlaying: true });
      } else {
        video.pause();
        this.setState({ isPlaying: false });
      }
    }

    launchIntoFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    handleFullscreen() {
      this.launchIntoFullscreen(this.videoRef.current);
    }

    getPlaybackProgress() {
      return String((this.state.currentTime / this.state.videoDuration) * 100);
    }

    getElapsedTime() {
      return formatTime(this.state.videoDuration - this.state.currentTime);
    }

    handleTimeUpdate(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime)
      });
    }

    handleLoadedMetadata(evt) {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(evt.target.duration)
      });
    }

    render() {
      const { onExitButtonClick, id } = this.props;

      const { isPlaying } = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayButtonClick={this.handleVideoPlay}
          onFullscreenButtonClick={this.handleFullscreen}
          getPlaybackProgress={this.getPlaybackProgress}
          getElapsedTime={this.getElapsedTime}
          videoRef={this.videoRef}
          onExitButtonClick={onExitButtonClick}
          onLoadedMetadata={this.handleLoadedMetadata}
          onTimeUpdate={this.handleTimeUpdate}
          id={id}
        />
      );
    }
  }

  return WithPlayer;
};

export default withPlayer;
