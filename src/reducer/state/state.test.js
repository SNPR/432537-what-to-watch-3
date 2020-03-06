import {
  reducer,
  ActionCreator,
  ActionType
} from "../../reducer/state/state.js";
import {ALL_GENRES} from "../../utils/constants";

const SHOWED_MOVIES_DEFAULT = 8;

const initialState = {
  genre: ALL_GENRES,
  showedMovies: SHOWED_MOVIES_DEFAULT
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should change genre`, () => {
  expect(
      reducer(
          {genre: ALL_GENRES},
          {
            type: ActionType.CHANGE_GENRE,
            payload: `Action`
          }
      )
  ).toEqual({
    genre: `Action`
  });

  expect(
      reducer(
          {genre: ALL_GENRES},
          {
            type: ActionType.CHANGE_GENRE,
            payload: `Crime`
          }
      )
  ).toEqual({genre: `Crime`});
});

it(`Reducer should increase and reset showed movies counter`, () => {
  expect(
      reducer(
          {showedMovies: SHOWED_MOVIES_DEFAULT},
          {
            type: ActionType.SHOW_MORE_MOVIES
          }
      )
  ).toEqual({
    showedMovies: 16
  });

  expect(
      reducer(
          {showedMovies: 1},
          {
            type: ActionType.RESET_SHOWED_MOVIES_AMOUNT
          }
      )
  ).toEqual({
    showedMovies: SHOWED_MOVIES_DEFAULT
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for genre changing returns correct action`, () => {
    expect(ActionCreator.changeGenre(`Action`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `Action`
    });
  });

  it(`Action creator for genre changing returns default genre if no genre provided`, () => {
    expect(ActionCreator.changeGenre()).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: ALL_GENRES
    });
  });
});