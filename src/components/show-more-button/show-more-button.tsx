import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state";
import {getMovies, getMoviesByGenre} from "../../reducer/data/selectors";
import {getGenre, getShowedMovies} from "../../reducer/state/selectors";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";
import {Movie} from "../../types";

type ShowMoreButtonProps = {
  movies: Movie[];
  filteredMovies: Movie[];
  onShowMoreMoviesButtonClick: () => {
    type: string;
    payload: null;
  };
  showedMovies: number;
  genre: string;
};

const ShowMoreButton: React.FunctionComponent<ShowMoreButtonProps> = (
    props: ShowMoreButtonProps
) => {
  const {
    movies,
    showedMovies,
    onShowMoreMoviesButtonClick,
    filteredMovies,
    genre
  } = props;
  return (filteredMovies.length > SHOWED_MOVIES_DEFAULT &&
    genre !== ALL_GENRES) ||
    (showedMovies < movies.length && genre === ALL_GENRES) ? (
      <div className="catalog__more">
        <button
          className="catalog__button"
          type="button"
          onClick={onShowMoreMoviesButtonClick}
        >
        Show more
        </button>
      </div>
    ) : null;
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  showedMovies: getShowedMovies(state),
  filteredMovies: getMoviesByGenre(state),
  genre: getGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreMoviesButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
