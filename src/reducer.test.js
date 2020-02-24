import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {ALL_GENRES} from "./utils/constants";
import films from "./mocks/films";

const initialState = {
  genre: ALL_GENRES,
  films
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
