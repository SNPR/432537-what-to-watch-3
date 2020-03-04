import {extend} from "./utils/utils.js";
import films from "./mocks/films.js";
import {ALL_GENRES} from "./utils/constants.js";
import {normalizeData} from "./utils/utils.js";

const SHOWED_MOVIES_DEFAULT = 8;

const initialState = {
  genre: ALL_GENRES,
  films: [],
  showedMovies: SHOWED_MOVIES_DEFAULT
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES_AMOUNT: `RESET_SHOWED_MOVIES_AMOUNT`,
  GET_MOVIES: `GET_MOVIES`
};

export const Operation = {
  getMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`).then((response) => {
      dispatch(ActionCreator.getMovies(normalizeData(response.data)));
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
