import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";
import {ALL_GENRES, SHOWED_MOVIES_DEFAULT} from "../../utils/constants";

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
  }
];

it(`Should render GenresList component`, () => {
  const tree = renderer
    .create(
        <GenresList
          movies={films}
          genre={ALL_GENRES}
          changeGenre={() => {}}
          onMovieCardClick={() => {}}
          showedMovies={SHOWED_MOVIES_DEFAULT}
          resetShowedMoviesAmount={() => {}}
          filteredMovies={films}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
