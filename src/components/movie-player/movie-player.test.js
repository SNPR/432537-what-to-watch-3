import * as React from "react";
import renderer from "react-test-renderer";
import MoviePlayer from "./movie-player";

const movie = {
  name: `Movie name`,
  posterUrl: `https://poster-url.com`,
  bigPosterUrl: `https://image-url.com/1.jpg`,
  trailerUrl: `https://upload.wikimedia.org/wikipedia/commons/d/d2/Frankenstein_trailer_%281931%29.webm`,
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
};

it(`Should render MoviePlayer component`, () => {
  const tree = renderer
    .create(<MoviePlayer movie={movie} muted={true} autoPlay={true} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
