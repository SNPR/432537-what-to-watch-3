import {createSelector} from "reselect";
import Namespace from "../namespace.js";

export const getMovies = (state) => {
  return state[Namespace.DATA].films;
};


export const getPromoMovie = (state) => {
  return state[Namespace.DATA].promoFilm;
};


export const getComments = (state) => {
  return state[Namespace.DATA].currentFilmComments;
};


