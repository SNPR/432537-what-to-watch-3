import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AddReview from "./add-review.jsx";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants.js";
import Namespace from "../../reducer/namespace.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);

const movie = {
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
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }
  });

  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <AddReview
              onSubmit={() => {}}
              movie={movie}
              id={0}
              changeSelectedMovieId={() => {}}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
