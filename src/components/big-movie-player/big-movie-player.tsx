import * as React from "react";
import PropTypes from "prop-types";
import { getSelectedMovie } from "../../reducer/state/selectors.js";
import { ActionCreator } from "../../reducer/state/state.js";
import { connect } from "react-redux";

class BigMoviePlayer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, changeSelectedMovieId } = this.props;

    changeSelectedMovieId(id);
  }

  render() {
    const {
      isPlaying,
      onPlayButtonClick,
      onFullscreenButtonClick,
      getPlaybackProgress,
      getElapsedTime,
      videoRef,
      muted,
      autoPlay,
      movie,
      onExitButtonClick,
      onLoadedMetadata,
      onTimeUpdate
    } = this.props;

    return movie ? (
      <div className="player">
        <video
          ref={videoRef}
          muted={muted}
          poster={movie.bigPosterUrl}
          width="100%"
          autoPlay={autoPlay}
          onClick={onPlayButtonClick}
          className="player__video"
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        >
          <source src={movie.trailerUrl} />
        </video>

        <button
          type="button"
          className="player__exit"
          onClick={onExitButtonClick}
        >
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={getPlaybackProgress()}
                max="100"
              />
              <div
                className="player__toggler"
                style={{ left: `${getPlaybackProgress()}%` }}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">{getElapsedTime()}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={onPlayButtonClick}
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
              onClick={onFullscreenButtonClick}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

BigMoviePlayer.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string,
    posterUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    bigPosterUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.number,
    id: PropTypes.number,
    isFavorite: PropTypes.bool,
    videoUrl: PropTypes.string,
    trailerUrl: PropTypes.string
  }),
  muted: PropTypes.bool.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
  getPlaybackProgress: PropTypes.func.isRequired,
  getElapsedTime: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  onExitButtonClick: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  changeSelectedMovieId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = dispatch => ({
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

export { BigMoviePlayer };
export default connect(mapStateToProps, mapDispatchToProps)(BigMoviePlayer);
