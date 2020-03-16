import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ActionCreator } from "../../reducer/state/state";
import { getMovies, getMoviesByGenre } from "../../reducer/data/selectors";
import { getGenre, getShowedMovies } from "../../reducer/state/selectors";
import { ALL_GENRES, SHOWED_MOVIES_DEFAULT } from "../../utils/constants";

const ShowMoreButton = ({
  movies,
  showedMovies,
  showMoreMovies,
  filteredMovies,
  genre
}) => {
  return (filteredMovies.length > SHOWED_MOVIES_DEFAULT &&
    genre !== ALL_GENRES) ||
    (showedMovies < movies.length && genre === ALL_GENRES) ? (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={showMoreMovies}
      >
        Show more
      </button>
    </div>
  ) : null;
};

ShowMoreButton.propTypes = {
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
  ).isRequired,
  filteredMovies: PropTypes.arrayOf(
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
  ).isRequired,
  showMoreMovies: PropTypes.func.isRequired,
  showedMovies: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  movies: getMovies(state),
  showedMovies: getShowedMovies(state),
  filteredMovies: getMoviesByGenre(state),
  genre: getGenre(state)
});

const mapDispatchToProps = dispatch => ({
  showMoreMovies() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export { ShowMoreButton };
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
