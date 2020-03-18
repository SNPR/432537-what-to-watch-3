import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AddReview from "./add-review";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";
import Namespace from "../../reducer/namespace";
import {AuthorizationStatus} from "../../reducer/user/user";
import {MemoryRouter} from "react-router-dom";
import {Movie} from "../../types";
import {noop} from "../../utils/utils";

const mockStore = configureStore([]);

const movie: Movie = {
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
};

it(`Should render AddReview component`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films: [movie],
      promoFilm: movie
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: SHOWED_MOVIES_DEFAULT,
      selectedMovieId: 1
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      avatarUrl: ``
    }
  });

  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <AddReview
              onSubmit={noop}
              movie={movie}
              id={0}
              changeSelectedMovieId={noop}
              avatarUrl=""
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
