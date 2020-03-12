import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const PLAYBACK_DELAY_TIMEOUT = 1000;

const withActiveMovieCard = (Component) => {
  class WithActiveMovieCard extends PureComponent {
    constructor(props) {
      super(props);

      this.playbackTimeout = null;

      this.state = {
        selectedMovieId: null,
        isPlaying: false
      };

      this.movieCardMouseOverHandler = this.movieCardMouseOverHandler.bind(
          this
      );
      this.movieCardMouseOutHandler = this.movieCardMouseOutHandler.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
    }

    togglePlay(selectedMovieId) {
      this.playbackTimeout = setTimeout(() => {
        if (this.state.selectedMovieId === selectedMovieId) {
          this.setState(() => ({
            isPlaying: true
          }));
        }
      }, PLAYBACK_DELAY_TIMEOUT);
    }

    movieCardMouseOverHandler(selectedMovieId) {
      this.setState(
          () => ({
            selectedMovieId
          }),
          () => this.togglePlay(selectedMovieId)
      );
    }

    movieCardMouseOutHandler() {
      this.setState(() => ({
        selectedMovieId: null,
        isPlaying: false
      }));
    }

    componentWillUnmount() {
      if (this.playbackTimeout) {
        clearTimeout(this.playbackTimeout);
      }
    }

    render() {
      const {selectedMovieId, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          selectedMovieId={selectedMovieId}
          isPlaying={isPlaying}
          onMovieCardMouseOver={this.movieCardMouseOverHandler}
          onMovieCardMouseOut={this.movieCardMouseOutHandler}
        />
      );
    }
  }

  WithActiveMovieCard.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ),
    onMovieCardClick: PropTypes.func
  };

  return WithActiveMovieCard;
};

export default withActiveMovieCard;
