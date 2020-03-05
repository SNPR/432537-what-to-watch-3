import {extend} from "../../utils/utils.js";
import {ALL_GENRES} from "../../utils/constants.js";

const SHOWED_MOVIES_DEFAULT = 8;

const initialState = {
  genre: ALL_GENRES,
  showedMovies: SHOWED_MOVIES_DEFAULT
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES_AMOUNT: `RESET_SHOWED_MOVIES_AMOUNT`
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
