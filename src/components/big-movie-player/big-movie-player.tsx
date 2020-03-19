import * as React from "react";
import {getSelectedMovie} from "../../reducer/state/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {connect} from "react-redux";
import {Movie} from "../../types";

type BigMoviePlayerProps = {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  onFullscreenButtonClick: () => void;
  playbackProgress: string;
  elapsedTime: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  muted: boolean;
  autoPlay: boolean;
  movie: Movie;
  onExitButtonClick: () => void;
  onLoadedMetadata: (evt: React.SyntheticEvent<EventTarget>) => void;
  onTimeUpdate: (evt: React.SyntheticEvent<EventTarget>) => void;
  changeSelectedMovieId: (
    id: string | number
  ) => {
    type: string;
    payload: string;
  };
  id: number;
};

class BigMoviePlayer extends React.PureComponent<BigMoviePlayerProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, changeSelectedMovieId} = this.props;

    changeSelectedMovieId(id);
  }

  render() {
    const {
      isPlaying,
      onPlayButtonClick,
      onFullscreenButtonClick,
      playbackProgress,
      elapsedTime,
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
                value={playbackProgress}
                max="100"
              />
              <div
                className="player__toggler"
                style={{left: `${playbackProgress}%`}}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">{elapsedTime}</div>
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

const mapStateToProps = (state) => ({
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedMovieId(id) {
    dispatch(ActionCreator.changeSelectedMovieId(id));
  }
});

export {BigMoviePlayer};
export default connect(mapStateToProps, mapDispatchToProps)(BigMoviePlayer);
