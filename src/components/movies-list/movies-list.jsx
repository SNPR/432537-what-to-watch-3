import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import PropTypes from "prop-types";

const PLAYBACK_DELAY_TIMEOUT = 1000;

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null,
      isPlaying: false
    };

    this.movieCardMouseOverHandler = this.movieCardMouseOverHandler.bind(this);
    this.movieCardMouseOutHandler = this.movieCardMouseOutHandler.bind(this);
  }

  movieCardMouseOverHandler(selectedMovieId) {
    this.setState(() => ({
      selectedMovieId
    }));

    setTimeout(() => {
      if (this.state.selectedMovieId === selectedMovieId) {
        this.setState((prevState) => ({
          isPlaying: !prevState.isPlaying
        }));
      }
    }, PLAYBACK_DELAY_TIMEOUT);
  }

  movieCardMouseOutHandler() {
    this.setState(() => ({
      selectedMovieId: null,
      isPlaying: false
    }));
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.name + index}
            movie={movie}
            onMovieCardClick={() => onMovieCardClick(index)}
            onMovieCardMouseOver={() => this.movieCardMouseOverHandler(index)}
            onMovieCardMouseOut={this.movieCardMouseOutHandler}
            isPlaying={
              this.state.selectedMovieId === index && this.state.isPlaying
            }
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
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
        description: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export default MoviesList;
