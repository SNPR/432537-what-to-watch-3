import {extend} from "../../utils/utils.js";
import {ALL_GENRES} from "../../utils/constants.js";

const SHOWED_MOVIES_DEFAULT = 8;

const initialState = {
  genre: ALL_GENRES,
  showedMovies: SHOWED_MOVIES_DEFAULT,
  selectedMovieId: 0,
  myMoviesList: []
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  RESET_SHOWED_MOVIES_AMOUNT: `RESET_SHOWED_MOVIES_AMOUNT`,
  CHANGE_SELECTED_MOVIE_ID: `CHANGE_SELECTED_MOVIE_ID`,
  ADD_MOVIE_TO_MY_LIST: `ADD_MOVIE_TO_MY_LIST`,
  REMOVE_MOVIE_FROM_MY_LIST: `REMOVE_MOVIE_FROM_MY_LIST`
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
  }),
  addMovieToMyList: (id = 0) => ({
    type: ActionType.ADD_MOVIE_TO_MY_LIST,
    payload: id
  }),
  removeMovieFromMyList: (id = 0) => ({
    type: ActionType.REMOVE_MOVIE_FROM_MY_LIST,
    payload: id
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
    case ActionType.CHANGE_SELECTED_MOVIE_ID:
      return extend(state, {
        selectedMovieId: action.payload
      });
    case ActionType.ADD_MOVIE_TO_MY_LIST:
      return extend(state, {
        myMoviesList: [...state.myMoviesList].push(action.payload)
      });
    case ActionType.REMOVE_MOVIE_FROM_MY_LIST:
      return extend(state, {
        myMoviesList: [...state.myMoviesList].filter(
            (movie) => movie.id !== action.payload
        )
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
