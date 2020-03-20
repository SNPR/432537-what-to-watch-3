import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {ShowMoreButton} from "./show-more-button";
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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

it(`Should call handler on button click`, () => {
  const showMoreMoviesButtonClickHandler = jest.fn();

  const showMoreButton = mount(
      <ShowMoreButton
        movies={films}
        showedMovies={SHOWED_MOVIES_DEFAULT}
        onShowMoreMoviesButtonClick={showMoreMoviesButtonClickHandler}
        filteredMovies={films}
        genre={ALL_GENRES}
      />
  );

  showMoreButton.find(`button.catalog__button`).simulate(`click`);

  expect(showMoreMoviesButtonClickHandler.mock.calls.length).toBe(1);
});
