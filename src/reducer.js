import {extend} from "./utils/utils.js";
import films from "./mocks/films.js";
import {ALL_GENRES} from "./utils/constants.js";

const initialState = {
  genre: ALL_GENRES,
  films
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTER_MOVIES_BY_GENRE: `FILTER_MOVIES_BY_GENRE`
};

const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  filterMoviesByGenre: (genre = ALL_GENRES) => ({
    type: ActionType.FILTER_MOVIES_BY_GENRE,
    payload: genre
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    case ActionType.FILTER_MOVIES_BY_GENRE:
      return extend(state, {
        films:
          action.payload === ALL_GENRES
            ? initialState.films
            : initialState.films.filter((film) => film.genre === action.payload)
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
