import * as React from "react";
import * as renderer from "react-test-renderer";
import { MoviePage } from "./movie-page";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace";
import { Provider } from "react-redux";
import { ALL_GENRES, SHOWED_MOVIES_DEFAULT } from "../../utils/constants";
import { AuthorizationStatus } from "../../reducer/user/user";
import { MemoryRouter } from "react-router-dom";
import { Movie } from "../../types";
import { AxiosPromise } from "axios";
import { ActionType } from "../../reducer/state/state";

const films: Movie[] = [
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

it(`Should render MoviePage component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    [Namespace.DATA]: {
      films,
      promoFilm: films[0]
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: SHOWED_MOVIES_DEFAULT
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH
    }
  });

  const id: string = "1";

  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <MoviePage
            movie={films[0]}
            movies={films}
            authorizationStatus={AuthorizationStatus.AUTH}
            onMovieCardClick={() => {}}
            addMovieToMyList={id => new Promise(() => {}) as AxiosPromise}
            removeMovieFromMyList={id => new Promise(() => {}) as AxiosPromise}
            getComments={id => new Promise(() => {}) as AxiosPromise}
            changeSelectedMovieId={id => ({
              type: ActionType.CHANGE_SELECTED_MOVIE_ID,
              payload: id
            })}
            id={id}
            onMovieCardMouseOver={() => {}}
            onMovieCardMouseOut={() => {}}
            isPlaying={false}
          />
        </MemoryRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
