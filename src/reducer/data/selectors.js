import {createSelector} from "reselect";
import Namespace from "../namespace.js";
import {ALL_GENRES} from "../../utils/constants.js";

export const getMovies = (state) => {
  return state[Namespace.DATA].films;
};

export const getPromoMovie = (state) => {
  return state[Namespace.DATA].promoFilm;
};

export const getComments = (state) => {
  return state[Namespace.DATA].currentFilmComments;
};

const filterMoviesByGenre = (state) => {
  const movies = state[Namespace.DATA].films;
  const showedMovies = state[Namespace.STATE].showedMovies;
  const genre = state[Namespace.STATE].genre;

  return genre === ALL_GENRES
    ? movies.slice(0, showedMovies)
    : movies.filter((movie) => movie.genre === genre).slice(0, showedMovies);
};

export const getMoviesByGenre = createSelector(
    (state) => state,
    filterMoviesByGenre
);

const findMoviesList = (state) =>
  state[Namespace.DATA].films.filter((movie) => movie.isFavorite);

export const getMyMoviesList = createSelector((state) => state, findMoviesList);
