import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES} from "../../utils/constants";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter()
});

const Movie = {
  NAME: `Psycho`,
  GENRE: `Horror`,
  RELEASE_YEAR: 1960
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

it(`Should movie card be pressed`, () => {
  const store = mockStore({
    genre: ALL_GENRES,
    films
  });

  const movieCardClickHandler = jest.fn();

  const main = mount(
      <Provider store={store}>
        <Main
          name={Movie.NAME}
          genre={Movie.GENRE}
          releaseYear={Movie.RELEASE_YEAR}
          movies={films}
          onMovieCardClick={movieCardClickHandler}
        />
      </Provider>
  );

  const movieCard = main
    .find(`article.small-movie-card.catalog__movies-card`)
    .first();

  movieCard.props().onClick();

  expect(movieCardClickHandler.mock.calls.length).toBe(1);
});
