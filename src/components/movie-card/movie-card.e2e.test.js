import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  name: `Movie name`,
  posterUrl: `https://poster-url.com`,
  bigPosterUrl: `https://image-url.com/1.jpg`,
  trailerUrl: `https://video-url.com/1.mp4`,
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

it(`Should pass data to handler on hover`, () => {
  const movieCardMouseOverHandler = jest.fn();
  const movieCardMouseOutHandler = jest.fn();

  const movieCard = shallow(
      <MovieCard
        movie={movie}
        isPlaying={true}
        onMovieCardClick={() => {}}
        onMovieCardMouseOver={() => movieCardMouseOverHandler(movie)}
        onMovieCardMouseOut={movieCardMouseOutHandler}
      />
  );

  movieCard.simulate(`mouseover`);
  movieCard.simulate(`mouseout`);

  expect(movieCardMouseOverHandler.mock.calls.length).toBe(1);
  expect(movieCardMouseOverHandler.mock.calls[0][0]).toMatchObject(movie);
  expect(movieCardMouseOutHandler.mock.calls.length).toBe(1);
});
