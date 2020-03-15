import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utils/utils";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

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
      const video = this._videoRef.current;

      if (video.paused) {
        video.play();
        this.setState({isPlaying: true});
      } else {
        video.pause();
        this.setState({isPlaying: false});
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
      this.launchIntoFullscreen(this._videoRef.current);
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
      const {onExitButtonClick, id} = this.props;

      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayButtonClick={this.handleVideoPlay}
          onFullscreenButtonClick={this.handleFullscreen}
          getPlaybackProgress={this.getPlaybackProgress}
          getElapsedTime={this.getElapsedTime}
          videoRef={this._videoRef}
          onExitButtonClick={onExitButtonClick}
          onLoadedMetadata={this.handleLoadedMetadata}
          onTimeUpdate={this.handleTimeUpdate}
          id={id}
        />
      );
    }
  }

  WithPlayer.propTypes = {
    muted: PropTypes.bool.isRequired,
    autoPlay: PropTypes.bool.isRequired,
    onExitButtonClick: PropTypes.func,
    id: PropTypes.number
  };

  return WithPlayer;
};

export default withPlayer;
