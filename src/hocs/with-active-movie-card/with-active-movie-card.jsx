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
          name: PropTypes.string.isRequired,
          posterUrl: PropTypes.string.isRequired,
          bigPosterUrl: PropTypes.string.isRequired,
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
        }).isRequired
    ).isRequired,
    onMovieCardClick: PropTypes.func.isRequired
  };

  return WithActiveMovieCard;
};

export default withActiveMovieCard;
