import * as React from "react";
import * as renderer from "react-test-renderer";
import MyList from "./my-list";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

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

it(`Should render MyList component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    [Namespace.DATA]: {
      films,
      promoFilm: films[0]
    }
  });

  const tree = renderer
    .create(
      <MemoryRouter>
        <Provider store={store}>
          <MyList movies={films} onMovieCardClick={() => {}} />
        </Provider>
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
