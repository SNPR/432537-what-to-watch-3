import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
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

configure({
  adapter: new Adapter()
});

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

it(`Should movie card be pressed`, () => {
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

  const movieCardClickHandler = jest.fn();

  const main = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Main
            promoMovie={films[0]}
            onMovieCardClick={movieCardClickHandler}
            isBigMoviePlayerVisible={false}
            onVisibilityChange={noop}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            avatarUrl=""
          />
        </MemoryRouter>
      </Provider>
  );

  const movieCard = main
    .find(`article.small-movie-card.catalog__movies-card`)
    .first();

  movieCard.props().onClick();

  expect(movieCardClickHandler.mock.calls.length).toBe(1);
});
