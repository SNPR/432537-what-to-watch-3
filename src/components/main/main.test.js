import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const Movie = {
  NAME: `The Godfather`,
  GENRE: `Drama`,
  RELEASE_YEAR: 1972
};

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
    description: `Movie description`
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
    description: `Movie description`
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
    description: `Movie description`
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
    description: `Movie description`
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
    description: `Movie description`
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
    description: `Movie description`
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
    description: `Movie description`
  }
];

it(`Should render App component`, () => {
  const tree = renderer
    .create(
        <Main
          name={Movie.NAME}
          genre={Movie.GENRE}
          releaseYear={Movie.RELEASE_YEAR}
          movies={films}
          onMovieCardClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
