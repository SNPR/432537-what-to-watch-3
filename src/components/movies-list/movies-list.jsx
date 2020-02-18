import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import PropTypes from "prop-types";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null,
      isPlaying: false
    };

    this.movieCardHoverHandler = this.movieCardHoverHandler.bind(this);
  }

  movieCardHoverHandler(selectedMovieId) {
    this.setState((prevState) => ({
      selectedMovieId,
      isPlaying: !prevState.isPlaying
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
            onMovieCardHover={() => this.movieCardHoverHandler(index)}
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
