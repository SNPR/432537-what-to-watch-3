import * as React from "react";
import Enzyme, {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {ShowMoreButton} from "./show-more-button";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";

Enzyme.configure({
  adapter: new Adapter()
});

const films = [
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  },
  {
    name: `Movie name`,
    posterUrl: `https://poster-url.com`,
    bigPosterUrl: `https://image-url.com/1.jpg`,
    director: `Director Name`,
    starring: [`Actor 1`, `Actor 2`, `Actor 3`],
    runTime: `1h 00m`,
    genre: `Movie Genre`,
    releaseYear: 2000,
    rating: 8.9,
    votes: 4235,
    description: `Movie description`,
    reviews: [
      {
        rating: 9,
        date: `November 10, 2019`,
        author: `Dmitriy`,
        text: `Review text`
      }
    ]
  }
];

it(`Should call handler on button click`, () => {
  const showMoreMoviesButtonClickHandler = jest.fn();

  const showMoreButton = mount(
      <ShowMoreButton
        movies={films}
        showedMovies={SHOWED_MOVIES_DEFAULT}
        showMoreMovies={showMoreMoviesButtonClickHandler}
        filteredMovies={films}
        genre={ALL_GENRES}
      />
  );

  showMoreButton.find(`button.catalog__button`).simulate(`click`);

  expect(showMoreMoviesButtonClickHandler.mock.calls.length).toBe(1);
});
