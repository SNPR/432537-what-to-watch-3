import {extend} from "./utils/utils.js";
import films from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  films
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getMoviesByGenre: (genre) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: genre
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        films: state.films.filter((film) => film.genre === action.payload)
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
