import {extend} from "../../utils/utils";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";

const initialState = {
  genre: ALL_GENRES,
  showedMovies: SHOWED_MOVIES_DEFAULT,
  selectedMovieId: 0
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES_AMOUNT: `RESET_SHOWED_MOVIES_AMOUNT`,
  CHANGE_SELECTED_MOVIE_ID: `CHANGE_SELECTED_MOVIE_ID`
};

const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  changeSelectedMovieId: (id = 0) => ({
    type: ActionType.CHANGE_SELECTED_MOVIE_ID,
    payload: id
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
        showedMovies: state.showedMovies + SHOWED_MOVIES_DEFAULT
      });
    case ActionType.RESET_SHOWED_MOVIES_AMOUNT:
      return extend(state, {
        showedMovies: SHOWED_MOVIES_DEFAULT
      });
    case ActionType.CHANGE_SELECTED_MOVIE_ID:
      return extend(state, {
        selectedMovieId: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
