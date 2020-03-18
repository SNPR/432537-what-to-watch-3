import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";
import Namespace from "../../reducer/namespace";
import {AuthorizationStatus} from "../../reducer/user/user";
import {MemoryRouter} from "react-router-dom";
import {noop} from "../../utils/utils";
import {Movie} from "../../types";

const mockStore = configureStore([]);

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

it(`Should render Main component`, () => {
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
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      avatarUrl: ``
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <Main
              onMovieCardClick={noop}
              promoMovie={films[0]}
              isBigMoviePlayerVisible={false}
              onVisibilityChange={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              avatarUrl=""
            />
          </MemoryRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
