import {ActionCreator, ActionType, reducer} from "../../reducer/state/state";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";

const initialState = {
  genre: ALL_GENRES,
  showedMovies: SHOWED_MOVIES_DEFAULT,
  selectedMovieId: 0
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

it(`Reducer should change selected movie ID`, () => {
  expect(
      reducer(
          {selectedMovieId: 0},
          {
            type: ActionType.CHANGE_SELECTED_MOVIE_ID,
            payload: 1
          }
      )
  ).toEqual({
    selectedMovieId: 1
  });

  expect(
      reducer(
          {selectedMovieId: 0},
          {
            type: ActionType.CHANGE_SELECTED_MOVIE_ID,
            payload: 2
          }
      )
  ).toEqual({selectedMovieId: 2});
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

  it(`Action creator for selected movie id returns 0 by default`, () => {
    expect(ActionCreator.changeSelectedMovieId()).toEqual({
      type: ActionType.CHANGE_SELECTED_MOVIE_ID,
      payload: 0
    });
  });

  it(`Action creator for selected movie id returns correct action`, () => {
    expect(ActionCreator.changeSelectedMovieId(1)).toEqual({
      type: ActionType.CHANGE_SELECTED_MOVIE_ID,
      payload: 1
    });
  });
});
