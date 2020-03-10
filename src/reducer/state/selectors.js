import Namespace from "../namespace.js";
import {createSelector} from "reselect";

export const getGenre = (state) => {
  return state[Namespace.STATE].genre;
};
export const getShowedMovies = (state) => {
  return state[Namespace.STATE].showedMovies;
};

const findSelectedMovie = (state) => {
  const movies = state[Namespace.DATA].films;
  const id = state[Namespace.STATE].selectedMovieId;
  return movies.find((movie) => movie.id === id);
};

export const getSelectedMovie = createSelector(
    (state) => state,
    findSelectedMovie
);

const findMoviesFromMylist = (state) => {
  const movies = state[Namespace.DATA].films;
  const myList = state[Namespace.STATE].myMoviesList;

  return movies.filter((movie) => myList.includes(movie.id));
};

export const getMoviesFromMyList = createSelector(
    (state) => state,
    findMoviesFromMylist
);

export const getMyMoviesIdsList = (state) => {
  return state[Namespace.STATE].myMoviesList;
};
