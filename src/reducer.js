import {extend} from "./utils/utils.js";
import {ALL_GENRES} from "./utils/constants.js";
import {normalizeMovieData, normalizeMoviesData} from "./utils/utils.js";

const SHOWED_MOVIES_DEFAULT = 8;

const initialState = {
  genre: ALL_GENRES,
  promoFilm: {},
  films: [],
  showedMovies: SHOWED_MOVIES_DEFAULT
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES_AMOUNT: `RESET_SHOWED_MOVIES_AMOUNT`,
  GET_MOVIES: `GET_MOVIES`,
  GET_PROMO_MOVIE: `GET_PROMO_MOVIE`
};

export const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.getMovies(normalizeMoviesData(response.data)));
    });
  },
  getPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      dispatch(ActionCreator.getPromoMovie(normalizeMovieData(response.data)));
    });
  }
};

const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: null
  }),
  resetShowedMoviesAmount: () => ({
    type: ActionType.RESET_SHOWED_MOVIES_AMOUNT,
    payload: null
  }),
  getMovies: (movies) => ({
    type: ActionType.GET_MOVIES,
    payload: movies
  }),
  getPromoMovie: (movie) => ({
    type: ActionType.GET_PROMO_MOVIE,
    payload: movie
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.SHOW_MORE_MOVIES:
      return extend(state, {
        showedMovies: state.showedMovies + 8
      });
    case ActionType.RESET_SHOWED_MOVIES_AMOUNT:
      return extend(state, {
        showedMovies: SHOWED_MOVIES_DEFAULT
      });
    case ActionType.GET_MOVIES:
      return extend(state, {
        films: action.payload
      });
    case ActionType.GET_PROMO_MOVIE:
      return extend(state, {
        promoFilm: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
