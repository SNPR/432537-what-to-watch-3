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
      this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
      this.loadedMetadataHandler = this.loadedMetadataHandler.bind(this);
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

    handleFullscreen() {
      const video = this._videoRef.current;

      video.requestFullscreen();
    }

    getPlaybackProgress() {
      return String((this.state.currentTime / this.state.videoDuration) * 100);
    }

    getElapsedTime() {
      return formatTime(this.state.videoDuration - this.state.currentTime);
    }

    timeUpdateHandler(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime)
      });
    }

    loadedMetadataHandler(evt) {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(evt.target.duration)
      });
    }

    render() {
      const {onExitButtonClick} = this.props;
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
          onLoadedMetadata={this.loadedMetadataHandler}
          onTimeUpdate={this.timeUpdateHandler}
        />
      );
    }
  }

  WithPlayer.propTypes = {
    movie: PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterUrl: PropTypes.string.isRequired,
      bigPosterUrl: PropTypes.string.isRequired,
      trailerUrl: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      runTime: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      votes: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(
          PropTypes.shape({
            rating: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
          })
      ).isRequired
    }).isRequired,
    muted: PropTypes.bool.isRequired,
    autoPlay: PropTypes.bool.isRequired,
    onExitButtonClick: PropTypes.func.isRequired
  };

  return WithPlayer;
};

export default withPlayer;
