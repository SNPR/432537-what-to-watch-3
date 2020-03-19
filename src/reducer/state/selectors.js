import Namespace from "../namespace";
import {createSelector} from "reselect";

export const getGenre = (state) => {
  return state[Namespace.STATE].genre;
};
export const getShowedMovies = (state) => {
  return state[Namespace.STATE].showedMovies;
};

export const getSelectedMovie = createSelector(
    (state) => state[Namespace.DATA].films,
    (state) => state[Namespace.STATE].selectedMovieId,
    (movies, id) => movies.find((movie) => movie.id === id)
);
