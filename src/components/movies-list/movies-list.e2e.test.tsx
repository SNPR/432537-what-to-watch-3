import * as React from "react";
import Enzyme, {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list";

Enzyme.configure({
  adapter: new Adapter()
});

const films = [
  {
    name: `Movie name`,
    id: 1,
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

it(`Should pass data to handler on click`, () => {
  const movieCardClickHandler = jest.fn();

  const moviesList = mount(
      <MoviesList
        movies={films}
        onMovieCardClick={movieCardClickHandler}
        onMovieCardMouseOver={() => {}}
        onMovieCardMouseOut={() => {}}
        isPlaying={false}
        selectedMovieId={1}
      />
  );

  const movieCard = moviesList
    .find(`article.small-movie-card.catalog__movies-card`)
    .first();

  movieCard.simulate(`click`);

  expect(movieCardClickHandler.mock.calls.length).toBe(1);
  expect(movieCardClickHandler.mock.calls[0][0]).toBe(1);
});
