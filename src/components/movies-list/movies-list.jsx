import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card";
import PropTypes from "prop-types";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieId: null
    };

    this.movieCardHoverHandler = this.movieCardHoverHandler.bind(this);
  }

  movieCardHoverHandler(evt) {
    console.log(evt.target);
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.name + index}
            movie={movie}
            onMovieTitleClick={onMovieTitleClick}
            onMovieCardHover={this.movieCardHoverHandler}
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
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};

export default MoviesList;
