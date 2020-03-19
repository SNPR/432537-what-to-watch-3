import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";
import {Movie} from "../../types";

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

it(`Should call handler on genre link click`, () => {
  const changeGenreHandler = jest.fn();
  const movieCardClickHandler = jest.fn();
  const resetShowedMoviesAmountHandler = jest.fn();

  const genresList = mount(
      <GenresList
        movies={films}
        genre={ALL_GENRES}
        changeGenre={changeGenreHandler}
        onMovieCardClick={movieCardClickHandler}
        showedMovies={SHOWED_MOVIES_DEFAULT}
        resetShowedMoviesAmount={resetShowedMoviesAmountHandler}
        filteredMovies={films}
      />
  );

  const genreLink = genresList.find(`a.catalog__genres-link`).first();

  genreLink.simulate(`click`);

  expect(changeGenreHandler.mock.calls.length).toBe(1);
  expect(changeGenreHandler.mock.calls[0][0]).toBe(ALL_GENRES);
  expect(resetShowedMoviesAmountHandler.mock.calls.length).toBe(1);
});
