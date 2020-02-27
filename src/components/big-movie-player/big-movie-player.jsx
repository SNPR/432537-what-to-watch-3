import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utils/utils.js";

class BigMoviePlayer extends PureComponent {
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

  componentDidMount() {
    const video = this._videoRef.current;

    video.onloadedmetadata = () => {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(video.duration)
      });
    };

    video.ontimeupdate = () =>
      this.setState({
        currentTime: Math.floor(video.currentTime)
      });
  }

  render() {
    const {movie, muted, autoPlay} = this.props;
    const {isPlaying} = this.state;

    return (
      <div className="player">
        <video
          ref={this._videoRef}
          muted={muted}
          poster={movie.bigPosterUrl}
          width="100%"
          autoPlay={autoPlay}
          onClick={this.handleVideoPlay}
          className="player__video"
        >
          <source src={movie.trailerUrl} />
        </video>

        <button type="button" className="player__exit">
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={this.getPlaybackProgress()}
                max="100"
              />
              <div
                className="player__toggler"
                style={{left: `${this.getPlaybackProgress()}%`}}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">{this.getElapsedTime()}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={this.handleVideoPlay}
            >
              {isPlaying ? (
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
            <div className="player__name">Transpotting</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={this.handleFullscreen}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BigMoviePlayer.propTypes = {
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
  autoPlay: PropTypes.bool.isRequired
};

export default BigMoviePlayer;