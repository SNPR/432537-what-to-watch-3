import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ALL_GENRES} from "../../utils/constants.js";
import {ActionCreator} from "../../reducer/state/state.js";
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card.jsx";
import {getGenre, getShowedMovies} from "../../reducer/state/selectors.js";
import {getMovies} from "../../reducer/data/selectors.js";

const MoviesListWrapped = withActiveMovieCard(MoviesList);

class GenresList extends PureComponent {
  constructor(props) {
    super(props);
  }

  getGenresList(movies) {
    return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
  }

  getMoviesByGenre(genre, movies) {
    const {showedMovies} = this.props;

    return genre === ALL_GENRES
      ? movies.slice(0, showedMovies)
      : movies.filter((movie) => movie.genre === genre).slice(0, showedMovies);
  }

  render() {
    const {
      movies,
      genre,
      changeGenre,
      onMovieCardClick,
      resetShowedMoviesAmount
    } = this.props;

    return (
      <>
        <ul className="catalog__genres-list">
          {this.getGenresList(movies).map((availableGenre, index) => (
            <li
              className={`catalog__genres-item ${
                genre === availableGenre ? `catalog__genres-item--active` : ``
              }`}
              key={availableGenre + index}
            >
              <a
                className="catalog__genres-link"
                onClick={() => {
                  changeGenre(availableGenre);
                  resetShowedMoviesAmount();
                }}
              >
                {availableGenre}
              </a>
            </li>
          ))}
        </ul>

        <MoviesListWrapped
          movies={this.getMoviesByGenre(genre, movies)}
          onMovieCardClick={onMovieCardClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  movies: getMovies(state),
  showedMovies: getShowedMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  resetShowedMoviesAmount() {
    dispatch(ActionCreator.resetShowedMoviesAmount());
  }
});

GenresList.propTypes = {
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
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  showedMovies: PropTypes.number.isRequired,
  resetShowedMoviesAmount: PropTypes.func.isRequired
};

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
