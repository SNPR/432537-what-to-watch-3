import * as React from "react";
import {connect} from "react-redux";
import {ALL_GENRES} from "../../utils/constants";
import {ActionCreator} from "../../reducer/state/state";
import MoviesList from "../movies-list/movies-list";
import withActiveMovieCard from "../../hocs/with-active-movie-card/with-active-movie-card";
import {getGenre, getShowedMovies} from "../../reducer/state/selectors";
import {getMovies, getMoviesByGenre} from "../../reducer/data/selectors";
import {Movie} from "../../types";

const MoviesListWrapped = withActiveMovieCard(MoviesList);

type GenresListProps = {
  movies: Movie[];
  filteredMovies: Movie[];
  genre: string;
  changeGenre: (
    genre: string
  ) => {
    type: string;
    payload: string;
  };
  onMovieCardClick: (id: string) => void;
  showedMovies: number;
  resetShowedMoviesAmount: () => {
    type: string;
    payload: null;
  };
};

class GenresList extends React.PureComponent<GenresListProps, {}> {
  constructor(props) {
    super(props);
  }

  getGenresList(movies) {
    return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
  }

  render() {
    const {
      movies,
      filteredMovies,
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
          movies={filteredMovies}
          onMovieCardClick={onMovieCardClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  movies: getMovies(state),
  filteredMovies: getMoviesByGenre(state),
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

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
