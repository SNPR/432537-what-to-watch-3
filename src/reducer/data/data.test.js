import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {ActionType, Operation, reducer} from "./data";
import {noop} from "../../utils/utils";

const api = createAPI(noop);

const films = [
  {
    name: `MovieName`,
    posterUrl: `https://url.com`,
    previewUrl: `https://url.com`,
    bigPosterUrl: `https://url.com`,
    backgroundColor: `blue`,
    description: `Descrtiption`,
    rating: 9,
    votes: 3452,
    director: `Director`,
    starring: [`Artist 1`, `Artist 2`],
    runTime: `2h 30m`,
    genre: `Action`,
    releaseYear: 1995,
    id: 1,
    isFavorite: false,
    videoUrl: `https://url.com`,
    trailerUrl: `https://url.com`
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentFilmComments: [],
    films: [],
    promoFilm: {}
  });
});

it(`Reducer should update movies by load movies from the server`, () => {
  expect(
      reducer(
          {
            currentFilmComments: [],
            films: [],
            promoFilm: {}
          },
          {
            type: ActionType.GET_MOVIES,
            payload: films
          }
      )
  ).toEqual({
    currentFilmComments: [],
    films,
    promoFilm: {}
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.getMovies();

    apiMock.onGet(`/films`).reply(200, []);

    return moviesLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_MOVIES,
        payload: []
      });
    });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.getPromoMovie();

    apiMock.onGet(`/films/promo`).reply(200, {});

    return moviesLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_PROMO_MOVIE,
        payload: {}
      });
    });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.getComments(1);

    apiMock.onGet(`/comments/1`).reply(200, []);

    return moviesLoader(dispatch, noop, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_COMMENTS,
        payload: []
      });
    });
  });
});
