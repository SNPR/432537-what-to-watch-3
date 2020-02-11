import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card";
import PropTypes from "prop-types";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null
    };
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.name + index}
            movie={movie}
            onMovieTitleClick={() => {}}
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
        posterUrl: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};

export default MoviesList;
